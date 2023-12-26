# mysql

## 常用命令

```sql
-- 查询最大连接数
show variables like 'max_connections';
-- 设置最大连接数
set global max_connections=1000;
-- 执行sql文件
source file.sql
-- 在shell中执行sql
echo "set global max_connections=1000;" | mysql -u root -p"xxx" -h 127.0.0.1 database_name
```

- 创建表

```sql
CREATE TABLE `table_name`
(
	`id`                 bigint(20)   NOT NULL AUTO_INCREMENT COMMENT '内部 ID',
	`sid`                varchar(256) NOT NULL,
	`log_url`            text COMMENT '日志链接',
	`exit_code`          int(11)      DEFAULT NULL,
	`diag_info`          text,
	`create_time`        datetime     DEFAULT NULL,
	`update_time`        datetime     DEFAULT NULL,
	`restart_round` 	 int 		  DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE = InnoDB
  CHARSET = utf8mb4;
```

- 插入

```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
-- 如果你要插入所有列的数据，可以省略列名：
INSERT INTO users
VALUES (NULL,'test', 'go@google.com', '2006-01-02', true);
```
