# camera transformation

也称之为 view transformation，目的是将世界坐标转化为相机坐标。也就是相机在原点，以 y 轴为向上的方向，看向 -z 轴的方向。

假设：

- **摄像机位置 (Eye Position):** $\mathbf{e} = \begin{pmatrix} e_x \\ e_y \\ e_z \end{pmatrix}$
- **观察方向 (Look Direction):** $\mathbf{g} = \begin{pmatrix} g_x \\ g_y \\ g_z \end{pmatrix}$ (已知是单位向量)
- **向上向量 (Up Vector):** $\mathbf{t} = \begin{pmatrix} t_x \\ t_y \\ t_z \end{pmatrix}$ (已知是单位向量，且 $\mathbf{g} \cdot \mathbf{t} = 0$)

### 深入理解摄像机变换矩阵的构建

将世界坐标系中的摄像机（它在世界中的位置是 $\mathbf{e}$，方向是 $\mathbf{g}$，向上是 $\mathbf{t}$）**“移动”到世界原点，并使其朝向标准方向**（通常是负 Z 轴，向上是 Y 轴）。

要做到这一点，我们需要对**整个世界**（包括其中的物体）执行与摄像机自身在世界坐标系中相反的变换。

1.  **第一步：将世界原点平移到摄像机的位置。**
    如果摄像机在世界坐标系中的位置是 $\mathbf{e}$，那么为了把摄像机移到原点，我们需要将世界坐标系中的所有点都平移 $-\mathbf{e}$。
    这个平移矩阵是 $T_{world \to cam\_pos}$

    $$
    \mathbf{T}_{world \to cam\_pos} = \begin{pmatrix}
    1 & 0 & 0 & -e_x \\
    0 & 1 & 0 & -e_y \\
    0 & 0 & 1 & -e_z \\
    0 & 0 & 0 & 1
    \end{pmatrix}
    $$

    应用这个平移后，摄像机本身就位于世界原点了。

2.  **第二步：旋转整个世界，使摄像机的方向与标准方向对齐。**
    在平移之后，摄像机在原点，但它的朝向可能仍然是世界坐标系中的 $(\mathbf{g}, \mathbf{t})$。我们需要旋转整个坐标系，使得摄像机的新 Z 轴与世界坐标系的负 Z 轴对齐，新 Y 轴与世界坐标系的正 Y 轴对齐，新 X 轴与世界坐标系的正 X 轴对齐。

    回顾我们计算出的摄像机坐标系的三个正交单位基向量：

    - $\mathbf{x}_{cam}$ (摄像机 X 轴，对应世界坐标系中的 $(\mathbf{g} \times \mathbf{t})$，需要将世界坐标系的$(\mathbf{g} \times \mathbf{t})$变换到 X 轴)
    - $\mathbf{y}_{cam}$ (摄像机 Y 轴，对应世界坐标系中的 $\mathbf{t}$，需要将世界坐标系中的 $\mathbf{t}$变换到 Y 轴)
    - $\mathbf{z}_{cam}$ (摄像机 Z 轴，对应世界坐标系中的 $(-\mathbf{g})$，需要将世界坐标系中的 $(-\mathbf{g})$变换到 Z 轴)

    一个将世界坐标轴旋转到与摄像机坐标轴对齐的**旋转矩阵 $\mathbf{R}_{world \to cam\_rot}$**，其行是由摄像机坐标系的基向量组成的（因为我们是在将世界坐标系的基向量映射到摄像机坐标系的基向量，这与将摄像机坐标系的基向量映射到世界坐标系基向量的矩阵是转置关系）：

    直接想象有点抽象，可以先反过来。如本来是要将世界坐标系的$\mathbf{x}_{cam}$变换到相机坐标系的 X 轴，先在先考虑如何将相机坐标系的 X 轴变换到世界坐标系的 $\mathbf{x}_{cam}$

    $$
    \mathbf{R}_{cam\_rot \to world } = \begin{pmatrix}
    \mathbf{x}_{cam.x} & \mathbf{y}_{cam.x} & \mathbf{z}_{cam.x} & 0 \\
    \mathbf{x}_{cam.y} & \mathbf{y}_{cam.y} & \mathbf{z}_{cam.y} & 0 \\
    \mathbf{x}_{cam.z} & \mathbf{y}_{cam.z} & \mathbf{z}_{cam.z} & 0 \\
    0 & 0 & 0 & 1
    \end{pmatrix}
    $$

    很容易验证

    $$
    \mathbf{R}_{cam\_rot \to world }\begin{pmatrix} 1 \\ 0 \\ 0 \\ 0\end{pmatrix}=\begin{pmatrix} \mathbf{x}_{cam.x} \\ \mathbf{x}_{cam.y} \\ \mathbf{x}_{cam.z} \\ 0\end{pmatrix}
    $$

    接下来求 $\mathbf{R}_{cam\_rot \to world }$ 的逆矩阵即可，因为这是一个正交矩阵，而正交矩阵的逆就是其转置，因此

    $$
    \mathbf{R}_{world \to cam\_rot} = \begin{pmatrix}
    \mathbf{x}_{cam.x} & \mathbf{x}_{cam.y} & \mathbf{x}_{cam.z} & 0 \\
    \mathbf{y}_{cam.x} & \mathbf{y}_{cam.y} & \mathbf{y}_{cam.z} & 0 \\
    \mathbf{z}_{cam.x} & \mathbf{z}_{cam.y} & \mathbf{z}_{cam.z} & 0 \\
    0 & 0 & 0 & 1
    \end{pmatrix}
    $$

