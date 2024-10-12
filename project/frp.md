# frp

内网穿透

## usage

```
[common]
bind_port = 7000
token = xxx
```

frpc 设置，放在`/usr/local/frp/frps.ini`

```
[common]
server_addr = 47.94.129.24
server_port = 29004
token = xxx

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

```bash
docker run --name frps -p 29004:7000 -p29005:29005 -p29022:29022 -v /usr/local/frp:/usr/local/frp -d frps:v1.0.0 -c /usr/local/frp/frps.ini
docker run --name frpc -v /usr/local/frp:/usr/local/frp --net=host -d frpc:v1.0.0 -c /usr/local/frp/frpc.ini
```
