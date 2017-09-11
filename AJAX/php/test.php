<?php
$mysqli = new mysqli();
$mysqli->connect("localhost","root","root","test");

if($mysqli->connect_errno){
    die("Connect Error:".$mysqli->connect_error);
}

$sql = "SELECT * FROM user";
$res = $mysqli->query($sql);
if($res && $res->num_rows > 0){
    while($row = $res->fetch_assoc()){
        $rows[] = $row;
    }
    print_r($rows);
    $res->free_result();
} else {
    echo "Error:".$mysqli->errno." ,错误信息为：".$mysqli->error;
}
$mysqli->close();
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        *{margin:0; padding:0; list-style: none;}
        .main{
            width:360px;
            margin: 100px auto;
            borde:1px solid #eee;
        }
        .head,.body{overflow:hidden;}
        .head li,.body li{
            float: left;
            width:120px;
            height:30px;
            line-height: 30px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="main">
        <ul class="head">
            <li>编号</li>
            <li>姓名</li>
            <li>年龄</li>
        </ul>
        <ul class="body">
            <?php foreach($rows as $row) {?>
                <li><?php echo $row['id']?></li>
                <li><?php echo $row['name']?></li>
                <li><?php echo $row['age']?></li>
            <?php }?>
        </ul>
    </div>
</body>
</html>


