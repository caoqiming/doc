# workequeue

FIFO 队列数据结构中最主要的字段有 queue、dirty 和 processing。其中 queue 字段是实际存储元素的地方，它是 slice 结构的，用于保证元素有序；dirty 字段非常关键，除了能保证去重，还能保证在处理一个元素之前哪怕其被添加了多次（并发情况下），但也只会被处理一次；processing 字段用于标记机制，标记一个元素是否正在被处理。
接口行为：

- 入列（Add 和 AddAfter）
  - 如果是新对象，同时加入 dirty 和 queue
  - 如果是已有对象，不执行任何操作
  - 如果是处理中的对象，加入 dirty，不加入 queue
- 出列（Get）
  - 如果 queue 为空则持续等待、不反回。
  - 如果 queue 不为空，返回时间戳最早的对象。
- 处理完成回执（Done）
  - 从 processing 中移除对象。
  - 如果对象存在于 dirty 中，将对象加入 queue。
