# 线性代数

## 矩阵行列式

行列式是一个只对方阵定义的标量值，记作 $\det(\mathbf{A})$ 或 $|\mathbf{A}|$。它提供了关于矩阵是否可逆、线性方程组是否有唯一解等重要信息。

**性质：**

- $\det(\mathbf{I}) = 1$
- $\det(\mathbf{A}^T) = \det(\mathbf{A})$
- $\det(\mathbf{AB}) = \det(\mathbf{A})\det(\mathbf{B})$
- $\det(c\mathbf{A}) = c^n \det(\mathbf{A})$ (对于 $n \times n$ 矩阵 $\mathbf{A}$ 和标量 $c$)
- 如果矩阵有两行（或两列）相同，则行列式为 0。
- 如果矩阵有一行（或一列）全为 0，则行列式为 0。
- $\mathbf{A}$ 可逆当且仅当 $\det(\mathbf{A}) \ne 0$。

**计算公式：**

- 对于 $2 \times 2$ 矩阵 $\mathbf{A} = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$：
  $$\det(\mathbf{A}) = ad - bc$$
- 对于 $3 \times 3$ 矩阵 $\mathbf{A} = \begin{pmatrix} a & b & c \\ d & e & f \\ g & h & i \end{pmatrix}$：
  $$\det(\mathbf{A}) = a(ei - fh) - b(di - fg) + c(dh - eg)$$
- 对于更复杂的行列式可以用拉普拉斯展开

$$
det(A) = \sum_{j=1}^{n} (-1)^{i+j} a_{ij} {{det}}(M_{ij})
$$

> "det"在这里就是表示行列式的缩写，它是英文"determinant"的缩写

## 点积

可以用矩阵表示，这里的 a 和 b 都是列向量
$$\mathbf{a} \cdot \mathbf{b} = \mathbf{a}^T \mathbf{b}$$

## 向量积

$$
c=a\times b
$$

c 的方向符合右手定则，c 的长度为

> 右手定则有两种判断方式，一是把三个手指互相垂直，右手中指$\times$大拇指=食指。一种是从 a 向着 b 旋转的方向握拳，大拇指指向的方向即为 c 的方向。

$$
\lvert c \rvert = \lvert a \rvert \lvert b \rvert \sin \theta
$$

其中$\theta$是 a 与 b 的夹角

$$
\mathbf{C} = \mathbf{A} \times \mathbf{B} =
\begin{vmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k} \\
a_1 & a_2 & a_3 \\
b_1 & b_2 & b_3 \\
\end{vmatrix}
$$

向量积也可以用矩阵的乘法来表示

$$
\mathbf{a} \times \mathbf{b} = \lfloor \mathbf{a} \rfloor_{\times} \mathbf{b} = \begin{pmatrix}
0 & -a_z & a_y \\
a_z & 0 & -a_x \\
-a_y & a_x & 0
\end{pmatrix} \begin{pmatrix} b_x \\ b_y \\ b_z \end{pmatrix}
$$

> 这个斜对称矩阵 (Skew-Symmetric Matrix)$\lfloor \mathbf{a}\rfloor $ 有时被称为向量 a 的对偶矩阵(Dual Matrix)，但这只是一种非标准的口头表达。“对偶矩阵”这个术语没有一个单一、普适的严格数学定义，它在不同的数学和应用领域可能有不同的含义。

### 矩阵的转置 (Transpose)

矩阵 $\mathbf{A}$ 的转置记为 $\mathbf{A}^T$ 或 $\mathbf{A}'$。如果 $\mathbf{A}$ 是一个 $m \times n$ 阶矩阵，那么 $\mathbf{A}^T$ 是一个 $n \times m$ 阶矩阵，其行和列互换。即，如果 $\mathbf{A} = (a_{ij})$，则 $\mathbf{A}^T = (a_{ji})$。

**性质：**

- $(\mathbf{A}^T)^T = \mathbf{A}$
- $(\mathbf{A} + \mathbf{B})^T = \mathbf{A}^T + \mathbf{B}^T$
- $(c\mathbf{A})^T = c\mathbf{A}^T$ (其中 $c$ 为标量)
- $(\mathbf{AB})^T = \mathbf{B}^T\mathbf{A}^T$

### 逆矩阵 (Inverse Matrix)

