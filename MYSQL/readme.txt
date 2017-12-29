+-----------+----------------------+------+-----+---------+----------------+
| Field     | Type                 | Null | Key | Default | Extra          |
+-----------+----------------------+------+-----+---------+----------------+
| id        | smallint(5) unsigned | NO   | PRI | NULL    | auto_increment |
| usernamer | varchar(20)          | NO   |     | NULL    |                |
| password  | varchar(32)          | NO   |     | NULL    |                |
| age       | tinyint(3) unsigned  | NO   |     | 10      |                |
| sex       | tinyint(1)           | YES  |     | NULL    |                |
+-----------+----------------------+------+-----+---------+----------------+

表结构如上

insert语句
① INSERT [INTO] user VALUES(NULL/DEFAULT, 'Tom', '111', DEFAULT, 1);
② INSERT user SET usernamer = 'xxx', password = md5('abc'), sex = 1;
  该方法只能够单条插入，请用于子查询
③ INSERT SELECT  


update语句
①单表更新

②多表更新


select语句
①字段别名
  SELECT usernamer AS un FROM user;
