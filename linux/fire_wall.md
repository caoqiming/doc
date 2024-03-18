# fire wall

## Debian

```bash
iptables -A INPUT -ptcp --dport 2222 -j ACCEPT
service iptables save
```
