<?php
class H{
    private $ttt;

    public function getV(){
        $this->ttt = "aaa";
        return $this->ttt;
    }
}

$h = new H();
var_dump($h->getV());
//$dateStr=date("Y年m月d日 H:i:s",$this->data['pubTime']);

//echo date("Y:m:j h:i:s  W",time());
function convertSpace($string)
{
    return str_replace(" ", "_", $string);
}

$string = "Peter is a great guy!";

//echo filter_var($string, FILTER_CALLBACK, array("options"=>"convertSpace"));



//$mysqli = new mysqli();
//$mysqli->connect("localhost","root","root","test");
//
//if($mysqli->connect_errno){
//    die("Connect Error:".$mysqli->connect_error);
//}
//
//$sql = "SELECT * FROM user WHERE id=?";
//$stmt = $mysqli->prepare($sql);
//$id = 11;
//$stmt->bind_param("i",$id);
//$rs = $stmt->execute();
//if($rs){
//
//    $stmt->bind_result($id,$name,$age);
//    while($stmt->fetch()){
//        echo $id,$name,$age;
//    }
//}


//$sql = "INSERT user(name,age) VALUES(?,?)";
//$stmt = $mysqli->prepare($sql);
//$name = "小星星";
//$age = 5;
//$stmt->bind_param("si",$name, $age);
//if($stmt->execute()){
//    echo "Success!";
//} else {
//    $stmt->error;
//}

// 多sql语句查询
//$sql = "SELECT * FROM user;";
//$sql.= "SELECT * FROM province;";
//if($mysqli->multi_query($sql)){
//    do{
//        $res = $mysqli->store_result();
//        if($res){
//            $rows[] = $res->fetch_all(MYSQLI_ASSOC);
//        }
//    }
//    while($mysqli->more_results() && $mysqli->next_result());
//}
//print_r($rows);


//$res = $mysqli->query($sql);
//if($res && $res->num_rows > 0){
//    while($row = $res->fetch_assoc()){
//        $rows[] = $row;
//    }
//    print_r($rows);
//    $res->free_result();
//} else {
//    echo "Error:".$mysqli->errno." ,错误信息为：".$mysqli->error;
//}
//$mysqli->close();
?>
<!--<!doctype html>-->
<!--<html lang="en">-->
<!--<head>-->
<!--    <meta charset="UTF-8">-->
<!--    <meta name="viewport"-->
<!--          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">-->
<!--    <meta http-equiv="X-UA-Compatible" content="ie=edge">-->
<!--    <title>Document</title>-->
<!--    <style>-->
<!--        *{margin:0; padding:0; list-style: none;box-sizing: border-box;}-->
<!--        .main{-->
<!--            width:480px;-->
<!--            margin: 100px auto;-->
<!--            borde:1px solid #eee;-->
<!--        }-->
<!--        .head,.body{overflow:hidden;}-->
<!--        .head li,.body li{-->
<!--            float: left;-->
<!--            width:120px;-->
<!--            height:30px;-->
<!--            line-height: 30px;-->
<!--            text-align: center;-->
<!--            border:1px solid #eee;-->
<!--        }-->
<!--    </style>-->
<!--</head>-->
<!--<body>-->
<!--    <div class="main">-->
<!--        <h2><a href="addUser.php">添加用户</a></h2>-->
<!--        <ul class="head">-->
<!--            <li>编号</li>-->
<!--            <li>姓名</li>-->
<!--            <li>年龄</li>-->
<!--            <li>操作</li>-->
<!--        </ul>-->
<!--        <ul class="body">-->
<!--            --><?php //foreach($rows as $row) {?>
<!--                <li>--><?php //echo $row['id']?><!--</li>-->
<!--                <li>--><?php //echo $row['name']?><!--</li>-->
<!--                <li>--><?php //echo $row['age']?><!--</li>-->
<!--                <li>-->
<!--                    <a href="doAction.php?act=updateUser&id=--><?php //echo $row['id'] ?><!--">更新</a>-->
<!--                    <a href="doAction.php?act=deleteUser&id=--><?php //echo $row['id'] ?><!--">删除</a>-->
<!--                </li>-->
<!--            --><?php //}?>
<!--        </ul>-->
<!--    </div>-->
<!--</body>-->
<!--</html>-->


