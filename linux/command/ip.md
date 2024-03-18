# ip

# ip addr show

可以省略为`ip a`，显示网卡以及配置的地址信息

```text
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0@if5: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue qlen 1000
    link/ether 00:16:3e:1a:84:3d brd ff:ff:ff:ff:ff:ff
    inet 192.18.8.81/19 brd 192.18.31.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::16:3e0f:ce1a:843d/64 scope link
       valid_lft forever preferred_lft forever
3: eth1@eth1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue
    link/ether 00:16:3e:1d:3a:3f brd ff:ff:ff:ff:ff:ff
    inet 192.168.0.7/24 brd 192.168.0.255 scope global eth1
       valid_lft forever preferred_lft forever
    inet6 fe80::216:3eff:fe1d:3a3f/64 scope link
       valid_lft forever preferred_lft forever
```

lo 是环回接口，下面以 eth0 为例说明每个字段的含义

1. `eth0@if5`：eth0 是网络接口的名称，@if5 表示内核接口索引号。
2. `<BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN>`：这是一些 flags  
   `BROADCAST`: 表示此接口有发送广播的能力。  
   `MULTICAST`: 表示此接口有发送、接收多播的能力。  
   `UP`: 表示网络接口处于启动状态。  
   `LOWER_UP`: 表示物理链路状态为 UP。  
   `M-DOWN`: 表示 MULTICAST 状态被管理员关闭。
3. `mtu 1500`：最大传输单元，以字节为单位，这里是 1500 字节。
4. `qdisc noqueue qlen 1000`：这是关于网络排队规则的信息。  
   qdisc 是 Queueing Discipline 的缩写，这里为 noqueue 即没有排队。 qlen 是队列长度。
5. `link/ether 00:16:3e:1a:84:3d brd ff:ff:ff:ff:ff:ff`：这是关于以太网的物理地址和广播地址的信息。
   `00:16:3e:1a:84:3d` 是网卡的 MAC 地址。  
   `brd ff:ff:ff:ff:ff:ff` 表示广播地址。
6. `inet 192.18.8.81/19 brd 192.18.31.255 scope global eth0`：这是网络接口 IPv4 的信息。  
   `inet` 表示这是 IPv4 的地址。  
   `192.18.8.81` 是网络接口的 IPv4 地址，/19 表示子网掩码长度。  
   `brd 192.18.31.255` 表示广播地址。  
   `scope global` 表示这个地址在全局范围内是可用的。
7. `valid_lft forever preferred_lft forever`：这是地址的生命周期。  
   `valid_lft forever` 表示此地址的有效生命周期为永久。  
   `preferred_lft forever` 表示此地址的首选生命周期也为永久。

## ip link
