# docker

## install

```bash
# 如果没有docker 先安装docker
curl -fsSL https://get.docker.com | sudo bash -s docker --mirror Aliyun
docker run --name mysql  -v /my/own/datadir:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=cqm -p 3306:3306 -d mysql:latest
```

## usage

### volume

查看 volume

```bash
docker volume ls
```

查看容器挂载，`grep`的`-A`参数指定多显示的行数，根据具体情况调整

```bash
docker inspect 3298e6d0681b |grep Mounts -A 20
```

查看镜像、容器、volume 占用磁盘空间

```bash
docker system df -v
```

### 指定命令运行镜像

```bash
docker run -it nginx:latest /bin/bash
```

CMD 和 ENTRYPOINT 是 Dockerfile 中两个可以设定容器启动后需要执行的命令的指令。
如果你在 docker run 命令中设定了启动命令，那么这个命令会覆盖 Dockerfile 中的 CMD 指令。具体怎么执行还得再看 ENTRYPOINT
如果在 Dockerfile 中，ENTRYPOINT 使用了 "exec" 格式（也就是 JSON 数组格式，如：ENTRYPOINT ["executable", "param1", "param2"]），那么 docker run 中指定的启动命令会被视为 ENTRYPOINT 命令的参数。也就是说，它们组合成一个完整的命令一起执行。
如果在 Dockerfile 中， ENTRYPOINT 使用了 shell 格式（如 ENTRYPOINT command param1 param2），那么 docker run 中指定的启动命令会被忽略。
想要覆盖 ENTRYPOINT 可以使用 `--entrypoint`

### limit linux capabilities

Linux kernel capabilities are a set of privileges that can be used by privileged. Docker, by default, runs with only a subset of capabilities. You can change it and drop some capabilities (using --cap-drop) to harden your docker containers, or add some capabilities (using --cap-add) if needed.

```bash
docker run --cap-drop all --cap-add CHOWN capability:1.0
```

容器内查看 linux capabilities

```bash
apt-get install libcap2-bin
capsh --print
```

### cp

```bash
docker cp /path/on/host my_container:/path/in/container
```

### 清除所有不在运行中的容器

```bash
docker container prune -f
# 清理 none none 的镜像
docker rmi $(docker images -f "dangling=true" -q)
```

## 镜像

## 将容器保存为镜像

```bash
docker commit  --change='CMD []' --change='ENTRYPOINT ["bash", "/root/run.sh"]' --change='WORKDIR /root' [containerid] capability:1.0
```

保存到文件

```bash
docker save -o capability.tar capability:1.0
```

从文件中导入

```bash
docker load -i capability.tar
```

## build

```bash
docker build -f /path/to/a/Dockerfile . -t set/your:tag
```
