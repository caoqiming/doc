# self attention

> Attention is a machine learning method that determines the relative importance of each component in a sequence relative to the other components in that sequence.

假设输入序列为

```math
X=[x_1,...,x_N] \in \Bbb{R}^{D_x×N}
```

embedding 后得到 $A=[a_1,...,a_N] \in \Bbb{R}^{D_a×N}$
$N$为输入长度，$D_a$为 embedding 向量的维度

将 embedding 映射到三个不同的空间（QKV）

```math
Q = W^qA, \quad W^q \in \Bbb{R}^{D_k×D_a}
```

```math
K = W^kA, \quad W^k \in \Bbb{R}^{D_k×D_a}
```

```math
V = W^vA, \quad W^v \in \Bbb{R}^{D_v×D_a}
```

计算注意力分布

```math
A = \frac{K^TQ}{\sqrt{D_k}}
```

其中$D_k$是 $W^q$和$W^k$的第一个纬度的大小，这里用于缩放，避免后续 softmax 之后差距过大。（${softmax}(z_i) = \frac{e^{z_i}}{\sum_{j=1}^{N} e^{z_j}}$）

```math
\hat{A} = softmax(A)
```

根据注意力分布$\hat{A}$，加权求和得到输出

自注意力模型的优点：

1. 提高并行计算效率
2. 捕捉长距离的依赖关系

实践中有些问题并不需要捕捉全局结构，只依赖于局部信息，此时可以使用 restricted 自注意力机制，即假设当前词只与前后 r 个词发生联系(类似于卷积中的滑动窗口)

## multi-head self asstention

类比于卷积神经网络，其一个卷积核通常用于捕捉某一类 pattern 的信息，故采用多个卷积核。自注意力机制采用多个 head，便可以捕捉不同的相关性。最后将其合并后再通过一层全连接层进行线性变换。

## Position Encoding

自注意力模型忽略了序列$[x_1,...,x_N]$中每个$x$的位置信息，即将该序列打乱后并不影响输出结果。因此在模型中显式的引入位置编码(position encoding)$e$.

## cross attention

In self-attention, we work with the same input sequence. In cross-attention, we mix or combine two different input sequences. Note that in cross-attention, the two input sequences x_1 and x_2 can have different numbers of elements. However, their embedding dimensions must match.
和 self attention 的区别仅在于，

```math
Q = W^qA_1, \quad W^q \in \Bbb{R}^{D_k×D_a}
```

```math
K = W^kA_2, \quad W^k \in \Bbb{R}^{D_k×D_a}
```

```math
V = W^vA_2, \quad W^v \in \Bbb{R}^{D_v×D_a}
```

如果输入 $A_1$ 和 $A_2$ 相同的话，就和 self attention 一样了
假设输入 $A_1$ 维度为 $n×d$ ，$A_2$ 维度为$m×d$，其中 d 是 embedding 的维度。那么计算出的 attention 的维度是 $n×m$ ，最终输出维度 $n×d_v$

## code

```python
import torch.nn as nn
import torch

class SelfAttention(nn.Module):
    def __init__(self, d_in, d_out_kq, d_out_v):
        super().__init__()
        self.d_out_kq = d_out_kq
        self.W_query = nn.Parameter(torch.rand(d_in, d_out_kq))
        self.W_key   = nn.Parameter(torch.rand(d_in, d_out_kq))
        self.W_value = nn.Parameter(torch.rand(d_in, d_out_v))

    def forward(self, x):
        keys = x @ self.W_key
        queries = x @ self.W_query
        values = x @ self.W_value

        attn_scores = queries @ keys.T  # unnormalized attention weights
        attn_weights = torch.softmax(
            attn_scores / self.d_out_kq**0.5, dim=-1
        )

        context_vec = attn_weights @ values
        return context_vec

class MultiHeadAttentionWrapper(nn.Module):

    def __init__(self, d_in, d_out_kq, d_out_v, num_heads):
        super().__init__()
        self.heads = nn.ModuleList(
            [SelfAttention(d_in, d_out_kq, d_out_v)
             for _ in range(num_heads)]
        )

    def forward(self, x):
        return torch.cat([head(x) for head in self.heads], dim=-1)

class CrossAttention(nn.Module):

    def __init__(self, d_in, d_out_kq, d_out_v):
        super().__init__()
        self.d_out_kq = d_out_kq
        self.W_query = nn.Parameter(torch.rand(d_in, d_out_kq))
        self.W_key   = nn.Parameter(torch.rand(d_in, d_out_kq))
        self.W_value = nn.Parameter(torch.rand(d_in, d_out_v))

    def forward(self, x_1, x_2):           # x_2 is new
        queries_1 = x_1 @ self.W_query

        keys_2 = x_2 @ self.W_key          # new
        values_2 = x_2 @ self.W_value      # new

        attn_scores = queries_1 @ keys_2.T # new
        attn_weights = torch.softmax(
            attn_scores / self.d_out_kq**0.5, dim=-1)

        context_vec = attn_weights @ values_2
        return context_vec
```
