# 文件权限

- r 代表可读(read) 值为 4
- w 代表可写(write) 值为 2
- x 代表可执行(execute) 值为 1
  三个数字依次为 文件所有者的权限，同组用户的权限，其他用户的权限

## 命令

`ls -l`

```text
drwxr-xr-x  4 caoqiming.cpp caoqiming.cpp     4096 Jan  8 21:08 go
```

第一个字母表示文件类型具体为

- 当为 `d` 则是目录
- 当为 `-` 则是文件
- 若是 `l` 则表示为链接文档(link file)
- 若是 `b` 则表示为装置文件里面的可供储存的接口设备(可随机存取装置)
- 若是 `c` 则表示为装置文件里面的串行端口设备，例如键盘、鼠标(一次性读取装置)

之后的内容依次为

- 文件权限，这三个权限的位置不会变，如果没有权限则会有`-`来填充。
- hard links 的数量
- user name
- group name
- size
- 最后修改的时间
- 文件名