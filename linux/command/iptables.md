# iptables

iptables is a user-space utility program that allows a system administrator to configure the IP packet filter rules of the Linux kernel firewall, implemented as different Netfilter modules.
iptables 默认维护着 4 个表和 5 个链，所有的防火墙策略规则都被分别写入这些表与链中。

- filter 表：控制数据包是否允许进出及转发，可以控制的链路有 INPUT、FORWARD 和 OUTPUT。
- nat 表：控制数据包中地址转换，可以控制的链路有 PREROUTING、INPUT、OUTPUT 和 POSTROUTING。
- mangle：修改数据包中的原数据，可以控制的链路有 PREROUTING、INPUT、OUTPUT、FORWARD 和 POSTROUTING。
- raw：控制 nat 表中连接追踪机制的启用状况，可以控制的链路有 PREROUTING、OUTPUT。

“五链”是指内核中控制网络的 NetFilter 定义的 5 个规则链。每个规则表中包含多个数据链：

- INPUT（入站数据过滤）
- OUTPUT（出站数据过滤）
- FORWARD（转发数据过滤）
- PREROUTING（路由前过滤）
- POSTROUTING（路由后过滤）

## 语法

```
iptables [-t table] COMMAND [chain] CRETIRIA -j ACTION
```

开启 tcp 端口

```bash
iptables -A INPUT -ptcp --dport 80 -j ACCEPT
```

### 查看规则

```bash
iptables -nvL
```

- -L 表示查看当前表的所有规则，默认查看的是 filter 表，如果要查看 nat 表，可以加上 -t nat 参数。
- -n 表示不对 IP 地址进行反查，加上这个参数显示速度将会加快。
- -v 表示输出详细信息，包含通过该规则的数据包数量、总字节数以及相应的网络接口。
- --line-number 显示行号

### 删除规则

删除第 4 行的规则

```bash
iptables -D INPUT 4
```

## 持久化

默认的 iptables 防火墙规则会立刻生效，但如果不保存，当计算机重启后所有的规则都会丢失，所以对防火墙规则进行及时保存的操作是非常必要的。

```bash
# 保存规则
iptables-save > /etc/sysconfig/iptables
# 导入规则
iptables-restore < /etc/sysconfig/iptables
```
