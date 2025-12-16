# Rayleigh distribution

**瑞利分布**描述了当一个**随机二维向量**的两个**互相独立**的分量都服从**均值为零**、**方差相同**的正态分布（高斯分布）时，这个向量的**模**所服从的概率分布。

- **通俗理解：** 想象一个粒子在二维平面上做随机运动，它在 $x$ 方向和 $y$ 方向上的速度分量都是独立的、平均为零的、服从相同方差的正态分布。那么，这个粒子的合速度（速度向量的模）就服从瑞利分布。
- **常见应用：** 瑞利分布在**无线通信**中尤为重要，它常用于描述**瑞利衰落信道**中接收信号包络的幅度分布，尤其是在没有直射路径（Line-of-Sight, LoS），只有大量散射体存在的情况下。它也是**威布尔分布**的一个特例。

## 瑞利分布的概率密度函数 (PDF)

瑞利分布的概率密度函数（Probability Density Function, PDF）只有一个尺度参数 $\sigma > 0$（sigma），通常称为**尺度参数**。

对于一个随机变量 $X \ge 0$ 且服从瑞利分布，其概率密度函数 $f(x; \sigma)$ 为：

$$f(x; \sigma) = \frac{x}{\sigma^2} e^{-x^2 / (2\sigma^2)}, \quad x \ge 0$$

其中：

- $x$ 是随机变量的值（如向量的模）。
- $\sigma$ 是尺度参数（$\sigma^2$ 是二维正态分布分量的方差）。
- $e$ 是自然对数的底数。

## 瑞利分布的由来（推导）

瑞利分布的公式是由它的定义直接推导出来的。

### 1. 初始假设

我们假设有两个相互独立的随机变量 $Y_1$ 和 $Y_2$，它们都服从**均值为 0**、**方差为 $\sigma^2$** 的正态分布（高斯分布）。

因此，$Y_1 \sim N(0, \sigma^2)$ 和 $Y_2 \sim N(0, \sigma^2)$。

它们各自的概率密度函数为：
$$f_{Y_i}(y) = \frac{1}{\sigma\sqrt{2\pi}} e^{-y^2 / (2\sigma^2)}, \quad i = 1, 2$$

### 2. 定义瑞利随机变量

我们定义一个新的随机变量 $X$ 为 $Y_1$ 和 $Y_2$ 组成的二维向量的模（长度）：
$$X = \sqrt{Y_1^2 + Y_2^2}$$

### 3. 联合概率密度

由于 $Y_1$ 和 $Y_2$ 相互独立，它们的联合概率密度函数是各自密度的乘积：
$$f_{Y_1, Y_2}(y_1, y_2) = f_{Y_1}(y_1) f_{Y_2}(y_2) = \left(\frac{1}{\sigma\sqrt{2\pi}} e^{-y_1^2 / (2\sigma^2)}\right) \left(\frac{1}{\sigma\sqrt{2\pi}} e^{-y_2^2 / (2\sigma^2)}\right)$$

$$\implies f_{Y_1, Y_2}(y_1, y_2) = \frac{1}{2\pi\sigma^2} e^{-(y_1^2 + y_2^2) / (2\sigma^2)}$$

### 4. 坐标变换（极坐标）

为了求 $X = \sqrt{Y_1^2 + Y_2^2}$ 的分布，我们从笛卡尔坐标 $(Y_1, Y_2)$ 变换到极坐标 $(X, \Theta)$：
$$\begin{cases} Y_1 = X \cos\Theta \\ Y_2 = X \sin\Theta \end{cases}$$

其中，$X$ 是模（长度，$X \ge 0$），$\Theta$ 是角度（$\Theta \in [0, 2\pi)$）。

雅可比行列式（Jacobian）为：
$$|J| = \left| \det \begin{pmatrix} \frac{\partial Y_1}{\partial X} & \frac{\partial Y_1}{\partial \Theta} \\ \frac{\partial Y_2}{\partial X} & \frac{\partial Y_2}{\partial \Theta} \end{pmatrix} \right| = \left| \det \begin{pmatrix} \cos\Theta & -X\sin\Theta \\ \sin\Theta & X\cos\Theta \end{pmatrix} \right| = X(\cos^2\Theta + \sin^2\Theta) = X$$

### 5. 联合概率密度 (极坐标下)

