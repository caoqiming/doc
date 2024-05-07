# Ingress

An API object that manages external access to the services in a cluster, typically HTTP. Ingress may provide load balancing, SSL termination and name-based virtual hosting.

ingress 不是 load balancer，它包含了所有的路由规则，定制的 header 和 TLS 配置。ingress controller 实际上扮演了 load balancer 的角色。

## 定义一个 ingress

A minimal Ingress resource example:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: minimal-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: ingress-nginx
  rules:
    - http:
        paths:
          - path: /testpath
            pathType: Prefix
            backend:
              service:
                name: test
                port:
                  number: 80
```

如果你没有配置 Ingress controller 就将其 POST 到 API server 不会有任何用处。
以最常见的 ingress-nginx 为例，当用户更新 Ingress 资源后，Ingress Controller（ingress-nginx）就会将其中定义的转发规则写入到 Nginx 的配置文件（nginx.conf）中。内置的 Nginx 组件（nginx 的 pod）进行 reload，加载更新后的配置文件，完成 Nginx 转发规则的修改和更新。

当你在 Kubernetes 集群中配置了 Ingress，在集群外部的请求流程会是这样的：

1. 首先，你需要有一个公网可以访问的域名，这个域名需要指向 Kubernetes 集群的某个可以公网访问的节点，通常我们会将域名指向部署了 nginx-ingress 控制器的节点。
2. 当外部的请求通过域名请求到达 Kubernetes 集群时，请求会被路由到部署了 nginx-ingress 控制器的节点。再由类型为 NodePort 或 LoadBalancer 的 Service 转发到 pod 上。（Kubernetes 的 kube-proxy 组件就会根据 Iptables/Ipvs 规则，将请求路由到集群内部的一个 nginx-ingress 控制器的 Pod 上。）
3. 在 nginx-ingress 控制器节点上，nginx 会根据已经预先配置的路由规则（由 Ingress 资源定义），将请求转发到对应的服务。
4. 服务再根据内部的负载均衡策略将请求转发到对应的 Pod 上。
