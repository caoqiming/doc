# strace

strace 是有用的诊断，说明和调试工具，Linux 系统管理员可以在不需要源代码的情况下即可跟踪系统的调用。

安装

```bash
# CentOS/EulerOS系统
yum install strace
# Ubuntu系统
apt-get install strace
```

查看其他命令网络相关的系统调用

```bash
strace -e trace=network -f {你的命令}
```
