<?php
$hostname = "localhost";
$username = "root";
$password = "root";
$database = "imoocComment";
$mysqli = new mysqli($hostname, $username, $password, $database);

if($mysqli->errno){
	die('Connect Error:'.$mysqli->error);
}else{
	$mysqli->set_charset('UTF8');
}