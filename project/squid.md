# squid

Squid is a caching proxy for the Web supporting HTTP, HTTPS, FTP, and more. It reduces bandwidth and improves response times by caching and reusing frequently-requested web pages.

```bash
apt-get install squid
# 为了使用htpasswd生成密码还需要安装
apt-get install apache2-utils
```

修改配置文件`/etc/squid/squid.conf`

```
auth_param basic program /usr/lib/squid/basic_ncsa_auth /etc/squid/passwords
auth_param basic realm proxy
acl authenticated proxy_auth REQUIRED
http_access allow authenticated
```

```bash
htpasswd -c /etc/squid/passwords username_you_like
service squid restart
```

chrome 可以用 SwitchyOmega 连接
