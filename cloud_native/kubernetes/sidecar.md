# sidecar

在 1.28 版本之后才支持通过将 init container 的 restart policy 设置为 “Always” 来实现 sidecar。在此之前只能添加一个主容器。

How did users get sidecar behavior before 1.28?
Prior to the sidecar feature, the following options were available for implementing sidecar behavior depending on the desired lifetime of the sidecar container:

- Lifetime of sidecar less than Pod lifetime: Use an init container, which provides well-defined startup order. However, the sidecar has to exit for other init containers and main Pod containers to start.
- Lifetime of sidecar equal to Pod lifetime: Use a main container that runs alongside your workload containers in the Pod. This method doesn't give you control over startup order, and lets the sidecar container potentially block Pod termination after the workload containers exit.
