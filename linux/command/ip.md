# ip

## ip addr show

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

## ip route

### ip route list

```text
default via 192.168.0.1 dev eth1
100.96.3.253 dev eth0 scope link
192.168.0.0/24 dev eth1 scope link  src 192.168.0.7
```

可以和`route -n`命令的结果对照来看

```text
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         192.168.0.1     0.0.0.0         UG    0      0        0 eth1
100.96.3.253    0.0.0.0         255.255.255.255 UH    0      0        0 eth0
192.168.0.0     0.0.0.0         255.255.255.0   U     0      0        0 eth1
```

`default` 表示默认路由，`via 192.168.0.1` 表示网关，（没有这个则表示直接发送），`dev eth1`表示该路由通过的网络接口。`src 192.168.0.7` 表示数据包将带有来源地址`192.168.0.7`

### ip route get

`ip route get`命令可以显示访问该 ip 会命中的路由

```text
# ip route get 192.168.1.100
192.168.1.100 via 192.168.0.1 dev eth1  src 192.168.0.7
# ip route get 192.168.0.100
192.168.0.100 dev eth1  src 192.168.0.7
```

### ip route add

```bash
ip route add default via <IP_ADDRESS>
ip route add 192.168.1.100/32 via 192.168.2.1 dev eth1
```

删除 route

```bash
ip r del <NETWORK/MASK>
```

## ip neigh

### ip neigh show

该命令可以提供网络接口的物理地址（MAC 地址）和网络层地址（IP 地址）之间的对应关系。具体来说，它显示了目前与你的设备连接的所有设备的 IP 地址和 MAC 地址。如果你知道一个设备的 IP 地址，你可以使用"ip neigh show"命令来找到该设备的 MAC 地址。

```text
192.168.0.1 dev eth1 lladdr ee:ff:ff:ff:ff:ff used 0/0/0 probes 1 STALE
192.18.0.1 dev eth0 lladdr ee:ff:ff:ff:ff:ff used 0/0/0 probes 4 STALE
192.18.8.101 dev eth0 lladdr 00:16:3e:1a:84:3d used 0/0/0 probes 0 PERMANENT
192.18.0.33 dev eth0 lladdr ee:ff:ff:ff:ff:ff ref 1 used 0/0/0 probes 4 REACHABLE
192.18.0.37 dev eth0 lladdr ee:ff:ff:ff:ff:ff used 0/0/0 probes 4 STALE
192.18.0.26 dev eth0 lladdr ee:ff:ff:ff:ff:ff ref 1 used 0/0/0 probes 4 REACHABLE
```

`lladdr ee:ff:ff:ff:ff:ff`：这表示与 IP 地址关联的物理(MAC)地址。
`used 0/0/0`：这是最后一次在被操作系统使用后或者发送/接收 ARP 请求或应答后的时间计数。具体来说，它表示自上次使用后过去的秒数，到期时间以及 ast 使用/确认时间。
`probes 1`：这表示发送 ARP 请求的数量。
`STALE`：这表示 ARP 项的状态。`STALE` 表示已经有一段时间没有收到该硬件地址的任何信息，但是仍然认为此地址是正确的。如果需要再次使用此地址，则会发送新的 ARP 请求进行验证。

### ip neigh flash

清除 arp 缓存

```bash
ip neigh flush 192.168.0.102
```
