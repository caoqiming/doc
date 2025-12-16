# kafka

## run kafka with docker

```bash
docker pull apache/kafka:4.1.1
docker run -p 9092:9092 -d apache/kafka:4.1.1
```

- **无密码**: 默认情况下不需要用户名和密码，可以直接连接
- **监听端口**: 9092
- **模式**: KRaft 模式（无需 ZooKeeper）
- **安全性**: 生产环境建议配置 SASL/SSL 认证

## 核心机制

### 分区

核心机制：分区分配 (Partition Assignment)
消费者组 (Consumer Group): 多个消费者可以属于同一个逻辑组。组内的所有消费者一起合作，共同消费一个 Topic 的数据。
分区（Partitions）是在 创建 Topic 时 定义的。 它们是 Topic 的核心结构，而不是由消费者决定的。

分区是并行单位 (Partition as Unit of Parallelism): Kafka 保证：在一个消费者组内，一个分区（Partition） 中的数据永远只会分配给组内的一个消费者进行消费。分区数小于消费者数时，多出来的那些消费者并不会获得新的数据流，它们扮演的角色就是 “热备”（Hot Standby） 或 “备份消费者”：

负载均衡: 当组内有多个消费者时，Kafka 会将 Topic 的所有分区尽可能均匀地分配给这些消费者。

### Message Key

为需要保证有序性的消息（如用户订单、账户变动）设置 Message Key。同一 Key 的消息将始终被发送到同一个分区，保证严格的顺序。

## 应用场景

> 在绝大多数高吞吐量场景下，写入 Kafka 会比写入 MySQL 快得多。

- 日志/指标聚合 (Log and Metrics Aggregation)
  这是 Kafka 最初的应用场景。核心目标是高吞吐量、低延迟地收集海量非关键数据。

- 流式处理与 ETL 数据管道 (Stream Processing / ETL)
  用于清洗、转换、丰富数据，最终将数据导入数据仓库或数据库。

- 微服务通信与解耦 (Microservices Messaging)
  将服务间的同步调用转为异步事件驱动，提高系统的弹性和可用性。

- 事件溯源与数据变更捕获 (Event Sourcing / CDC)
  利用 Kafka 存储所有业务事件或数据库变更记录。
