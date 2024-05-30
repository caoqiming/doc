# redis

## 用 docker 启动一个 redis

```bash
docker pull redis
```

准备配置文件`redis.conf` [example](https://redis.io/docs/latest/operate/oss_and_stack/management/config-file/)

修改以下内容

```
bind 0.0.0.0
requirepass foobared
```

```bash
docker run -v /root/conf/redis:/usr/local/etc/redis -p 6379:6379 --name myredis -d redis redis-server /usr/local/etc/redis/redis.conf
```

## redis-cli

```bash
apt-get install redis-tools
redis-cli -h host -p port -a password
```

常用 redis 命令

```
SET key value
GET key
TYPE key # 查看key的类型
DEL key # 删除key
```
