# 交换机

网络交换机(Network switch)是一种网络硬件，通过报文交换接收和转发数据到目标设备，它能够在计算机网络上连接不同的设备。一般也简称为交换机。
交换机是一种多端口的网桥，在数据链路层使用 MAC 地址转发数据。通过加入路由功能，一些交换机也可以在网络层转发数据，这种交换机一般被称为**三层交换机**或者多层交换机。

## 工作原理

交换机工作于 OSI 参考模型的第二层，即数据链路层。交换机内部的 CPU 会在每个端口成功连接时，通过将 MAC 地址和端口对应，形成一张 MAC 表。在之后的通讯中，发往该 MAC 地址的数据包将仅送往其对应的端口。因此交换机可用于划分数据链路层广播，即冲突域；但它不能划分网络层广播，即广播域。

- 收到某网段(设为 A)MAC 地址为 X 的计算机发给 MAC 地址为 Y 的计算机的数据包。交换机从而记下了 MAC 地址 X 在网段 A。这称为学习(learning)。
- 交换机还不知道 MAC 地址 Y 在哪个网段上，于是向除了 A 以外的所有网段转发该数据包。这称为泛洪(flooding)。
- MAC 地址 Y 的计算机收到该数据包，向 MAC 地址 X 发出确认包。交换机收到该包后，从而记录下 MAC 地址 Y 所在的网段。
- 交换机向 MAC 地址 X 转发确认包。这称为转发(forwarding)。
- 交换机收到一个数据包，查表后发现该数据包的来源地址与目的地址属于同一网段。交换机将不处理该数据包。这称为过滤(filtering)。
- 交换机内部的 MAC 地址-网段查询表的每条记录采用时间戳记录最后一次访问的时间。早于某个阈值(用户可配置)的记录被清除。这称为老化(aging)。

## 工作在 OSI 不同层级的交换技术

现代商业交换机主要使用以太网接口。提供多端口的二层桥接是以太网交换机的核心功能，而很多交换机也提供其他层级的服务，这种不仅仅提供了桥接功能的交换机也被称为多层交换机。多层交换机可以在许多层级上学习拓扑结构，也可以在一层或多层上进行转发。

### 一层

一层网络设备传输数据而不控制任何流量，比如集线器。任何进入端口数据包会被转发到除进入端口之外的其他所有端口。具体而言，即每个比特或码元被转发时是原封不动的。由于每个数据包被分发到所有端口，其冲突会影响到整个网络，进而限制了它的整体的能力。

### 二层

二层交换机依据硬件地址(MAC 地址)在数据链路层(第二层)传送网络帧。 二层交换机对于路由器和主机是“透明的”，主要遵从 802.1d 标准。
当交换机初次加入网络中时，由于映射表是空的，所以，所有的数据帧将发往虚拟局域网内的全部端口直到交换机“学习”到各个 MAC 地址为止。这样看来，交换机刚刚启动时与传统的共享式集线器作用相似的，直到映射表建立起来后，才能真正发挥它的性能。

### 三层

三层交换机则可以处理第三层网络层协议，用于连接不同网段，通过对缺省网关的查询学习来建立两个网段之间的直接连接。
三层交换机同时具有 MAC 地址表和 IP 路由表，可以执行静态路由和动态路由，并且还处理 VLAN 内通信以及不同 VLAN 之间的数据包路由。

### 四层

四层交换机可以处理第四层传输层协议，可以将会话与一个具体的 IP 地址绑定，以实现虚拟 IP。