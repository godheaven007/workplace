<?php
/**
 * 获取学生信息
 */


$serverName = "localhost";
$userName = "root";
$passWord = "root";

// 创建连接
$conn = new mysqli($serverName, $userName, $passWord);

// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} else {
    echo "连接成功";
}

$sql = "SELECT * FROM user";
$result = $conn->query($sql);
var_dump($result);




//$stuId = $_GET['stuId'];
//$stuInfo = array(
//    "1"=>array("小明",22,"男"),
//    "2"=>array("小红",24,"女"),
//    "3"=>array("小军",18,"保密"),
//);
//
//exit(json_encode($stuInfo));