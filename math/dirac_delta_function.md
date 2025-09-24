# 冲击函数 （Dirac delta function）

狄拉克冲激函数 $\delta(x)$ 是一种广义函数，它在 $x=0$ 处无限大，而在其他地方为零，且其积分值为 1：

$$\int_{-\infty}^{\infty} \delta(x) dx = 1$$

其最重要的性质是**筛选性质（sifting property）**：

$$\int_{-\infty}^{\infty} \phi(x) \delta(x-x_0) dx = \phi(x_0)$$

这意味着当 $\delta(x-x_0)$ 与另一个函数 $\phi(x)$ 相乘并积分时，结果是 $\phi(x)$ 在冲激点 $x_0$ 处的值。

## 1.1 $\delta(t)$的傅里叶变换

$$\int_{-\infty}^{\infty} \delta(t) e^{-j\omega t} dt = 1$$

## 1.2 $\delta(t)$的傅里叶逆变换

$$x(t) = \frac{1}{2\pi} \int_{-\infty}^{\infty} \delta(\omega) e^{j \omega t} d\omega = \frac{1}{2\pi}$$

## 1.3 $\delta(t - t_0)$ 的傅里叶变换

$$
\int_{-\infty}^{\infty} \delta(t - t_0) e^{-j\omega t} dt = e^{-j\omega t_0}
$$

## 1.4 $e^{-j\omega t_0}$的傅里叶逆变换

$$
 \delta(t - t_0) = \frac{1}{2\pi} \int_{-\infty}^{\infty} e^{-j\omega t_0} e^{j \omega t} d\omega = \frac{1}{2\pi} \int_{-\infty}^{\infty} e^{-j\omega (t - t_0)} d\omega
$$

因为冲击函数是偶函数，因此我们可以得出如下奇怪的结论

$$
 \delta(t - t_0) =  \frac{1}{2\pi} \int_{-\infty}^{\infty} e^{j\omega (t - t_0)} d\omega
$$

$$
 \delta(A) =  \frac{1}{2\pi} \int_{-\infty}^{\infty} e^{j\omega A} d\omega
$$

## 1.5 $e^{j k \omega_0 t}$ 的傅里叶变换

现在，我们来推导复指数信号 $x(t) = e^{j k \omega_0 t}$ 的傅里叶变换。

根据傅里叶变换的定义：

$$X(\omega) = \int_{-\infty}^{\infty} e^{j k \omega_0 t} e^{-j \omega t} dt$$

我们可以合并指数项：

$$X(\omega) = \int_{-\infty}^{\infty} e^{j (k \omega_0 - \omega) t} dt$$

答案不可能是一个常规的函数，因为显然这个并不收敛
结合 1.4，结论如下：

$$
X(\omega) = 2\pi\delta(\omega - k \omega_0)
$$

$$
X(f) = \delta(f - k f_0)
$$

注意冲击函数还有个性质 $ \frac{1}{k}\delta(t)=\delta(kt)$
因为

$$
\int_{-\infty}^{\infty} \delta(kt) dt = \frac{1}{k} \int_{-\infty}^{\infty} \delta(kt) dkt = \frac{1}{k}
$$

所以 $ \frac{1}{k}\delta(t)=\delta(kt)$
~~冲击函数有点反直觉的~~

## 1.6 周期采样信号的傅里叶变换

首先，我们定义周期为 $T$ 的冲击采样信号 $s(t)$ 为：

$$s(t) = \sum_{n=-\infty}^{\infty} \delta(t - nT)$$

对于任何一个周期函数 $x(t)$ (周期为 $T$)，它的傅里叶级数展开可以表示为：

$$x(t) = \sum_{k=-\infty}^{\infty} c_k e^{j 2\pi k f_0 t}$$

其中，$f_0 = \frac{1}{T}$ 是基频，而傅里叶级数系数 $c_k$ 由以下公式给出：

$$c_k = \frac{1}{T} \int_{T} x(t) e^{-j 2\pi k f_0 t} dt$$

这里的积分是在任意一个周期 $T$ 内进行的。

现在，我们将周期性冲激串 $s(t)$ 代入傅里叶级数系数的公式中。我们选择一个周期，例如从 $-\frac{T}{2}$ 到 $\frac{T}{2}$：

$$c_k = \frac{1}{T} \int_{-T/2}^{T/2} \left( \sum_{n=-\infty}^{\infty} \delta(t - nT) \right) e^{-j 2\pi k f_0 t} dt$$

在一个周期 $[-\frac{T}{2}, \frac{T}{2}]$ 内，只有一个冲激函数 $\delta(t)$ 在 $t=0$ 处有值。因此，求和符号中只有 $n=0$ 的项对积分有贡献：

$$c_k = \frac{1}{T} \int_{-T/2}^{T/2} \delta(t) e^{-j 2\pi k f_0 t} dt$$

$$c_k = \frac{1}{T} \cdot e^{0} = \frac{1}{T}$$

所以，所有的傅里叶级数系数 $c_k$ 都等于 $\frac{1}{T}$。

现在，我们将 $c_k$ 代回到傅里叶级数展开的表达式中：

$$s(t) = \sum_{k=-\infty}^{\infty} \frac{1}{T} e^{j 2\pi k f_0 t}$$

最后，我们知道一个信号的傅里叶变换 $X(f)$ 是由 $x(t)$ 的傅里叶变换定义为：

$$X(f) = \mathcal{F}\{x(t)\} = \int_{-\infty}^{\infty} x(t) e^{-j 2\pi f t} dt$$

根据 1.5 节我们知道一个复指数信号 $e^{j 2\pi k f_0 t}$ 的傅里叶变换是狄拉克冲激函数 $\delta(f - k f_0)$：

$$\mathcal{F}\{e^{j 2\pi k f_0 t}\} = \delta(f - k f_0)$$

因此，对 $s(t)$ 进行傅里叶变换：

$$S(f) = \mathcal{F}\left\{ \sum_{k=-\infty}^{\infty} \frac{1}{T} e^{j 2\pi k f_0 t} \right\}$$

由于傅里叶变换是线性的，我们可以将常数项移出求和符号和傅里叶变换操作，并将傅里叶变换应用到每一项：

$$S(f) = \frac{1}{T} \sum_{k=-\infty}^{\infty} \mathcal{F}\left\{ e^{j 2\pi k f_0 t} \right\}$$

$$S(f) = \frac{1}{T} \sum_{k=-\infty}^{\infty} \delta(f - k f_0)$$

代入 $f_0 = 1/T$，最终得到：

$$S(f) = \frac{1}{T} \sum_{k=-\infty}^{\infty} \delta\left(f - \frac{k}{T}\right)$$

## 1.7 冲击函数与其他函数卷积

$$
\begin{align}
\delta(t-t_0)*g(t) &=\int_{-\infty}^{\infty}\delta(\tau-t_0)g(t-\tau)d\tau \\
     &= g(t-t_0)
\end{align}
$$
