# 线性代数

## 矩阵行列式

$$
\left| A \right| =
\begin{vmatrix}
a & b & c \\
d & e & f \\
g & h & i
\end{vmatrix}
= aei + bfg + cdh - ceg - bdi - afh
$$

对于更复杂的行列式可以用拉普拉斯展开

$$
det(A) = \sum_{j=1}^{n} (-1)^{i+j} a_{ij} {{det}}(M_{ij})
$$

> "det"在这里就是表示行列式的缩写，它是英文"determinant"的缩写

## 向量积

$$
c=a\times b
$$

c 的方向符合右手定则，c 的长度为

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
