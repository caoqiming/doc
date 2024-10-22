# 四元数（quaternions）

$$
q = a + b\bf{i} + c\bf{j} + d\bf{k}
$$

其中

$$
\begin{align*}
i^2 = j^2 = k^2 & = ijk = -1 \\
ij & = k \\
ji & = -k \\
jk & = i \\
kj & = -i \\
ki & = j \\
ik & = -j \\
\end{align*}
$$

## 乘法

$$
q1q2=
\begin{pmatrix}
a & -b & -c & -d \\
b &  a & -d &  c \\
c &  d &  a & -b \\
d & -c &  b &  a
\end{pmatrix}
*
\begin{pmatrix}
e \\
f \\
g \\
h \\
\end{pmatrix}
$$

$$
q2q1=
\begin{pmatrix}
a & -b & -c & -d \\
b &  a &  d & -c \\
c & -d &  a &  b \\
d &  c & -b &  a
\end{pmatrix}
*
\begin{pmatrix}
e \\
f \\
g \\
h \\
\end{pmatrix}
$$

如果用 u 和 v 分别表示 q1 和 q2 的虚部的向量形式

```math
u=\begin{bmatrix}
b\\
c\\
d
\end{bmatrix}
~~~~~
v=\begin{bmatrix}
f\\
g\\
h
\end{bmatrix}
```

则可以简化为

$$
q_1 q_2 = [ae- u\cdot v,  av + eu+u\times v]
$$

> 其实按照历史的顺序来说叉乘是在这里被定义的

### 纯四元数

实部为 0 的就叫纯四元数
如果 u v 都是纯四元数，则很容易得到

$$
uv=[-{u}{v},{u}\times {v}]
$$

如果 u v 还正交，那么

$$
uv={u}\times {v}
$$

## 逆（inverse）和共轭（conjugate）

逆的定义

$$
qq^{-1}=q^{-1}q=1
$$

共轭的定义

$$
q=a+bi+cj+dk \\
q^{\ast} = a-bi-cj-dk
$$

$$
\begin{align}
qq^{\ast}&=[s,v] \cdot [s,-v] \\
&=[s^{2}+v\cdot v,0] \\
&=\begin{Vmatrix}q\end{Vmatrix}^{2}
\end{align}
$$

因此

$$
q^{-1}=\frac{q^{*}}{\begin{Vmatrix}q\end{Vmatrix}^{2}}
$$

如果

$$
\begin{Vmatrix}q\end{Vmatrix}^{2}=1
$$

那么

$$
q^{-1}=q^{\ast}
$$

## 四元数与 3D 旋转

这里讨论纯四元数的情况
将向量 v 沿着单位向量 u 定义的旋转轴旋转$\theta$度，可以将 v 拆分为正交于旋转轴的 ${v}_{\perp}$ 和平行于旋转轴的 ${v}_{\parallel}$，分别旋转后相加。

### ${v}_{\perp}$ 的旋转

${v}_{\perp}$ 与旋转轴垂直，因此是在一个平面内旋转，直接用平面内的旋转公式即可。一个坐标轴为 ${v}_{\perp}$ ，另一个可以用向量积得到， $u\times{v}_{\perp}$ 就是旋转平面内垂直于 ${v}_{\perp}$ 的另一个轴

$$
{v}_{\perp}^{{\prime}}=\cos (\theta){v}_{\perp}+\sin (\theta)(u\times v_{\perp})
$$

因为正交的纯四元数的乘积等于其向量积，因此

$$
\begin{align*}
{v}_{\perp}^{\prime}&=\cos (\theta){v}_{\perp}+\sin (\theta)(uv_{\perp}) \\
&= (\cos (\theta) + \sin (\theta)u){v}_{\perp}
\end{align*}
$$

如果我们将$\cos (\theta) + \sin (\theta)u$看作一个四元数$q$那么${v}_{\perp}$的旋可以表示为

$$
{v}_{\perp}^{{\prime}}=q{v}_{\perp}
$$

$q$是一个单位四元数，类比复数的乘法，它所代表的变换只有旋转没有缩放。

### ${v}_{\parallel}$ 的旋转

${v}_{\parallel}$与旋转轴平行，因此不会旋转

$$
{v}_{\parallel}^{\prime}={v}_{\parallel}
$$

### $v$ 的旋转

$$
\begin{align*}
v^{\prime}&={v}_{\parallel}^{\prime} + {v}_{\perp}^{\prime} \\
&={v}_{\parallel} + q{v}_{\perp}
\end{align*}
$$

进一步简化需要几个引理
如果 $q=[\cos(\theta),\sin(\theta)u]$ 且 $u$ 是单位向量，那么 $q^{2}=qq=[\cos(2\theta),\sin(2\theta)u]$
可以用四元数的乘积和三角恒等式证明，这个的几何意义更简单，连续两次旋转 $\theta$ 相当于一次旋转 $2\theta$
令 $p=[\cos(\frac{1}{2}\theta),\sin(\frac{1}{2}\theta)u]$ ，$p$ 也是单位四元数，因此 p 的共轭与逆相同

$$
\begin{align*}
v^{\prime}&=pp^{-1}{v}_{\parallel} + pp{v}_{\perp} \\
&=pp^{\ast}{v}_{\parallel} + pp{v}_{\perp}
\end{align*}
$$

## 三维向量形旋转公式

3D 空间中任意一个 $v$ 沿着单位向量 $u$ 旋转 $θ$ 角度之后的 ${v}^{\prime}$ 为：

$$
{v}^{\prime}= \cos(\theta)v+(1-\cos (\theta))(u\cdot v)u+\sin(\theta)(u\times v)
$$
