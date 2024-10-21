# jounrnalctl

The journal is a component of systemd. It's a centralized location for all messages logged by different components in a systemd-enabled Linux system. This includes kernel and boot messages, messages coming from syslog, or different services.

- 配置文件路径`/etc/systemd/journald.conf`
- 日志以二进制格式存储在`/var/log/journal`

## usage

该命令提供了所有应用程序和进程的日志条目，包括错误、警告等。它显示的列表中，最旧的日志在顶部，当前的日志在底部。你需要不断按回车键来逐行滚动浏览。你也可以使用 PAGE UP 和 PAGE DOWN 键来滚动。按 q 键可以退出这个视图。

```bash
journalctl
```

默认情况下，journalctl 以当前系统时区显示日志的时间。要以 UTC 查看日志，请使用以下命令：

```bash
journalctl --utc
```

要查看紧急系统信息：

```bash
journalctl -p 0

# 0: 紧急情况
# 1: 警报
# 2: 危急
# 3: 错误
# 4: 警告
# 5: 通知
# 6: 信息
# 7：调试
```
