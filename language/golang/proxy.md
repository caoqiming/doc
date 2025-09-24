# proxy

发现链接 google 的 api，golang 无法正常连接，但 python 可以。排查后怀疑是 golang 没有走代理。虽然开了全局但不知道为啥没走。。。
需要手动指定一下，这个具体的端口需要看具体代理的设置

```bash
export HTTP_PROXY="http://127.0.0.1:1087"
export HTTPS_PROXY="http://127.0.0.1:1087"
```
