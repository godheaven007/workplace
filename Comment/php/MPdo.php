<?php

/**
 * author: xusf
 * description: 一个简单的PDO封装类
 * createDate: 2017-09-18
 */
class MPdo{
    private $config = array();                                  // db配置项
    private $lConnect = false;                                  // 是否启用长连接
    protected static $conInstance = null;                       // 连接实例，避免重复连接数据库
    protected $_sql = false;                                    // 最后一条sql语句
    protected $_where = '';
    protected $_order = '';
    protected $_limit = '';
    protected $_field = '*';
    protected $_clear = 0;                                      // 状态，0表示查询条件干净，1表示查询条件污染
    protected $_trans = 0;                                      // 事务指令数

    // 构造函数
    public function __construct($dbConfig = ''){

        // 是否开启PDO扩展
        if(!class_exists('PDO')){
            $this->throwException('请先开启PDO扩展，再进行后续操作!');
        }

        // 配置文件是否定义
        if(!is_array($dbConfig) || !isset($dbConfig['dbHost']) || !isset($dbConfig['dbUserName']) || !isset($dbConfig['dbPassword']) ||
            !isset($dbConfig['dbName']) || !($dbConfig['dbPort']) || !isset($dbConfig['dbType']) || !isset($dbConfig['dbCharset'])){
            $this->throwException('没有定义数据库配置！请检查配置文件！');
        }

        $this->config = $dbConfig;

        // 连接数据库
        if(is_null(self::$conInstance)){
            $this->connect();
        }
    }

