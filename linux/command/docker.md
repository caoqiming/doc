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

### network

`docker network ls` 查看当前的网络，docker 默认会创建三种网络

```bash
root@GlimmerServer:~# docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
f7ef9cec7970   bridge    bridge    local
239267d0d3de   host      host      local
1be0b00e6146   none      null      local
```

#### bridge

```bash
root@GlimmerServer:~# ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 00:16:3e:06:cf:3e brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.132/24 brd 192.168.1.255 scope global dynamic eth0
       valid_lft 312128360sec preferred_lft 312128360sec
    inet6 fe80::216:3eff:fe06:cf3e/64 scope link
       valid_lft forever preferred_lft forever
3: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    link/ether 02:42:92:5c:38:4d brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:92ff:fe5c:384d/64 scope link
       valid_lft forever preferred_lft forever
7: veth43b2294@if6: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP group default
    link/ether 9a:67:17:44:53:d4 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet6 fe80::9867:17ff:fe44:53d4/64 scope link
       valid_lft forever preferred_lft forever
9: veth47322bc@if8: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP group default
    link/ether 0e:ad:7f:90:41:2c brd ff:ff:ff:ff:ff:ff link-netnsid 1
    inet6 fe80::cad:7fff:fe90:412c/64 scope link
       valid_lft forever preferred_lft forever
```

因为有两个容器，所以有两个 veth 网卡，它们的 master 都是 docker0，正是有 docker0 这个桥，容器内的网络才可以抵达宿主机的 eth0 接口。这就是桥接模式，桥接模式下不同的容器可以相互通信，但是不会自动为容器间进行 DNS 解析（用主机名（docker 启动容器时可以指定主机名） ping 不通）。桥接模式下容器可以 ping 宿主机，宿主机也可以 ping 容器。

如果需要 dns 解析，可以创建一个桥接网络（是的，不需要额外操作，自己创建的就有了）

```bash
docker network create -d bridge mybridge
```

在这个模式下容器内的数据要出来需要经过地址转换（NAT），会额外消耗 CPU

#### host

这个模式下容器会直接使用宿主机的网络。不过需要注意只有 linux 系统是这样的，在 macos 或 windows 里是不行的。

#### none

这个模式下容器没有任何网络。只有一个 loopback 接口。

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
