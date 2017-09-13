<?php
header('content-type:text/html;charset=utf-8');
require_once 'db.php';
require_once 'comment.php';

// 引用传递
$arr = array();
// 验证用户输入有效性，防止绕过前台
$res = Comment::validate($arr);
if($res){
    // 插入数据库
    $sql = "INSERT user(username, avatar, email, blog, comment,pubtime) VALUES(?,?,?,?,?,?);";
    $mysqli_stmt = $mysqli->prepare($sql);
    $arr['pubTime'] = time();
    $mysqli_stmt->bind_param('sisssi', $arr['username'], $arr['avatar'], $arr['email'], $arr['blog'], $arr['comment'],$arr['pubtime']);
    $mysqli_stmt->execute();

    // 返回数据至前台
    $comment = new Comment($arr);
    echo json_encode(array('status'=>1,'html'=>$comment->output()));
}else{
    echo '{"status":0,"errors":'.json_encode($arr).'}';
}
