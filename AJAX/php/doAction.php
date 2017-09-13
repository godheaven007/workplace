<?php
$act = $_GET['act'];

$mysqli = new mysqli();
$mysqli->connect("localhost","root","root","test");

if($mysqli->connect_errno){
    die("Connect Error:".$mysqli->connect_error);
}

if($act == "addUser"){
    // 添加用户
    $userName = $_POST['userName'];
    $userName = $mysqli->escape_string($userName);
    $age = $_POST['userAge'];
    $sql = "INSERT user(name,age) VALUES('{$userName}', {$age})";
    $res = $mysqli->query($sql);
    if($res){
        // 添加成功
        echo "<script>
                    alert('添加成功');
                    location.href = 'test.php';
              </script>";
        exit();
    } else {
        // 添加失败
        echo "<script>
                alert('添加失败！请重新添加！');
                location.href = 'addUser.php';
                </script>";
    }
    $mysqli->close();
} else if($act == "updateUser"){
    // 更新用户
    $id = $_GET['id'];
    $sql = "UPDATE user SET age = age + 3 where id={$id}";
    $res = $mysqli->query($sql);
    if($res){
        // 添加成功
        echo "<script>
                    alert('更新成功');
                    location.href = 'test.php';
              </script>";
    } else {
        // 添加失败
        echo "<script>
                alert('更新失败！');
                </script>";
    }
} else if($act == "deleteUser"){
    // 删除用户
    $id = $_GET['id'];
    $sql = "DELETE FROM user where id={$id}";
    $res = $mysqli->query($sql);
    if($res){
        // 添加成功
        echo "<script>
                    alert('删除成功');
                    location.href = 'test.php';
              </script>";
    } else {
        // 添加失败
        echo "<script>
                alert('删除失败！');
                </script>";
    }
}