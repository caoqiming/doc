# Load Balancer

二层负载均衡会通过一个虚拟 MAC 地址接收请求，然后再分配到真实的 MAC 地址；
三层负载均衡会通过一个虚拟 IP 地址接收请求，然后再分配到真实的 IP 地址；
四层通过虚拟 IP + 端口接收请求，然后再分配到真实的服务器；
七层通过虚拟的 URL 或主机名接收请求，然后再分配到真实的服务器。
