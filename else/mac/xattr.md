# xattr

从网上下载的文件会被 mac 标记，导致无法执行。可通过这个命令修复。

```bash
xattr -cr chromedriver

# 对当前路径下的所有文件都执行
find . -type f -exec xattr -cr {} +
```
