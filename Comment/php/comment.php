<?php

/**
 * author: xusf
 * description: 评论类
 * createDate: 2017-09-13
 */
class Comment{
    // 相关数据
    private $data = array();

    // 构造函数
    function __construct($data){
        $this->data = $data;
    }

    public static function validate(){

    }
}