# 傅里叶级数 （Fourier series）

## 傅里叶级数的公式

对于一个周期为 $T$ 的周期性函数 $x(t)$，它的傅里叶级数可以表示为两种常见形式：

**1. 三角函数形式：**

$$x(t) = a_0 + \sum_{k=1}^{\infty} \left( a_k \cos\left(\frac{2\pi k}{T}t\right) + b_k \sin\left(\frac{2\pi k}{T}t\right) \right)$$

其中：

- $a_0$ 是直流分量（或称为平均值），表示信号的平均强度。
- $a_k$ 和 $b_k$ 是第 $k$ 次谐波的系数，它们决定了频率为 $\frac{k}{T}$ 的正弦波和余弦波的幅度和相位。
- $f_0 = \frac{1}{T}$ 是基频（或基波频率），$k f_0$ 是第 $k$ 次谐波的频率。

这些系数可以通过积分计算出来：

$$a_0 = \frac{1}{T} \int_{T} x(t) dt$$

$$a_k = \frac{2}{T} \int_{T} x(t) \cos\left(\frac{2\pi k}{T}t\right) dt$$

$$b_k = \frac{2}{T} \int_{T} x(t) \sin\left(\frac{2\pi k}{T}t\right) dt$$

这里的积分 $\int_T$ 表示在任何一个完整的周期内进行积分。

**2. 复指数形式（更常用，更简洁）：**

$$x(t) = \sum_{k=-\infty}^{\infty} c_k e^{j \frac{2\pi k}{T}t}$$

其中：

- $e^{j\theta} = \cos(\theta) + j\sin(\theta)$ 是欧拉公式。
- $c_k$ 是复傅里叶级数系数，它包含了 $a_k$ 和 $b_k$ 的所有信息（幅度和相位）。

$c_k$ 的计算公式为：

$$c_k = \frac{1}{T} \int_{T} x(t) e^{-j \frac{2\pi k}{T}t} dt$$

复指数形式更为简洁和数学上优雅，因为它将正弦和余弦函数统一表示，并且在傅里叶变换中能更自然地过渡。