    /**
     * 连接数据库
     */
    protected function connect(){
        $dsn = $this->config['dbType'].':host='.$this->config['dbHost'].';dbname='.$this->config['dbName'];
        $options = $this->lConnect ? array(PDO::ATTR_PERSISTENT => true) : array();
        try{
            self::$conInstance = new PDO($dsn, $this->config['dbUserName'], $this->config['dbPassword'],$options);
            self::$conInstance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    //设置如果sql语句执行错误则抛出异常，事务会自动回滚
            self::$conInstance->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);            //禁用prepared statements的仿真效果(防SQL注入)
        }catch (PDOException $e){
            $this->throwException($e->getMessage());
        }
        self::$conInstance->exec('SET NAMES '.$this->config['dbCharset']);
    }

    /**
     * 字段和表名添加 `符号
     * 保证指令中使用关键字不出错 针对mysql
     * @param string $value
     * @return string
     */
    protected function _addChar($value) {
        if ('*'==$value || false!==strpos($value,'(') || false!==strpos($value,'.') || false!==strpos($value,'`')) {
            //如果包含* 或者 使用了sql方法 则不作处理
        } elseif (false === strpos($value,'`') ) {
            $value = '`'.trim($value).'`';
        }
        return $value;
    }

    /**
     * 取得数据表的字段信息
     * @param string $tbName 表名
     * @return array
     */
    protected function _tbFields($tbName) {
        $sql = 'SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME="'.$tbName.'" AND TABLE_SCHEMA="'.$this->config['dbName'].'"';
        $stmt = self::$conInstance->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $ret = array();
        foreach ($result as $key=>$value) {
            $ret[$value['COLUMN_NAME']] = 1;
        }
        return $ret;
    }

    /**
     * 过滤并格式化数据表字段
     * @param string $tbName 数据表名
     * @param array $data POST提交数据
     * @return array $newdata
     */
    protected function _dataFormat($tbName,$data) {
        if (!is_array($data)) return array();
        $table_column = $this->_tbFields($tbName);
        $ret=array();
        foreach ($data as $key=>$val) {
            if (!is_scalar($val)) continue; //值不是标量则跳过
            if (array_key_exists($key,$table_column)) {
                $key = $this->_addChar($key);
                if (is_int($val)) {
                    $val = intval($val);
                } elseif (is_float($val)) {
                    $val = floatval($val);
                } elseif (preg_match('/^\(\w*(\+|\-|\*|\/)?\w*\)$/i', $val)) {
                    // 支持在字段的值里面直接使用其它字段 ,例如 (score+1) (name) 必须包含括号
                    $val = $val;
                } elseif (is_string($val)) {
                    $val = '"'.addslashes($val).'"';
                }
                $ret[$key] = $val;
            }
        }
        return $ret;
    }

    /**
     * 执行查询 主要针对 SELECT, SHOW 等指令
     * @param string $sql sql指令
     * @return mixed
     */
    protected function _doQuery($sql='') {
        $this->_sql = $sql;
        $pdostmt = self::$conInstance->prepare($this->_sql); //prepare或者query 返回一个PDOStatement
        $pdostmt->execute();
        $result = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    /**
     * 执行语句 针对 INSERT, UPDATE 以及DELETE,exec结果返回受影响的行数
     * @param string $sql sql指令
     * @return integer
     */
    protected function _doExec($sql = '') {
        $this->_sql = $sql;
        return self::$conInstance->exec($this->_sql);
    }

    /**
     * 执行sql语句，自动判断进行查询或者执行操作
     * @param string $sql SQL指令
     * @return mixed
     */
    public function doSql($sql = '') {
        $queryIps = 'INSERT|UPDATE|DELETE|REPLACE|CREATE|DROP|LOAD DATA|SELECT .* INTO|COPY|ALTER|GRANT|REVOKE|LOCK|UNLOCK';
        if (preg_match('/^\s*"?(' . $queryIps . ')\s+/i', $sql)) {
            return $this->_doExec($sql);
        }
        else {
            //查询操作
            return $this->_doQuery($sql);
        }
    }

    /**
     * 获取最近一次查询的sql语句
     * @return String 执行的SQL
     */
    public function getLastSql() {
        return $this->_sql;
    }

    /**
     * 插入方法
     * @param string $tbName 操作的数据表名
     * @param array $data 字段-值的一维数组
     * @return int 受影响的行数
     */
    public function insert($tbName, array $data){
        $data = $this->_dataFormat($tbName,$data);
        if (!$data) return;
        $sql = "INSERT INTO ".$tbName."(".implode(',',array_keys($data)).") values(".implode(',',array_values($data)).")";
        return $this->_doExec($sql);
    }

    /**
     * 删除方法
     * @param string $tbName 操作的数据表名
     * @return int 受影响的行数
     */
    public function delete($tbName) {
        //安全考虑,阻止全表删除
        if (!trim($this->_where)) return false;
        $sql = "delete from ".$tbName." ".$this->_where;
        $this->_clear = 1;
        $this->_clear();
        return $this->_doExec($sql);
    }

    /**
     * 更新函数
     * @param string $tbName 操作的数据表名
     * @param array $data 参数数组
     * @return int 受影响的行数
     */
    public function update($tbName,array $data) {
        //安全考虑,阻止全表更新
        if (!trim($this->_where)) return false;
        $data = $this->_dataFormat($tbName,$data);
        if (!$data) return;
        $valArr = '';
        foreach($data as $k=>$v){
            $valArr[] = $k.'='.$v;
        }
        $valStr = implode(',', $valArr);
        $sql = "update ".trim($tbName)." set ".trim($valStr)." ".trim($this->_where);
        return $this->_doExec($sql);
    }

    /**
     * 查询函数
     * @param string $tbName 操作的数据表名
     * @return array 结果集
     */
    public function select($tbName = '') {
        $sql = "select ".trim($this->_field)." from ".$tbName." ".trim($this->_where)." ".trim($this->_order)." ".trim($this->_limit);
        $this->_clear = 1;
        $this->_clear();
        return $this->_doQuery(trim($sql));
    }

    /**
     * @param mixed $option 组合条件的二维数组，例：$option['field1'] = array(1,'=>','or')
     * @return $this
     */
    public function where($option) {
        if ($this->_clear>0) $this->_clear();
        $this->_where = ' where ';
        $logic = 'and';
        if (is_string($option)) {
            $this->_where .= $option;
        } elseif (is_array($option)) {
            foreach($option as $k=>$v) {
                if (is_array($v)) {
                    $relative = isset($v[1]) ? $v[1] : '=';
                    $logic    = isset($v[2]) ? $v[2] : 'and';
                    $condition = ' ('.$this->_addChar($k).' '.$relative.' '.$v[0].') ';
                }
                else {
                    $logic = 'and';
                    $condition = ' ('.$this->_addChar($k).'='.$v.') ';
                }
                $this->_where .= isset($mark) ? $logic.$condition : $condition;
                $mark = 1;
            }
        }
        return $this;
    }

    /**
     * 设置排序
     * @param mixed $option 排序条件数组 例:array('sort'=>'desc')
     * @return $this
     */
    public function order($option) {
        if ($this->_clear>0) $this->_clear();
        $this->_order = ' order by ';
        if (is_string($option)) {
            $this->_order .= $option;
        }
        elseif (is_array($option)) {
            foreach($option as $k=>$v){
                $order = $this->_addChar($k).' '.$v;
                $this->_order .= isset($mark) ? ','.$order : $order;
                $mark = 1;
            }
        }
        return $this;
    }

    /**
     * 设置查询行数及页数
     * @param int $page pageSize不为空时为页数，否则为行数
     * @param int $pageSize 为空则函数设定取出行数，不为空则设定取出行数及页数
     * @return $this
     */
    public function limit($page,$pageSize=null) {
        if ($this->_clear>0) $this->_clear();
        if ($pageSize===null) {
            $this->_limit = "limit ".$page;
        }
        else {
            $pageval = intval( ($page - 1) * $pageSize);
            $this->_limit = "limit ".$pageval.",".$pageSize;
        }
        return $this;
    }

    /**
     * 设置查询字段
     * @param mixed $field 字段数组
     * @return $this
     */
    public function field($field){
        if ($this->_clear > 0) $this->_clear();
        if (is_string($field)) {
            $field = explode(',', $field);
        }
        $nField = array_map(array($this,'_addChar'), $field);
        $this->_field = implode(',', $nField);
        return $this;
    }

    /**
     * 清理标记函数
     */
    protected function _clear() {
        $this->_where = '';
        $this->_order = '';
        $this->_limit = '';
        $this->_field = '*';
        $this->_clear = 0;
    }

    /**
     * 手动清理标记
     * @return $this
     */
    public function clearKey() {
        $this->_clear();
        return $this;
    }

    /**
     * 启动事务
     * @return void
     */
    public function startTrans() {
        //数据rollback 支持
        if ($this->_trans==0) self::$conInstance->beginTransaction();
        $this->_trans++;
        return;
    }

    /**
     * 用于非自动提交状态下面的查询提交
     * @return boolen
     */
    public function commit() {
        $result = true;
        if ($this->_trans>0) {
            $result = self::$conInstance->commit();
            $this->_trans = 0;
        }
        return $result;
    }

    /**
     * 事务回滚
     * @return boolen
     */
    public function rollback() {
        $result = true;
        if ($this->_trans>0) {
            $result = self::$conInstance->rollback();
            $this->_trans = 0;
        }
        return $result;
    }

    public function test(){
        return 'bbccdd';
    }
    /**
     * 关闭连接
     * PHP 在脚本结束时会自动关闭连接。
     */
    public function close() {
        if (!is_null(self::$conInstance)) self::$conInstance = null;
    }

    /**
     * 自定义异常信息
     * @param $errorMsg
     */
    public function throwException($errorMsg){
        die('<div style="color:#f00; font-size:20px;">'. $errorMsg .'</div>');
    }

}
require_once ('config.php');
$pdo = new MPdo($dbConfig);

