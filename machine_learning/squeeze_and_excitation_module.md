# Squeeze-and-Excitation Module (SE)

在深度学习中，SE 模块（全称 Squeeze-and-Excitation Module）是一种创新的注意力机制，由胡杰等人在 2017 年提出。它通过自动学习每个通道的重要程度，来增强有用的特征并抑制不重要的特征。

## 核心思想

在传统的卷积神经网络（CNN）中，每一层的输出都有很多“通道”（Channel）。通常情况下，卷积核对每个通道的对待是平等的。 SE 模块的想法是： 并不是所有通道都同等重要。

## 工作步骤

SE 模块的结构非常简单，通常分为以下三步：

- Squeeze（挤压）： 使用全局平均池化（Global Average Pooling）。它将每个通道的大小从 $H \times W$ 压缩成 $1 \times 1$ 的一个数值。这个数值代表了该通道在全局空间上的信息分布。

  > 说人话就是求一个通道上各个点的像素的平均值。

- Excitation（激励）： 通过两个全连接层（FC 层）和激活函数（通常是 ReLU 和 Sigmoid）。这一步的目的是学习通道之间的非线性依赖关系，最终输出每个通道的权重系数。

  > 就是将上一步得到的大小为 $(B, C)$ 的 tensor，输入到两层全连接层。

- Scale（缩放）： 将上一步得到的权重系数（0~1）乘回到原始特征图的对应通道上。重要的通道被放大，不重要的被缩小。
  > 说人话就是把上一部获得的权重乘到对应的通道上去。

## 代码

```python
import torch.nn as nn

class SEBlock(nn.Module):
    def __init__(self, channel, reduction=16):
        super(SEBlock, self).__init__()
        # Squeeze 后的 Excitation 部分
        self.avg_pool = nn.AdaptiveAvgPool2d(1)
        self.fc = nn.Sequential(
            nn.Linear(channel, channel // reduction, bias=False),
            nn.ReLU(inplace=True),
            nn.Linear(channel // reduction, channel, bias=False),
            nn.Sigmoid()
        )

    def forward(self, x):
        b, c, _, _ = x.size()
        y = self.avg_pool(x).view(b, c) # Squeeze
        y = self.fc(y).view(b, c, 1, 1) # Excitation
        return x * y.expand_as(x)       # Scale
```

`x` 形状为 $(B, C, H, W)$, y 的形状为 $(B, C, 1, 1)$, y 的数据的意义是各个通道的权重。为了将权重应用到 x 的每一个点上，`y.expand_as(x)`的作用就是对 y 进行扩展，也就将 $1 \times 1$ 重复成 $H \times W$

> 在物理内存里，它并没有真的去复制这些数据。expand 操作只是把张量的步长（stride）改成了 0,这意味着当计算引擎需要访问这个通道的不同像素位置时，它其实一直在读取内存中同一个地址上的那个权重值。
