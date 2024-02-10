# 四元数（quaternions）

```math
q = a + b\mathbf{i} + c\mathbf{j} + d\mathbf{k}
```

其中

```math
\begin{align*}
i^2 = j^2 = k^2 & = ijk = -1 \\
ij & = k \\
ji & = -k \\
jk & = i \\
kj & = -i \\
ki & = j \\
ik & = -j \\
\end{align*}
```

## 乘法

```math
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
```

```math
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
```

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

```math
q_1 q_2 = [ae- u\cdot v,  av + eu+u\times v]
```

> 其实按照历史的顺序来说叉乘是在这里被定义的

### 纯四元数

实部为 0 的就叫纯四元数
在这里用未加粗的$u$表示加粗的$\mathbf{u}$对应的纯四元数

```math
uv=[-\mathbf{u}\mathbf{v},\mathbf{u}\times \mathbf{v}]
```

## 逆（inverse）和共轭（conjugate）

逆的定义

```math
qq^{-1}=q^{-1}q=1
```

共轭的定义

```math
q=a+bi+cj+dk \\
q^{\ast} = a-bi-cj-dk
```

```math
\begin{align}
qq^{\ast}&=[s,v] \cdot [s,-v] \\
&=[s^{2}+v\cdot v,0] \\
&=\begin{Vmatrix}q\end{Vmatrix}^{2}
\end{align}
```

因此

```math
q^{-1}=\frac{q^{*}}{\begin{Vmatrix}q\end{Vmatrix}^{2}}
```

如果

```math
\begin{Vmatrix}q\end{Vmatrix}^{2}=1
```

那么

```math
q^{-1}=q^{\ast}
```

## 三维向量形旋转公式

3D 空间中任意一个 $v$ 沿着单位向量 $u$ 旋转 $θ$ 角度之后的 ${v}^{\prime}$ 为：

```math
{v}^{\prime}= \cos(\theta)v+(1-\cos (\theta))(u\cdot v)u+\sin(\theta)(u\times v)
```
