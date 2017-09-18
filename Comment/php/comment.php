<?php
require_once 'MPdo.php';
/**
 * author: xusf
 * description: 评论类
 * createDate: 2017-09-13
 */
class Comment{
    private $pdo = null;                // pdo实例
    public $username;                   // 用户名
    public $avatar;                     // 头像
    public $email;                      // 邮箱
    public $blog;                       // 个人网站
    public $comment;                    // 评论内容
    public $pubtime;                    // 提交时间

    // 相关数据
    public $data = array();

    // 错误信息
    public $errors = array();

    // 构造函数
    public function __construct($pdo){
        $this->pdo = $pdo;
    }

    // 返回错误信息
    public function getErrors(){
        return $this->errors;
    }

    // 返回正确信息
    public function getData(){
        return $this->data;
    }

    /**
     * 检测用户输入的数据(防止绕过前端，修改html提交)
     * @param $arr
     * @return bool
     */
    public function validate(){
        $this->username = $_POST['username'];
        $this->avatar = $_POST['avatar'];
        $this->email = $_POST['email'];
        $this->blog = $_POST['blog'];
        $this->comment = $_POST['comment'];
        $this->pubtime = time();

        // 用户名
        if(!filter_var($this->username,FILTER_CALLBACK, array('options'=> 'Comment::validate_str'))){
            $this->errors['username'] = '请输入合法用户名';
        }
        $options = array(
            'options'=>array(
                'min_range'=>1,
                'max_range'=>4
            )
        );
        // 头像
        if(!filter_var($this->avatar, FILTER_VALIDATE_INT, $options)){
            $this->errors['avatar'] = '请选择合法头像';
        }
        // 邮箱
        if(!filter_var($this->email, FILTER_VALIDATE_EMAIL)){
            $this->errors['email'] = '请输入合法邮箱';
        }
        // 个人网站
        if(!filter_var($this->blog,FILTER_VALIDATE_URL)){
            $this->errors['blog'] = '请输入合法的个人网站';
        }
        // 评论内容
        if(!filter_var($this->comment, FILTER_CALLBACK, array('options'=>'Comment::validate_str'))){
            $this->errors['comment'] = '请输入合法内容';
        }

        if(!empty($this->errors)){
            // 存在输入错误项
            return false;
        }
        $this->data = $_POST;
        $this->data['pubtime'] = $this->pubtime;
        return true;
    }

    /**
     * 检测是否输入为空，并处理相应html等字符
     * @param $str
     * @return bool|string
     */
    public static function validate_str($str){
        if(mb_strlen($str,'UTF8') < 1){
            return false;
        }
        $str = nl2br(htmlspecialchars($str,ENT_QUOTES));
        return $str;
    }

    /**
     * 获取所有数据
     * @return mixed
     */
    public function getCurPageData(){
        $tableName = 'user';
        return json_encode($this->pdo->select($tableName));
    }
}