对于一个方阵 $\mathbf{A}$，如果存在一个同阶方阵 $\mathbf{A}^{-1}$，使得 $\mathbf{A}\mathbf{A}^{-1} = \mathbf{A}^{-1}\mathbf{A} = \mathbf{I}$，则称 $\mathbf{A}^{-1}$ 为 $\mathbf{A}$ 的逆矩阵。只有**非奇异矩阵**（即行列式不为零的矩阵）才存在逆矩阵。

**性质：**

- $(\mathbf{A}^{-1})^{-1} = \mathbf{A}$
- $(\mathbf{AB})^{-1} = \mathbf{B}^{-1}\mathbf{A}^{-1}$
- $(c\mathbf{A})^{-1} = \frac{1}{c}\mathbf{A}^{-1}$ (其中 $c \ne 0$)
- $(\mathbf{A}^T)^{-1} = (\mathbf{A}^{-1})^T$

**计算公式（2x2 矩阵为例）：**
对于矩阵 $\mathbf{A} = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$，其行列式 $\det(\mathbf{A}) = ad - bc$。
如果 $\det(\mathbf{A}) \ne 0$，则：
$$\mathbf{A}^{-1} = \frac{1}{\det(\mathbf{A})} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$$

### 矩阵的秩 (Rank of a Matrix)

矩阵 $\mathbf{A}$ 的秩通常记作 $\text{rank}(\mathbf{A})$ 或 $\text{rk}(\mathbf{A})$。它定义为矩阵中**线性无关的行向量（或列向量）的最大数目**。

**性质：**

- $0 \le \text{rank}(\mathbf{A}) \le \min(m, n)$ (对于 $m \times n$ 矩阵 $\mathbf{A}$)
- $\text{rank}(\mathbf{A}) = \text{rank}(\mathbf{A}^T)$
- 如果 $\mathbf{A}$ 是 $n \times n$ 方阵，则 $\mathbf{A}$ 可逆当且仅当 $\text{rank}(\mathbf{A}) = n$ (此时称 $\mathbf{A}$ 为**满秩矩阵**)。
- $\text{rank}(\mathbf{A}\mathbf{B}) \le \min(\text{rank}(\mathbf{A}), \text{rank}(\mathbf{B}))$

### 7. 对称矩阵 (Symmetric Matrix) 与 反对称矩阵 (Skew-Symmetric Matrix)

- **对称矩阵：** 如果一个方阵 $\mathbf{A}$ 满足 $\mathbf{A}^T = \mathbf{A}$，则称 $\mathbf{A}$ 为对称矩阵。即 $a_{ij} = a_{ji}$。
  例如：

  $$
  \begin{pmatrix}
  1 & 2 & 3 \\
  2 & 4 & 5 \\
  3 & 5 & 6
  \end{pmatrix}
  $$

- **反对称矩阵：** 如果一个方阵 $\mathbf{A}$ 满足 $\mathbf{A}^T = -\mathbf{A}$，则称 $\mathbf{A}$ 为反对称矩阵。即 $a_{ij} = -a_{ji}$，且对角线元素必须为 0。
  例如：
  $$
  \begin{pmatrix}
  0 & 2 & -3 \\
  -2 & 0 & 1 \\
  3 & -1 & 0
  \end{pmatrix}
  $$

### 正交矩阵 (Orthogonal Matrix)

如果一个方阵 $\mathbf{Q}$ 的转置等于它的逆，即 $\mathbf{Q}^T = \mathbf{Q}^{-1}$，则称 $\mathbf{Q}$ 为正交矩阵。这意味着 $\mathbf{Q}^T\mathbf{Q} = \mathbf{Q}\mathbf{Q}^T = \mathbf{I}$。

**性质：**

- 正交矩阵的列向量（或行向量）是标准正交基。
- 正交矩阵的行列式值为 $\pm 1$。
- 正交变换保持向量长度和角度不变（即保持欧几里得距离）。

### 矩阵的特征值与特征向量 (Eigenvalues and Eigenvectors)

对于一个 $n \times n$ 的方阵 $\mathbf{A}$，如果存在一个非零向量 $\mathbf{v}$ 和一个标量 $\lambda$，使得：
$$\mathbf{Av} = \lambda\mathbf{v}$$
则称 $\lambda$ 是矩阵 $\mathbf{A}$ 的**特征值 (Eigenvalue)**，而 $\mathbf{v}$ 是对应于特征值 $\lambda$ 的**特征向量 (Eigenvector)**。

**性质：**

