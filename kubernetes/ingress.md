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
  ingressClassName: nginx-example
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
