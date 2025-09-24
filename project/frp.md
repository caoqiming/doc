# frp

内网穿透

## usage

```
[common]
bind_port = 7000
token = 45oemuXHqnqUnbAV
```

frpc 设置，放在`/usr/local/frp/frps.ini`
29022 -> 22
29005 -> 29005

```
[common]
server_addr = 47.94.129.24
server_port = 29004
token = 45oemuXHqnqUnbAV

[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 29022

[service1]
type = tcp
local_ip = 127.0.0.1
local_port = 29005
remote_port = 29005
```

这里的 29004 -> 7000 是 frp 服务自己用的端口，服务端设置的 7000，客户端设置的 29004，所以在服务端的 docker 启动时需要转一下
~~忘了之前为啥要绕着么一圈了，可能就是想规划端口吧~~
29005 是用来干啥的忘了，目前好似没用

```bash
docker run --name frps -p 29004:7000 -p29005:29005 -p29022:29022 -v /usr/local/frp:/usr/local/frp -d frps:v1.0.0 -c /usr/local/frp/frps.ini
docker run --name frpc -v /usr/local/frp:/usr/local/frp --net=host -d frpc:v1.0.0 -c /usr/local/frp/frpc.ini
```
