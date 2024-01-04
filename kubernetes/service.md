# Service

In Kubernetes, a Service is a method for exposing a network application that is running as one or more Pods in your cluster.

## 工作原理

1. 运行在每个 Node 节点的 kube-proxy 会 watch Services 和 Endpoints 对象。
   > 当用户在 kubernetes 集群中创建了含有 label 的 Service 之后，同时会在集群中创建出一个同名的 Endpoints 对象，用于存储该 Service 下的 Pod IP.
2. 每个运行在 Node 节点的 kube-proxy 感知到 Services 和 Endpoints 的变化之后，会在各自的 Node 节点设置相关的 iptables 或 IPVS 规则，用于之后用户通过 Service 的 ClusterIP 去访问该 Service 下的服务。

## service 类型

### ClusterIP

ClusterIP 类型的 Service 是 Kubernetes 集群默认的 Service, 它只能用于集群内部通信。可以通过 [Ingress](ingress.md) 或 Gateway 将这种 Service 暴露到公网。

### NodePort

NodePort 类型的 Service 会在集群内部的所有 Node 节点打开一个指定的端口。之后所有的流量直接发送到这个端口之后，就会转发的 Service 去对真实的服务进行访问。

### LoadBalancer

LoadBalancer 类型的 Service 通常和云厂商的 LB 结合一起使用(k8s 不提供 LB 组件)，用于将集群内部的服务暴露到外网，云厂商的 LoadBalancer 会给用户分配一个 IP,之后通过该 IP 的流量会转发到你的 Service.

### ExternalName

Maps the Service to the contents of the externalName field (for example, to the hostname api.foo.bar.example). The mapping configures your cluster's DNS server to return a CNAME record with that external hostname value. No proxying of any kind is set up.

## 定义一个 service

For example, suppose you have a set of Pods that each listen on TCP port 9376 and are labelled as `app.kubernetes.io/name=MyApp`. You can define a Service to publish that TCP listener:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app.kubernetes.io/name: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
```

Applying this manifest creates a new Service named "my-service" with the default ClusterIP service type. The Service targets TCP port 9376 on any Pod with the app.kubernetes.io/name: MyApp label.
The controller for that Service continuously scans for Pods that match its selector, and then makes any necessary updates to the set of EndpointSlices for the Service.

## DNS

A cluster-aware DNS server, such as CoreDNS, watches the Kubernetes API for new Services and creates a set of DNS records for each one. If DNS has been enabled throughout your cluster then all Pods should automatically be able to resolve Services by their DNS name.
