# docker

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

指定命令运行镜像

```bash

```