### 组合变换矩阵

由于几何变换在矩阵乘法中是**从右到左**应用的，所以我们应该**先平移，再旋转**。

所以，最终的视图矩阵 $\mathbf{M}_{view}$ 应该是：
$$\mathbf{M}_{view} = \mathbf{R}_{world \to cam\_rot} \cdot \mathbf{T}_{world \to cam\_pos}$$

将它们相乘：

$$
\mathbf{M}_{view} = \begin{pmatrix}
\mathbf{x}_{cam.x} & \mathbf{x}_{cam.y} & \mathbf{x}_{cam.z} & 0 \\
\mathbf{y}_{cam.x} & \mathbf{y}_{cam.y} & \mathbf{y}_{cam.z} & 0 \\
\mathbf{z}_{cam.x} & \mathbf{z}_{cam.y} & \mathbf{z}_{cam.z} & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}
\begin{pmatrix}
1 & 0 & 0 & -e_x \\
0 & 1 & 0 & -e_y \\
0 & 0 & 1 & -e_z \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

执行矩阵乘法：

$$
\mathbf{M}_{view} = \begin{pmatrix}
\mathbf{x}_{cam.x} \cdot 1 + \mathbf{x}_{cam.y} \cdot 0 + \mathbf{x}_{cam.z} \cdot 0 + 0 \cdot 0 & \mathbf{x}_{cam.x} \cdot 0 + \mathbf{x}_{cam.y} \cdot 1 + \mathbf{x}_{cam.z} \cdot 0 + 0 \cdot 0 & \mathbf{x}_{cam.x} \cdot 0 + \mathbf{x}_{cam.y} \cdot 0 + \mathbf{x}_{cam.z} \cdot 1 + 0 \cdot 0 & \mathbf{x}_{cam.x}(-e_x) + \mathbf{x}_{cam.y}(-e_y) + \mathbf{x}_{cam.z}(-e_z) + 0 \cdot 1 \\
\mathbf{y}_{cam.x} & \mathbf{y}_{cam.y} & \mathbf{y}_{cam.z} & -\mathbf{y}_{cam} \cdot \mathbf{e} \\
\mathbf{z}_{cam.x} & \mathbf{z}_{cam.y} & \mathbf{z}_{cam.z} & -\mathbf{z}_{cam} \cdot \mathbf{e} \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

简化后，这正是前面给出的公式：

$$
\mathbf{M}_{view} = \begin{pmatrix}
\mathbf{x}_{cam.x} & \mathbf{x}_{cam.y} & \mathbf{x}_{cam.z} & -\mathbf{x}_{cam} \cdot \mathbf{e} \\
\mathbf{y}_{cam.x} & \mathbf{y}_{cam.y} & \mathbf{y}_{cam.z} & -\mathbf{y}_{cam} \cdot \mathbf{e} \\
\mathbf{z}_{cam.x} & \mathbf{z}_{cam.y} & \mathbf{z}_{cam.z} & -\mathbf{z}_{cam} \cdot \mathbf{e} \\
0 & 0 & 0 & 1
\end{pmatrix}
$$
