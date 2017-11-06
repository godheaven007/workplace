<?php

class T{
	const PI = 3.15;

	public $map = null;

	public $money = 10;
	// public function __construct(){
	// 	echo self::PI;
	// 	// $this->map = array()
	// }
}

$a = array('a','d','e');
$b = $a;
$b[1] = 'fffff';
print_r($a);
print_r($b);  