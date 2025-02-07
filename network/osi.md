# OSI 模型

通常情况下，OSI 模型分为七层：应用层，表示层，会话层，传输层，网络层，数据链路层和物理层。

- Application Layer
- Presentation Layer
- Session Layer
- Transport Layer
  段，端口号，服务进程到服务进程，TCP UDP QUIC
- Network Layer
  包，IP 地址，端到端，IP 协议，路由器，三层交换机
- Data Link Layer
  太网帧，MAC 地址，跳到跳，二层交换机
- Physical Layer
  比特，通过各种方式如电信号传输，光信号传输等

OSI 7 层模型只是一种参考，实际上划分为 5 层可能更符合实际，应用层、表示层、会话层都可以算是应用层

## 三层交换机

三层交换机既可以处理 ip 协议，也可以处理 mac 协议。可以解决 vlan 之间的通信问题。

## 路由器

路由器相比三层交换机多了 WAN 口（广域网接口），作用是连接到外部网络，通常是互联网服务提供商（ISP）提供的网络。WAN 口用于接收来自 ISP 的网络信号，并将其转发到本地局域网（LAN）中的设备。
