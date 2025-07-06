# 罗德里格旋转公式（Rodrigues' Rotation Formula）

假设我们有一个三维向量 $\mathbf{v}$，要将其绕着一个过原点的**单位向量** $\mathbf{k}$（即旋转轴）逆时针旋转角度 $\theta$。旋转后的新向量记为 $\mathbf{v}'$。

罗德里格旋转公式为：

$$\mathbf{v}' = \mathbf{v}\cos\theta + (\mathbf{k} \times \mathbf{v})\sin\theta + \mathbf{k}(\mathbf{k} \cdot \mathbf{v})(1 - \cos\theta)$$

其中：

- $\mathbf{v}$ 是原始向量。
- $\mathbf{k}$ 是**单位旋转轴向量**（务必是单位向量，即 $|\mathbf{k}|=1$）。
- $\theta$ 是旋转角度（以弧度表示，遵循右手定则：如果你的右手拇指指向 $\mathbf{k}$ 的方向，那么你四指弯曲的方向就是正旋转方向）。
- $\cdot$ 表示向量点积。
- $\times$ 表示向量叉积。

## 公式解释

罗德里格公式的直观理解是，它将原始向量 $\mathbf{v}$ 分解为两个正交分量：**平行于旋转轴的分量**和**垂直于旋转轴的分量**，然后只旋转垂直分量，最后将旋转后的垂直分量与未变动的平行分量重新组合。

将 $\mathbf{v}$ 分解为 $\mathbf{v}_{\|} + \mathbf{v}_{\perp}$，其中 $\mathbf{v}_{\|} = \mathbf{k}(\mathbf{k} \cdot \mathbf{v})$ 是平行分量，$\mathbf{v}_{\perp} = \mathbf{v} - \mathbf{k}(\mathbf{k} \cdot \mathbf{v})$ 是垂直分量。旋转只作用于 $\mathbf{v}_{\perp}$。

- $\mathbf{v}_{\|}' = \mathbf{v}_{\|} = \mathbf{k}(\mathbf{k} \cdot \mathbf{v})$
- $\mathbf{v}_{\perp}' = \mathbf{v}_{\perp}\cos\theta + (\mathbf{k} \times \mathbf{v}_{\perp})\sin\theta$
  将 $\mathbf{v}_{\perp}$ 代入并简化，就可以得到最终的罗德里格公式。

## 矩阵表示

现在，我们可以把罗德里格公式的各项用矩阵乘法来表示：

1.  $\mathbf{v}\cos\theta = (\mathbf{I}\cos\theta)\mathbf{v}$，其中 $\mathbf{I}$ 是 $3 \times 3$ 单位矩阵。
2.  $(\mathbf{k} \times \mathbf{v})\sin\theta = (\lfloor \mathbf{k} \rfloor_{\times}\sin\theta)\mathbf{v}$
3.  $\mathbf{k}(\mathbf{k} \cdot \mathbf{v})(1 - \cos\theta) = (\mathbf{k}\mathbf{k}^T(1 - \cos\theta))\mathbf{v}$

将这三项合并，我们得到旋转后的向量 $\mathbf{v}'$：
$$\mathbf{v}' = \left[ \mathbf{I}\cos\theta + \lfloor \mathbf{k} \rfloor_{\times}\sin\theta + \mathbf{k}\mathbf{k}^T(1 - \cos\theta) \right] \mathbf{v}$$

因此，罗德里格旋转公式对应的旋转矩阵 $\mathbf{R}(\mathbf{k}, \theta)$ 为：

$$\mathbf{R}(\mathbf{k}, \theta) = \mathbf{I}\cos\theta + \lfloor \mathbf{k} \rfloor_{\times}\sin\theta + \mathbf{k}\mathbf{k}^T(1 - \cos\theta)$$

最终的**罗德里格旋转矩阵**：

$$
\mathbf{R}(\mathbf{k}, \theta) = \begin{pmatrix}
\cos\theta + k_x^2(1-\cos\theta) & k_x k_y(1-\cos\theta) - k_z\sin\theta & k_x k_z(1-\cos\theta) + k_y\sin\theta \\
k_y k_x(1-\cos\theta) + k_z\sin\theta & \cos\theta + k_y^2(1-\cos\theta) & k_y k_z(1-\cos\theta) - k_x\sin\theta \\
k_z k_x(1-\cos\theta) - k_y\sin\theta & k_z k_y(1-\cos\theta) + k_x\sin\theta & \cos\theta + k_z^2(1-\cos\theta)
\end{pmatrix}
$$
