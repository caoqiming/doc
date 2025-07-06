# 透视投影（Perspective Projection）

于正交投影相对的是透视投影，它模拟了人眼观察世界的方式。物体越远看起来越小，从而产生深度感。

## 透视投影变换矩阵

透视投影变换矩阵 $\mathbf{M}_{persp}$ 是一个 $4 \times 4$ 的齐次坐标矩阵，它将摄像机坐标系（也称观察空间）中的三维点 $\mathbf{p}_{camera} = (x, y, z, 1)^T$ 映射到一个裁剪空间（Clip Space）中的点 $\mathbf{p}_{clip} = (x_c, y_c, z_c, w_c)^T$。

这个矩阵的目的是将一个由近裁剪面（Near Plane）、远裁剪面（Far Plane）以及水平和垂直视角定义的**视锥体（Frustum）** 变换为一个规范化的立方体（通常称为规范化设备坐标，NDC）。

### 标准透视投影矩阵

最常见的透视投影矩阵的定义方式之一（例如在 OpenGL 中常用）是基于视锥体的参数：

- **`fovy` (Field of View Y):** 垂直方向的视野角度。
- **`aspect` (Aspect Ratio):** 视口的宽高比，通常是 `width / height`。
- **`near` (Near Plane):** 近裁剪面的距离（正值，表示到摄像机的距离）。
- **`far` (Far Plane):** 远裁剪面的距离（正值，表示到摄像机的距离）。

基于这些参数，透视投影矩阵 $\mathbf{M}_{persp}$ 通常表示为：

$$
\mathbf{M}_{persp} = \begin{pmatrix}
\frac{1}{\text{aspect} \cdot \tan(\text{fovy}/2)} & 0 & 0 & 0 \\
0 & \frac{1}{\tan(\text{fovy}/2)} & 0 & 0 \\
0 & 0 & -\frac{\text{far} + \text{near}}{\text{far} - \text{near}} & -\frac{2 \cdot \text{far} \cdot \text{near}}{\text{far} - \text{near}} \\
0 & 0 & -1 & 0
\end{pmatrix}
$$

或者，通过预计算一些中间变量可以简化表示：

令 $f = \cot(\text{fovy}/2)$（也即 $f = \frac{1}{\tan(\text{fovy}/2)}$），那么矩阵变为：

$$
\mathbf{M}_{persp} = \begin{pmatrix}
f/\text{aspect} & 0 & 0 & 0 \\
0 & f & 0 & 0 \\
0 & 0 & -\frac{\text{far} + \text{near}}{\text{far} - \text{near}} & -\frac{2 \cdot \text{far} \cdot \text{near}}{\text{far} - \text{near}} \\
0 & 0 & -1 & 0
\end{pmatrix}
$$

**注意：** 不同的图形 API 和数学库可能在 Z 轴的映射范围上有所不同。上述矩阵通常将 Z 轴映射到 $[-1, 1]$ 范围（OpenGL 约定）。有些系统可能将其映射到 $[0, 1]$ 范围（如 DirectX 或 Vulkan），这时第三行的公式会有所不同。
另外这里的 near 和 far 是表示长度的正数，但从 -Z 的方向观察时，物体 z 坐标取值范围为 [-far,-near]

## 简单解释

透视投影矩阵的核心作用是实现以下几点：

1.  **透视畸变 (Perspective Distortion):** 它通过将 $z$ 坐标引入到齐次坐标的 $w$ 分量中，实现了“远小近大”的效果。在矩阵乘法后，得到的结果是 $\mathbf{p}_{clip} = (x_c, y_c, z_c, w_c)^T$。随后会进行**透视除法 (Perspective Divide)**，即将 $x_c, y_c, z_c$ 都除以 $w_c$。由于 $w_c$ 是由原始 $z$ 坐标决定的（在上面的矩阵中，$w_c = -z_{camera}$），因此，离摄像机越远的物体（$z_{camera}$ 的绝对值越大），其 $w_c$ 也越大，导致透视除法后 $x'$ 和 $y'$ 的值更小，从而产生缩小效果。

2.  **视锥体裁剪 (Frustum Culling):** 这个矩阵将所有位于视锥体内的点映射到一个规范化的立方体空间。在这个空间中，任何点的坐标如果超出 $[-1, 1]$ 的范围，就会被裁剪掉，这样就只会渲染摄像机实际“看得到”的物体部分。

3.  **深度线性化 (Z-buffering):** 矩阵的第三行（Z 轴映射部分）负责将摄像机空间中的 $z$ 坐标（深度信息）映射到规范化立方体的 Z 坐标。虽然映射后深度是非线性的，但它仍然保留了相对顺序，使得 Z-buffer（深度缓冲）能够正确判断哪些像素在前面。

**变换流程：**
一个三维点从世界到屏幕的完整变换流程通常是：
$\mathbf{p}_{screen} \leftarrow \text{Viewport Transform} \leftarrow \text{Perspective Divide} \leftarrow \mathbf{M}_{persp} \cdot (\mathbf{M}_{view} \cdot \mathbf{M}_{model} \cdot \mathbf{p}_{local})$

- $\mathbf{M}_{model}$: 模型变换矩阵（物体自身变换）
- $\mathbf{M}_{view}$: 视图变换矩阵（摄像机变换）
- $\mathbf{M}_{persp}$: 透视投影矩阵
- $\mathbf{p}_{local}$: 物体的局部坐标
