# minikube

```bash
brew install minikube
minikube start
```

Minikube 容器内部有一个特殊的主机名或 IP 地址，可以用来访问 Docker 主机

```bash
minikube ip
```

在 minikube 内部也可以通过 `host.minikube.internal` 来访问 docker 主机
