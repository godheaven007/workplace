<?php
$host = 'localhost';
$username = 'root';
$password = 'root';
$dbname = 'test';

$mysqli = new mysqli($host,$username,$password,$dbname);

if($mysqli->errno){
	die('Connect Error:'.$mysqli->error);
}else{
	$mysqli->set_charset('UTF8');
}