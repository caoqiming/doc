# ConvGRU

ConvGRU 就是把 卷积运算（Convolution） 引入到 GRU（门控循环单元） 结构中产生的模型。

## GRU

GRU（Gate Recurrent Unit）是循环神经网络（Recurrent Neural Network, RNN）的一种。

GRU 有两个核心“闸门”，它们由当前输入 $x_t$ 和上一时刻状态 $h_{t-1}$ 共同决定：

1. 重置门 (Reset Gate) $r_t$：决定“旧记忆”中有多少需要被忽略。
   $$
   r_t = \sigma(W_r \cdot [h_{t-1}, x_t])
   $$
2. 更新门 (Update Gate) $z_t$：决定有多少信息被保留到当前状态，类似于 LSTM 中遗忘门和输入门的结合体。
   $$
   z_t = \sigma(W_z \cdot [h_{t-1}, x_t])
   $$

> $\sigma$ 为 sigmoid 函数, $[h_{t-1}, x_t]$ 是拼接

候选隐藏状态 (Candidate Hidden State) $\tilde{h}_t$ ，这是当前时刻尝试学习的新内容。

$$
\tilde{h}_t = \tanh(W \cdot [r_t \odot h_{t-1}, x_t])
$$

这里的 $r_t \odot h_{t-1}$ 就是利用**重置门**对旧记忆进行筛选。如果 $r_t$ 为 0，则完全抛弃旧记忆，只根据当前输入计算。
最终隐藏状态 (Final Hidden State) $h_t$， 通过更新门 $z_t$ 在“旧记忆”和“新内容”之间做加权平均（插值）：

$$
h_t = (1 - z_t) \odot h_{t-1} + z_t \odot \tilde{h}_t
$$

GRU 的逻辑可以精简为一句话：先用 $r_t$ 过滤旧记忆得出新候选，再用 $z_t$ 决定在旧记忆和新候选之间取舍多少。

## ConvGRU

ConvGRU 与 GRU 在结构上几乎完全一样，唯一的区别在于计算方式：将原来的矩阵乘法（全连接层）替换为卷积运算