// 表结构
/**********************************************************************
+----------+-------------+------+-----+---------+----------------+
| Field    | Type        | Null | Key | Default | Extra          |
+----------+-------------+------+-----+---------+----------------+
| id       | int(11)     | NO   | PRI | NULL    | auto_increment |
| username | varchar(20) | NO   |     | NULL    |                |
+----------+-------------+------+-----+---------+----------------+
**********************************************************************/

// 增加
//$pdo->insert("name",array('username'=>'肖芳芳'));
//$rs = $pdo->select('name');

// 查询
//$rs = $pdo->field('username')
//          ->where('id > 2')
//          ->select('name');
//var_dump($rs);

// 修改
//$rs = $pdo->field("name")
//    ->where("id = 2")
//    ->update("name", array(
//        "username"=> "徐淑峰"
//    ));
//echo $rs;

// 删除
//$rs = $pdo->where('id>3')
//    ->delete('name');
//echo $rs;

// 获取最后执行的sql语句
//$sql = $pdo->getLastSql();
//echo $sql;

//直接执行sql语句
//$sql = "show tables";
//$res = $pdo->doSql($sql);
//print_r($res);

//事务
//$pdo->startTrans();
//$pdo->where(array('id'=>6))->update('name',array('username'=>333));
//$pdo->where(array('id'=>7))->update('name',array('username'=>'444'));
//$pdo->where(array('id'=>8))->delete('name');
//$pdo->commit();