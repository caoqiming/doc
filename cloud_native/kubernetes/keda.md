# Kubernetes Event-driven Autoscaling(KEDA)

K8s HPA 的主要限制在于它默认只能根据资源的内部利用率来进行伸缩决策。KEDA 扩展了 HPA 的能力，可以直接连接到 Kafka、Redis、Prometheus、AWS SQS/Lambda、Azure/GCP Pub/Sub 等外部事件源，并根据队列长度或事件量进行伸缩。

## install

```bash
helm repo add kedacore https://kedacore.github.io/charts
helm repo update
helm install keda kedacore/keda --namespace keda --create-namespace
```

## usage

定义 scaledobject.yaml

```yaml
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: mysql-scaledobject
  namespace: starroll
spec:
  scaleTargetRef:
    kind: Deployment
    name: scalable-worker
  pollingInterval: 10 # 每 10 秒查询一次指标
  cooldownPeriod: 10 # 缩容冷却期 10 秒
  minReplicaCount: 0 # 可选：最小副本数
  maxReplicaCount: 10 # 可选：最大副本数
  triggers:
    - type: mysql
      metadata:
        queryValue: "2" # 目标副本数 = CEIL(查询结果 / queryValue)
        activationQueryValue: "1" # 查询结果大于这个值之后开始扩容（从 0 或 minReplicaCount 开始增加副本）
        query: "select value from metrics_test where id=1;"
      authenticationRef:
        name: keda-trigger-auth-mysql-secret
```

这个例子，被伸缩的就是 starroll namespace 下的名为 scalable-worker 的 Deployment

为了读取 mysql 的密码，我们还需要创建一个 secret

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mysql-secrets
  namespace: starroll
type: Opaque
data:
  mysql_conn_str: xxx # base64  user:password@tcp(lcoalhost:3306)/db_name
```

再授权

```yaml
apiVersion: keda.sh/v1alpha1
kind: TriggerAuthentication
metadata:
  name: keda-trigger-auth-mysql-secret
  namespace: starroll
spec:
  secretTargetRef:
    - parameter: connectionString # ScaledObject 会自动读取这个字段
      name: mysql-secrets
      key: mysql_conn_str
```
