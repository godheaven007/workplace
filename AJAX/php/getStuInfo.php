<?php
/**
 * 获取学生信息
 */

$stuId = $_REQUEST['stuId'];
$stuInfo = array(
    "1"=>array("小明",22,"男"),
    "2"=>array("小红",24,"女"),
    "3"=>array("小军",18,"保密"),
);

switch ($stuId){
    case 1: echo json_encode($stuInfo["1"]); break;
    case 2: echo json_encode($stuInfo["2"]); break;
    case 3: echo json_encode($stuInfo["3"]); break;
    default: echo json_encode($stuInfo["1"]);
}
