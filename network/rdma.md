# rdma

In computing, remote direct memory access (RDMA) is a direct memory access from the memory of one computer into that of another without involving either one's operating system.

## 技术优势

传统的 TCP/IP 技术在数据包处理过程中，要经过操作系统及其他软件层，需要占用大量的服务器资源和内存总线带宽，数据在系统内存、处理器缓存和网络控制器缓存之间来回进行复制移动，给服务器的 CPU 和内存造成了沉重负担。尤其是网络带宽、处理器速度与内存带宽三者的严重"不匹配性"，更加剧了网络延迟效应。
通过将 RDMA 协议固化于硬件(即网卡)上，以及支持 Zero-copy 和 Kernel bypass 这两种途径来达到其高性能的远程直接数据存取的目标。 使用 RDMA 的优势如下：

- 零拷贝(Zero-copy) - 应用程序能够直接执行数据传输，在不涉及到网络软件栈的情况下。数据能够被直接发送到缓冲区或者能够直接从缓冲区里接收，而不需要被复制到网络层。
- 内核旁路(Kernel bypass) - 应用程序可以直接在用户态执行数据传输，不需要在内核态与用户态之间做上下文切换。
- 不需要 CPU 干预(No CPU involvement) - 应用程序可以访问远程主机内存而不消耗远程主机中的任何 CPU。远程主机内存能够被读取而不需要远程主机上的进程（或 CPU)参与。远程主机的 CPU 的缓存(cache)不会被访问的内存内容所填充。
- 消息基于事务(Message based transactions) - 数据被处理为离散消息而不是流，消除了应用程序将流切割为不同消息/事务的需求。
- 支持分散/聚合条目(Scatter/gather entries support) - RDMA 原生态支持分散/聚合。也就是说，读取多个内存缓冲区然后作为一个流发出去或者接收一个流然后写入到多个内存缓冲区里去。

## 技术实现

目前支持 RDMA 的网络协议有：

1. InfiniBand(IB): 从一开始就支持 RDMA 的新一代网络协议。由于这是一种新的网络技术，因此需要支持该技术的网卡和交换机。
2. RDMA 过融合以太网(RoCE): 即 RDMA over Ethernet, 允许通过以太网执行 RDMA 的网络协议。这允许在标准以太网基础架构(交换机)上使用 RDMA，只不过网卡必须是支持 RoCE 的特殊的 NIC。
3. 互联网广域 RDMA 协议(iWARP): 即 RDMA over TCP, 允许通过 TCP 执行 RDMA 的网络协议。这允许在标准以太网基础架构(交换机)上使用 RDMA，只不过网卡要求是支持 iWARP(如果使用 CPU offload 的话)的 NIC。否则，所有 iWARP 栈都可以在软件中实现，但是失去了大部分的 RDMA 性能优势。
