# Container Network Interface

在 Kubernetes 的早期版本（1.0 及之前），网络配置相对简单，主要依赖于 kubenet 等内置网络插件。这些插件提供了基本的网络连接功能，但存在一些限制，缺乏灵活性和扩展性。为了解决上述问题，CoreOS 等公司提出了 CNI（Container Network Interface）规范。CNI 的设计目标是定义一个标准的接口，使得不同的网络实现可以通过统一的方式集成到 Kubernetes 中。

## CNI 工作流程

1. Pod 创建请求：用户通过 Kubernetes API Server 发送 Pod 创建请求。
2. 调度器分配节点：Kubernetes 调度器将 Pod 调度到适当的节点。
3. Kubelet 接收指令：节点上的 Kubelet 接收到创建 Pod 的指令。
4. 调用 CRI：Kubelet 通过 CRI 调用容器运行时（如 containerd）来创建容器。
5. 调用 CNI 插件：在容器创建过程中，Kubelet 调用 CNI 插件来配置网络。

## CNI 插件详细工作步骤

1. CNI 配置文件：每个节点上都有一个 CNI 配置文件（通常位于/etc/cni/net.d 目录下），定义了 CNI 插件的类型和配置。
2. 调用 CNI 插件：Kubelet 根据配置文件调用相应的 CNI 插件。
3. 创建网络接口：CNI 插件在宿主机和容器网络命名空间中创建 veth 对。
4. 分配 IP 地址：CNI 插件调用 IPAM 模块分配 IP 地址。
5. 设置路由和防火墙规则：CNI 插件配置必要的路由和防火墙规则，以确保 Pod 之间及 Pod 与外部网络的通信。
6. 返回结果：CNI 插件将配置结果返回给 Kubelet，Kubelet 完成 Pod 的启动。
