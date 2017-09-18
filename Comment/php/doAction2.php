<?php
header('content-type:text/html;charset=utf-8');
require_once 'config.php';
require_once 'MPdo.php';
require_once 'comment.php';

$pdo = new MPdo($dbConfig);
$comment = new Comment($pdo);


$act = $_GET['act'];
if($act == 'getCurPageData'){
    // 获取当前页数据
    echo $comment->getCurPageData();
} else if($act == 'delData'){
    // 删除该条数据

} else if($act == 'addData'){
    if($comment->validate()){
        // 输入正确，插入数据库
        $affectRows = $pdo->insert('user',array(
            'username'=>$comment->username,
            'avatar'=>$comment->avatar,
            'email'=>$comment->email,
            'blog'=>$comment->blog,
            'comment'=>$comment->comment,
            'pubtime'=>$comment->pubtime
        ));

        if($affectRows){
            // 返回数据至前台
            die('{"status":1,"data":'. json_encode($comment->getData()) .'}');
        }
    } else {
        // 前台输入有错误
        die('{"status":0, "errors":'. json_encode($comment->errors).'}');
    }
}