- 特征值是满足特征方程 $\det(\mathbf{A} - \lambda\mathbf{I}) = 0$ 的 $\lambda$ 值。这是一个关于 $\lambda$ 的 $n$ 次多项式方程，称为**特征方程**或**特征多项式**。
- 特征值和特征向量在许多领域有重要应用，如主成分分析 (PCA)、量子力学、振动分析等。

### 矩阵的迹 (Trace)

方阵 $\mathbf{A}$ 的迹是其对角线元素的总和，记作 $\text{tr}(\mathbf{A})$。

**性质：**

- $\text{tr}(\mathbf{A} + \mathbf{B}) = \text{tr}(\mathbf{A}) + \text{tr}(\mathbf{B})$
- $\text{tr}(c\mathbf{A}) = c \cdot \text{tr}(\mathbf{A})$
- $\text{tr}(\mathbf{AB}) = \text{tr}(\mathbf{BA})$ (即使 $\mathbf{AB} \ne \mathbf{BA}$)
- 矩阵的迹等于其所有特征值的和。

### 旋转

#### 二维

假设我们有一个二维点 $P = (x, y)$，我们想让它绕原点 $(0,0)$ 逆时针旋转一个角度 $\theta$。旋转之后的新点是 $P' = (x', y')$。

我们可以将点 $P$ 表示为列向量 $\mathbf{p} = \begin{pmatrix} x \\ y \end{pmatrix}$。

**旋转矩阵 (Rotation Matrix):**

对于逆时针旋转 $\theta$ 角度，二维旋转矩阵 $\mathbf{R}_{2D}(\theta)$ 是：

$$
\mathbf{R}_{2D}(\theta) = \begin{pmatrix}
\cos\theta & -\sin\theta \\
\sin\theta & \cos\theta
\end{pmatrix}
$$

**计算新点位置的公式:**

新的点 $P'$ 的位置可以通过将原始点向量 $\mathbf{p}$ 与旋转矩阵 $\mathbf{R}_{2D}(\theta)$ 相乘来得到：
$$\mathbf{p}' = \mathbf{R}_{2D}(\theta) \mathbf{p}$$
展开来就是：

$$
\begin{pmatrix} x' \\ y' \end{pmatrix} = \begin{pmatrix}
\cos\theta & -\sin\theta \\
\sin\theta & \cos\theta
\end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix}
$$所以，具体的坐标计算公式为：$$
x' = x \cos\theta - y \sin\theta \\
y' = x \sin\theta + y \cos\theta
$$

#### 三维

在三维空间中，点绕原点旋转通常是绕着某一个坐标轴（X 轴、Y 轴或 Z 轴）进行的。假设点 $P = (x, y, z)$，我们希望得到旋转后的新点 $P' = (x', y', z')$。

同样，将点 $P$ 表示为列向量 $\mathbf{p} = \begin{pmatrix} x \\ y \\ z \end{pmatrix}$。

**绕 X 轴旋转 $\theta$ 角度（逆时针，从正 X 轴看向原点）:**

**旋转矩阵:**

$$
\mathbf{R}_x(\theta) = \begin{pmatrix}
1 & 0 & 0 \\
0 & \cos\theta & -\sin\theta \\
0 & \sin\theta & \cos\theta
\end{pmatrix}
$$

**计算新点位置的公式:**

$$
\mathbf{p}' = \mathbf{R}_x(\theta) \mathbf{p} \implies \begin{pmatrix} x' \\ y' \\ z' \end{pmatrix} = \begin{pmatrix}
1 & 0 & 0 \\
0 & \cos\theta & -\sin\theta \\
0 & \sin\theta & \cos\theta
\end{pmatrix} \begin{pmatrix} x \\ y \\ z \end{pmatrix}
$$具体坐标：$$
x' = x \\
y' = y \cos\theta - z \sin\theta \\
z' = y \sin\theta + z \cos\theta
$$

**绕 Y 轴旋转 $\theta$ 角度（逆时针，从正 Y 轴看向原点）:**

**旋转矩阵:**

$$
\mathbf{R}_y(\theta) = \begin{pmatrix}
\cos\theta & 0 & \sin\theta \\
0 & 1 & 0 \\
-\sin\theta & 0 & \cos\theta
\end{pmatrix}
$$

**绕 Z 轴旋转 $\theta$ 角度（逆时针，从正 Z 轴看向原点）:**

**旋转矩阵:**

$$
\mathbf{R}_z(\theta) = \begin{pmatrix}
\cos\theta & -\sin\theta & 0 \\
\sin\theta & \cos\theta & 0 \\
0 & 0 & 1
\end{pmatrix}
$$
