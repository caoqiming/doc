# 齐次坐标系（Homogeneous Coordinates）

齐次（均一）坐标系是计算机图形学中一个非常强大的工具，它通过增加一个维度，巧妙地将平移、旋转、缩放等复杂的几何变换统一成了简单的矩阵乘法。

> 因为如果不加一个维度就没办法表示平移

## 如何表示点和向量

### 1. 表示点

对于 $N$ 维空间中的一个点 $P(x_1, x_2, \dots, x_N)$，在均一坐标系中，它表示为一个 $N+1$ 维的列向量：

$$P_{homogeneous} = \begin{pmatrix} x_1 \\ x_2 \\ \vdots \\ x_N \\ w \end{pmatrix}$$

其中 $w$ 是均一化因子，**对于点来说，$w$ 通常取非零值，最常用的是 $w=1$**。

- 如果 $w=1$，则点 $P(x_1, x_2, \dots, x_N)$ 表示为 $\begin{pmatrix} x_1 & x_2 & \dots & x_N & 1 \end{pmatrix}^T$。
- 如果 $w \ne 1$，那么这个均一坐标代表的实际点是 $\left( \frac{x_1}{w}, \frac{x_2}{w}, \dots, \frac{x_N}{w} \right)$。这说明在均一坐标系中，所有形如 $(kx, ky, kw)$ 的向量都代表同一个点 $(x, y, w)$，只要 $k \ne 0$。

**示例：**

- 在二维平面中，点 $(x, y)$ 表示为 $\begin{pmatrix} x \\ y \\ 1 \end{pmatrix}$。
- 在三维空间中，点 $(x, y, z)$ 表示为 $\begin{pmatrix} x \\ y \\ z \\ 1 \end{pmatrix}$。

### 2. 表示向量

对于 $N$ 维空间中的一个向量 $\mathbf{v} = (v_1, v_2, \dots, v_N)$，在均一坐标系中，它表示为一个 $N+1$ 维的列向量：

$$\mathbf{v}_{homogeneous} = \begin{pmatrix} v_1 \\ v_2 \\ \vdots \\ v_N \\ 0 \end{pmatrix}$$

**对于向量来说，均一化因子 $w$ 总是为 0。** 这是区分点和向量的关键。

- 为什么 $w=0$？因为向量具有方向和大小，但不具有位置。当 $w=0$ 时，经过平移矩阵变换后，向量的平移分量会是 0，从而确保向量只受旋转和缩放影响，而不受平移影响，这符合向量的几何特性。

**示例：**

- 在二维平面中，向量 $(v_x, v_y)$ 表示为 $\begin{pmatrix} v_x \\ v_y \\ 0 \end{pmatrix}$。
- 在三维空间中，向量 $(v_x, v_y, v_z)$ 表示为 $\begin{pmatrix} v_x \\ v_y \\ v_z \\ 0 \end{pmatrix}$。

## 几个常用性质及其公式

均一坐标系最重要的性质就是它能将各种几何变换统一表示为矩阵乘法。

### 统一的变换矩阵

对于 $N$ 维空间中的变换，我们需要一个 $(N+1) \times (N+1)$ 的变换矩阵 $\mathbf{T}$。

$$\mathbf{p}' = \mathbf{T} \mathbf{p}$$

### 平移 (Translation)

在笛卡尔坐标系中，平移是简单的加法运算。在均一坐标系中，平移可以表示为矩阵乘法。

- **2D 平移矩阵:** 将点 $(x, y)$ 平移 $(t_x, t_y)$。

  $$
  \mathbf{T}_{2D}(t_x, t_y) = \begin{pmatrix}
  1 & 0 & t_x \\
  0 & 1 & t_y \\
  0 & 0 & 1
  \end{pmatrix}
  $$

  应用：

  $$
  \begin{pmatrix} x' \\ y' \\ 1 \end{pmatrix} = \begin{pmatrix} 1 & 0 & t_x \\ 0 & 1 & t_y \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} x \\ y \\ 1 \end{pmatrix} = \begin{pmatrix} x + t_x \\ y + t_y \\ 1 \end{pmatrix}
  $$

- **3D 平移矩阵:** 将点 $(x, y, z)$ 平移 $(t_x, t_y, t_z)$。
  $$
  \mathbf{T}_{3D}(t_x, t_y, t_z) = \begin{pmatrix}
  1 & 0 & 0 & t_x \\
  0 & 1 & 0 & t_y \\
  0 & 0 & 1 & t_z \\
  0 & 0 & 0 & 1
  \end{pmatrix}
  $$
  应用：
  $$
  \begin{pmatrix} x' \\ y' \\ z' \\ 1 \end{pmatrix} = \begin{pmatrix} 1 & 0 & 0 & t_x \\ 0 & 1 & 0 & t_y \\ 0 & 0 & 1 & t_z \\ 0 & 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} x \\ y \\ z \\ 1 \end{pmatrix} = \begin{pmatrix} x + t_x \\ y + t_y \\ z + t_z \\ 1 \end{pmatrix}
  $$
  **注意：** 向量 ($w=0$) 经过平移矩阵作用后，$w$ 仍然为 0，且其坐标值不变，这正是我们期望的。

### 缩放 (Scaling)

- **2D 缩放矩阵:** 沿 X 轴缩放 $s_x$，沿 Y 轴缩放 $s_y$。

  $$
  \mathbf{S}_{2D}(s_x, s_y) = \begin{pmatrix}
  s_x & 0 & 0 \\
  0 & s_y & 0 \\
  0 & 0 & 1
  \end{pmatrix}
  $$

- **3D 缩放矩阵:** 沿 X, Y, Z 轴分别缩放 $s_x, s_y, s_z$。
  $$
  \mathbf{S}_{3D}(s_x, s_y, s_z) = \begin{pmatrix}
  s_x & 0 & 0 & 0 \\
  0 & s_y & 0 & 0 \\
  0 & 0 & s_z & 0 \\
  0 & 0 & 0 & 1
  \end{pmatrix}
  $$
  应用：点和向量都会被缩放。

### 旋转 (Rotation)

旋转矩阵与笛卡尔坐标系中的形式类似，只是在均一坐标系中扩展到了 $N+1$ 维，并在右下角增加了一个 1 和其他 0。

- **2D 旋转矩阵 (绕原点逆时针 $\theta$):**

  $$
  \mathbf{R}_{2D}(\theta) = \begin{pmatrix}
  \cos\theta & -\sin\theta & 0 \\
  \sin\theta & \cos\theta & 0 \\
  0 & 0 & 1
  \end{pmatrix}
  $$

- **3D 绕 Z 轴旋转矩阵 (逆时针 $\theta$):**
  $$
  \mathbf{R}_{z}(\theta) = \begin{pmatrix}
  \cos\theta & -\sin\theta & 0 & 0 \\
  \sin\theta & \cos\theta & 0 & 0 \\
  0 & 0 & 1 & 0 \\
  0 & 0 & 0 & 1
  \end{pmatrix}
  $$
  （绕 X 轴和 Y 轴的旋转矩阵也以类似方式扩展）

### 组合变换

均一坐标系最大的优势在于，可以**通过矩阵连乘来组合多个几何变换**。例如，先缩放，再旋转，最后平移，可以直接将三个变换矩阵相乘得到一个总的变换矩阵：

$$\mathbf{P}' = (\mathbf{T} \cdot \mathbf{R} \cdot \mathbf{S}) \mathbf{P}$$

其中，**矩阵乘法的顺序至关重要**，因为矩阵乘法不满足交换律。通常，变换顺序是从右到左（应用于点），或者从左到右（如果是将变换组合到世界变换矩阵）。
