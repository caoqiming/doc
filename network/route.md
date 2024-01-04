# 路由

```shell
# 查看路由
ip route
# 添加到达目标主机的路由记录
ip route add 目标主机 via 网关
# 添加到达网络的路由记录
ip route add 目标网络/掩码 via 网关
# 添加默认路由
ip route add default via 网关
# 删除路由
ip route del 目标网络/掩码
ip route del default [via 网关]
```