将 $Y_1^2 + Y_2^2 = X^2$ 和 $|J|=X$ 代入联合密度函数：
$$f_{X, \Theta}(x, \theta) = f_{Y_1, Y_2}(x\cos\theta, x\sin\theta) \cdot |J|$$
$$f_{X, \Theta}(x, \theta) = \left( \frac{1}{2\pi\sigma^2} e^{-x^2 / (2\sigma^2)} \right) \cdot x, \quad x \ge 0, \quad 0 \le \theta < 2\pi$$

### 6. 求边缘分布

要找到 $X$ 的概率密度函数 $f_X(x)$，我们需要对 $\Theta$ 在其取值范围 $[0, 2\pi)$ 内进行积分：
$$f_X(x) = \int_0^{2\pi} f_{X, \Theta}(x, \theta) d\theta = \int_0^{2\pi} \frac{x}{2\pi\sigma^2} e^{-x^2 / (2\sigma^2)} d\theta$$

由于被积函数不含 $\theta$，积分结果为：
$$f_X(x) = \frac{x}{2\pi\sigma^2} e^{-x^2 / (2\sigma^2)} \cdot \int_0^{2\pi} d\theta = \frac{x}{2\pi\sigma^2} e^{-x^2 / (2\sigma^2)} \cdot (2\pi)$$

最终得到瑞利分布的概率密度函数：
$$f_X(x) = \frac{x}{\sigma^2} e^{-x^2 / (2\sigma^2)}, \quad x \ge 0$$

这就是瑞利分布的由来。

## 例子

假设一个合成信号 $A$ 是 $N$ 个独立的、幅度 $a_k$ 和相位 $\phi_k$ 随机的子波 $A_k$ 的叠加：
$$A = \sum_{k=1}^{N} A_k = \sum_{k=1}^{N} a_k e^{j\phi_k}$$
其中 $j = \sqrt{-1}$。

我们可以将合成信号 $A$ 表示为一个**复数**：
$$A = R + jI$$
其中 $R$ 是实部（同相分量），$I$ 是虚部（正交分量）：
$$\begin{cases} R = \sum_{k=1}^{N} a_k \cos\phi_k \\ I = \sum_{k=1}^{N} a_k \sin\phi_k \end{cases}$$

**中心极限定理 (Central Limit Theorem, CLT)** 指出，大量**独立同分布 (i.i.d.)** 的随机变量的**和**（或平均值）的分布，会随着 $N \to \infty$ 而趋向于**正态分布**。

**应用到叠加波：**

- 实部 $R$ 是 $N$ 个独立随机变量 $a_k \cos\phi_k$ 的和。
- 虚部 $I$ 是 $N$ 个独立随机变量 $a_k \sin\phi_k$ 的和。

当子波数量 $N$ **足够大**时，根据中心极限定理，合成信号的实部 $R$ 和虚部 $I$ 都将近似服从**正态分布**。

我们通常假设：

1.  **实部和虚部均值近似为零：** $E[R] \approx 0$，$E[I] \approx 0$ (因为相位 $\phi_k$ 均匀分布)。
2.  **实部和虚部方差相等：** $\sigma_R^2 = \sigma_I^2 = \sigma^2$。
3.  **实部和虚部独立：** $R$ 和 $I$ 相互独立。

满足这些条件时，复数信号 $A = R + jI$ 的**联合概率密度函数** (PDF)

$$
f_{R, I}(r, i) = \frac{1}{2\pi\sigma^2} \exp\left\{-\frac{r^2 + i^2}{2\sigma^2}\right\}
$$

对于复数 $A = R + jI$，我们关心的是它的**模（幅度）** $a$ 和**相位** $\phi$：

$$
\begin{cases} a = |A| = \sqrt{R^2 + I^2} \\ \phi = \arg(A) = \arctan(I/R) \end{cases}
$$

- **幅度分布 $f_A(a)$：**

  $$
  f_A(a) = \frac{a}{\sigma^2} \exp\left\{-\frac{a^2}{2\sigma^2}\right\}, \quad a \ge 0
  $$

  **这就是标准的瑞利分布。**

- **相位分布 $f_\phi(\phi)$：**
  $$
  f_\phi(\phi) = \frac{1}{2\pi}, \quad 0 \le \phi < 2\pi
  $$
  **这是一个均匀分布。**

因此，当大量独立随机波叠加时，**其复数形式的实部和虚部服从正态分布（CLT 决定），而其模（幅度）服从瑞利分布（几何关系决定）。**
