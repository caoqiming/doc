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

查询用时高的任务

```sql
select
  C.sid,
  S.event_time as start_time,
  R.event_time as run_time,
  TIMESTAMPDIFF(MINUTE,S.event_time,R.event_time) as deploy_time
from
  (
    select
      sid
    from
      custom_task
    where
      create_time > "2024-01-01 00:00:00"
  ) C
  inner join (
    select
      custom_task_id,
      event_type,
      event_time
    from
      custom_task_timeline
    where
      event_type = "Start"
      AND create_time > "2024-01-01 00:00:00"
  ) S on C.sid = S.custom_task_id
  inner join (
    select
      custom_task_id,
      event_type,
      event_time
    from
      custom_task_timeline
    where
      event_type = "Run"
      AND create_time > "2024-01-01 00:00:00"
  ) R on C.sid = R.custom_task_id
  order by deploy_time desc
```
