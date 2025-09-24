# fire wall

## Debian

```bash
iptables -A INPUT -ptcp --dport 2222 -j ACCEPT
service iptables save

# 查看现有规则
sudo iptables -L INPUT -n --line-numbers
```

## ubunbtu

持久化

```bash
sudo apt install iptables-persistent

# 保存 IPv4 规则
sudo sh -c 'iptables-save > /etc/iptables/rules.v4'

# 保存 IPv6 规则
sudo sh -c 'ip6tables-save > /etc/iptables/rules.v6'
```
