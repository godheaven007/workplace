<?php
header('content-type:text/html;charset=utf-8');
require_once 'db.php';
require_once 'comment.php';

$comment = new Comment();
if($comment->validate()){
    // 输入正确，插入数据库
    $sql = "INSERT user(username, avatar, email, blog, comment, pubtime) VALUES(?,?,?,?,?,?);";
    $mysqli_stmt = $mysqli->prepare($sql);
    $mysqli_stmt->bind_param('sisssi', $comment->username, $comment->avatar, $comment->email, $comment->blog, $comment->comment,$comment->pubtime);
    $mysqli_stmt->execute();

    // 返回数据至前台
    die('{"status":1,"data":'. json_encode($comment->getData()) .'}');
} else {
    // 前台输入有错误
    die('{"status":0, "errors":'. json_encode($comment->errors).'}');
}
