# depthwise convolution

## 普通的卷积

普通的卷积卷积核（Filter 或 Kernel）是一个三维的张量，它的尺寸由以下部分决定：

$$
D_K \times D_K \times C_{\text{in}}
$$

- $D_K \times D_K$： 卷积核的空间尺寸（高度 $\times$ 宽度），通常是 $3 \times 3$ 或 $5 \times 5$ 等奇数尺寸。
- $C_{\text{in}}$： 卷积核的深度，它必须与输入特征图的通道数完全一致。

卷积核在一个位置(x,y)与输入数据卷积，只会得到一个值。也就是说一个卷积核在与形状为$(B,W,H,C)$的输入完成卷积操作之后得到的形状为$(B,W,H,1)$

如果我们想要有$C_{out}$个通道的输出，我们就需要有$C_{out}$个卷积核。
所以总共的参数量为

$$
D_K \times D_K \times C_{\text{in}} \times C_{out}
$$

计算量为$D_K \times D_K \times C_{\text{in}} \times W \times H \times C_{\text{out}}$ 个乘法

## 分离式卷积

分离式卷积在卷积时会对输入的通道独立做卷积。且每个通道只有一个独立的卷积核心。
因此卷积核心的参数量为

$$
D_K \times D_K \times C_{\text{in}}
$$

输入依然为 $(B,W,H,C)$，在给通道做完独立的卷积之后的输出形状依然为 $(B,W,H,C)$
这时候为了得到通道数为$C_{\text{out}}$的输出，只需要将每个位置$(x,y)$上的各个通道的值通过一个线性变换（Dence 层）就可以了。这一步叫做逐点卷积。~~我不喜欢这个叫法，明明就是简单的线性变换，说的这么抽象。符合我对搞 AI 的刻板影响：故意把简单概念说复杂来显得有壁垒。~~

> 但话又说回来，这里不叫 dence 层，是因为这里的线性变换跟 $(x,y)$ 位置没关系，所有点的变换都是一样的。跟正常的 $1 \times 1$ 的卷积一致。~~话说之前真有卷积核大小为 1 的卷积吗。~~ 哎，但这个说是对输入通道的一个线性变换一点问题没有。

因此分离式卷积的总参数量为（不加 bias 的话）

$$
D_K \times D_K \times C_{\text{in}} + 1 \times 1 \times C_{\text{in}} \times C_{\text{out}}
$$

计算乘法数量为

$$
D_K \times D_K \times W \times H \times C_{\text{in}} + W \times H \times C_{\text{in}} \times C_{\text{out}}
$$
