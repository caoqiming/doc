# veth pair

veth pair 全称是 Virtual Ethernet Pair，是一个成对的端口，所有从这对端口一 端进入的数据包都将从另一端出来，反之也是一样。
引入 veth pair 是为了在不同的 Network Namespace 直接进行通信，利用它可以直接将两个 Network Namespace 连接起来。

## 例子

创建两个 namespace，nns1 和 nns2

```bash
ip netns add nns1
ip netns add nns2
```

默认空间创建 veth pair

```bash
ip link add veth-direct-1-2 type veth peer name veth-direct-2-1
```

分别放到两个 ns 内

```bash
ip link set veth-direct-1-2 netns nns1
ip link set veth-direct-2-1 netns nns2
```

在两个 ns 内分别启动网卡并分配 ip

```bash
# 在对应ns内执行
ip link set veth-direct-1-2 up
ip addr add 192.168.0.1/24 dev veth-direct-1-2

ip link set veth-direct-2-1 up
ip addr add 192.168.0.2/24 dev veth-direct-2-1
```

就可以互相 ping 通了

# bridge

veth pair 打破了 Network Namespace 的限制，实现了不同 Network Namespace 之间的通信。但 veth pair 有一个明显的缺陷，就是只能实现两个网络接口之间的通信。
如果我们想实现多个网络接口之间的通信，就可以使用网桥（Bridge）技术。
简单来说，网桥就是把一台机器上的若干个网络接口 “连接” 起来。其结果是，其中一个网口收到的报文会被复制给其他网口并发送出去。以使得网口之间的报文能够互相转发。
网桥对报文的转发基于 MAC 地址。网桥能够解析收发的报文，读取目标 MAC 地址的信息，和自己记录的 MAC 表结合，来决策报文的转发目标网口。
为了实现这些功能，网桥会学习源 MAC 地址，在转发报文时，网桥只需要向特定的网口进行转发，从而避免不必要的网络交互。
如果它遇到一个自己从未学习到的地址，就无法知道这个报文应该向哪个网口转发，就将报文广播给所有的网口（报文来源的网口除外）。

## 例子

创建两个 namespace，nns1 和 nns2

```bash
ip netns add nns1
ip netns add nns2
```

此时的 nns1 内

```
root@n37-091-222:~# ip a
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
```

默认空间创建 veth pair

```bash
ip link add veth10 type veth peer name veth11
ip link add veth20 type veth peer name veth21
```

新增网卡

```text
26: veth11@veth10: <BROADCAST,MULTICAST,M-DOWN> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 56:11:d2:b9:04:77 brd ff:ff:ff:ff:ff:ff
27: veth10@veth11: <BROADCAST,MULTICAST,M-DOWN> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 9e:a1:f4:93:55:99 brd ff:ff:ff:ff:ff:ff
28: veth21@veth20: <BROADCAST,MULTICAST,M-DOWN> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether a2:55:d3:cf:03:b8 brd ff:ff:ff:ff:ff:ff
29: veth20@veth21: <BROADCAST,MULTICAST,M-DOWN> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 7e:43:9c:59:b4:ba brd ff:ff:ff:ff:ff:ff
```

将 veth11 放到 nns1 空间中，将 veth21 放到 nns2 空间中

```bash
ip link set veth11 netns nns1
ip link set veth21 netns nns2
```

这之后默认空间就只能看到 veth10 和 veth20 了

```text
27: veth10@if26: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN group default qlen 1000
    link/ether 9e:a1:f4:93:55:99 brd ff:ff:ff:ff:ff:ff link-netns nns1
29: veth20@if28: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN group default qlen 1000
    link/ether 7e:43:9c:59:b4:ba brd ff:ff:ff:ff:ff:ff link-netns nns2
```

此时的 nns1 内

```text
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
26: veth11@if27: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN group default qlen 1000
    link/ether 56:11:d2:b9:04:77 brd ff:ff:ff:ff:ff:ff link-netnsid 0
```

此时的 nns2 内

```text
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
28: veth21@if29: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN group default qlen 1000
    link/ether a2:55:d3:cf:03:b8 brd ff:ff:ff:ff:ff:ff link-netnsid 0
```

设置 nns1 空间中的网卡地址为 172.16.0.11/24，设置 nns2 空间中的网卡地址为 172.16.0.21/24

```bash
# 在 nns1 下执行
ip addr add 172.16.0.11/24 dev veth11
ip link set  veth11 up
# 在 nns2 下执行
ip addr add 172.16.0.21/24 dev veth21
ip link set  veth21 up
```

此时的 nns1 内

```text
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
26: veth11@if27: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state LOWERLAYERDOWN group default qlen 1000
    link/ether 56:11:d2:b9:04:77 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.16.0.11/24 scope global veth11
       valid_lft forever preferred_lft forever
```

此时的 nns2 内

```text
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
28: veth21@if29: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state LOWERLAYERDOWN group default qlen 1000
    link/ether a2:55:d3:cf:03:b8 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.16.0.21/24 scope global veth21
       valid_lft forever preferred_lft forever
```

LOWERLAYERDOWN 是因为默认空间的 veth10 和 veth20 还没起来

```bash
ip link set veth10 up
ip link set veth20 up
```

将系统空间中的 veth10 和 veth20 添加到网桥中

```bash
ip link add br0 type bridge
ip link set br0 up

ip link set veth10 master br0
ip link set veth20 master br0
```

`brctl show` 输出

```text
bridge name     bridge id               STP enabled     interfaces
br0             8000.7e439c59b4ba       no              veth10
                                                        veth20
```

`ip link show master br0` 也可以看到 veth10 和 veth20 已加入网桥

~~尴尬的是网络不通，还不知道为啥~~
