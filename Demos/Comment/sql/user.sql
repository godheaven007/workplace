/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50714
Source Host           : 127.0.0.1:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-09-13 11:18:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL COMMENT '昵称',
  `avatar` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '头像',
  `email` varchar(255) NOT NULL COMMENT '邮箱',
  `blog` varchar(255) DEFAULT NULL COMMENT '个人博客',
  `comment` text NOT NULL COMMENT '评论内容',
  `pubtime` int(11) unsigned NOT NULL COMMENT '发布时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
