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

- 添加字段

```sql
ALTER TABLE
  table_name
ADD
  `name` varchar(32) DEFAULT NULL COMMENT '注释';
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

## 快速用 docker 部署一个 mysql

```bash
# 如果没有docker 先安装docker
curl -fsSL https://get.docker.com | sudo bash -s docker --mirror Aliyun
docker run --name mysql  -v /my/own/datadir:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=cqm -p 3306:3306 -d mysql:latest
```

连接到 mysql

```bash

```

## mysql 时间类型

MySQL 提供了 DATE, DATETIME, TIMESTAMP 三种类型。

- DATE 类型没有具体的时间点，只能精确到【日期】，即 YYYY-MM-DD
- DATETIME 则同时支持【日期】和【时间】，格式为 YYYY-MM-DD hh:mm:ss，**不带时区信息**，占 8 个字节
- TIMESTAMP 同样也支持【日期】和【时间】，还有时区的信息。支持时间范围，从'1970-01-01 00:00:01' UTC 到 '2038-01-19 03:14:07',

> DATETIME 以及 TIMESTAMP，二者除了整秒之外，还可以支持小数点后的部分，最多到 microseconds （6 位）精度。格式为 'YYYY-MM-DD hh:mm:ss[.fraction]'，比如 '2038-01-19 03:14:07.999999'

```sql
CREATE TABLE t1 (
  ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
