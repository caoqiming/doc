# service & systemctl

"service"和"systemctl"是 Linux 系统中用于管理服务的两种常用工具，"service"命令是更传统、更旧的工具，它主要用于 System V 和 Upstart 系统。"systemctl"命令是为 systemd 系统设计的，systemd 是现代 Linux 发行版（如 Ubuntu 16.04 和 CentOS 7）的默认系统。

## systemmd

systemd is a suite of basic building blocks for a Linux system. It provides a system and service manager that runs as PID 1 and starts the rest of the system.

查看服务配置文件

```bash
systemctl cat mysqld
# 添加unit文件之后需要reload
systemctl daemon-reload
systemctl start myservice.service
```

查看某个 Unit 的日志

```bash
journalctl -u nginx.service
```

## unit 配置文件

sshd 服务的 unit 配置文件如下所示，主要分为三部分：[Unit]、[Service] 和 [Install]

```
# /lib/systemd/system/ssh.service
[Unit]
Description=OpenBSD Secure Shell server
Documentation=man:sshd(8) man:sshd_config(5)
After=network.target auditd.service
ConditionPathExists=!/etc/ssh/sshd_not_to_be_run

[Service]
EnvironmentFile=-/etc/default/ssh
ExecStartPre=/usr/sbin/sshd -t
ExecStart=/usr/sbin/sshd -D $SSHD_OPTS
ExecReload=/usr/sbin/sshd -t
ExecReload=/bin/kill -HUP $MAINPID
KillMode=process
Restart=on-failure
RestartPreventExitStatus=255
Type=notify
RuntimeDirectory=sshd
RuntimeDirectoryMode=0755

[Install]
WantedBy=multi-user.target
Alias=sshd.service
```

### [Unit]部分详解

- Description：当前 unit 的描述
- Documentation：文档地址，仅接受类型为：http://、https://、file:、info:、man: 的 URI
- Requires：表示本 unit 与其它 unit 之间存在强依赖关系，如果本 unit 被激活，此处列出的 unit 也会被激活，如果其中一个依赖的 unit 无法激活，systemd 都不会启动本 unit
- Wants：与 Requires 类似，区别在于如果依赖的 unit 启动失败，不影响本 unit 的继续运行
- After：表示本 unit 应该在某服务之后启动，选项可参考 systemd.special 中文手册
- Before：表示本 unit 应该在某服务之前启动，After 和 Before 字段只涉及启动顺序，不涉及依赖关系
- BindsTo：与 Requires 类似，当指定的 unit 停止时，也会导致本 unit 停止
- PartOf：与 Requires 类似，当指定的 unit 停止或重启时，也会导致本 unit 停止或重启
- Conflicts：如果指定的 unit 正在运行，将导致本 unit 无法运行
- OnFailure：当本 unit 进入故障状态时，激活指定的 unit

### [Service]部分详解

- Type: simple（默认值）服务为主进程启动。 forking 服务将以 fork 分叉的方式启动，此时父进程将会退出，子进程将成为主进程。oneshot，dbus，notify，idle
- PIDFile：指向此守护进程的 PID 文件的绝对文件名。对于 Type=forking 的服务，建议使用此选项。Systemd 在服务启动后读取守护进程的主进程的 PID。Systemd 不会写入此处配置的文件，但它会在服务关闭后删除该文件
