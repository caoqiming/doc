# Maxwell's equations

麦克斯韦方程组是描述电场、磁场以及它们之间相互作用的四组偏微分方程。它们统一了电学、磁学和光学，构成了经典电磁理论的基石。

## 一、 四个方程

麦克斯韦方程组在不同介质和坐标系下有多种形式，这里我们主要介绍其微分形式在真空中的表达。

### 1. 高斯定律 (Gauss's Law for Electricity)

- **物理意义：** 这个方程表明，任何闭合曲面穿出的电场线总数（电通量）与该曲面内部所包含的净电荷成正比。简而言之，电荷是电场的源头，电场线起源于正电荷，终止于负电荷。

#### 微分形式

描述了电荷是如何产生电场的。

$$\nabla \cdot \mathbf{E} = \frac{\rho}{\epsilon_0}$$

**解释：**

- $\nabla \cdot \mathbf{E}$ 是电场 $\mathbf{E}$ 的散度。散度描述了向量场在某一点的“发散”程度。
- $\rho$ 是电荷密度，即单位体积内的电荷量。
- $\epsilon_0$ 是真空介电常数，一个物理常数。

#### 积分形式

描述了通过**任意闭合曲面**的电通量与该曲面内包含的总电荷之间的关系。

$$\oint_S \mathbf{E} \cdot d\mathbf{A} = \frac{Q_{enc}}{\epsilon_0}$$

**解释：**

- $\oint_S \mathbf{E} \cdot d\mathbf{A}$ 代表电场 $\mathbf{E}$ 通过闭合曲面 $S$ 的**电通量**。其中 $d\mathbf{A}$ 是曲面上的面积元向量，方向垂直于曲面且指向外。
- $Q_{enc}$ 是闭合曲面 $S$ 内所包围的**总电荷量**。
- $\epsilon_0$ 是真空介电常数。

### 2. 磁场高斯定律 (Gauss's Law for Magnetism)

- **物理意义：** 这个方程表明，磁场线是**闭合的**，它们没有起点也没有终点。这意味着**磁单极子是不存在的**。任何闭合曲面，穿入该曲面的磁场线数量总是等于穿出该曲面的磁场线数量，因此净磁通量为零。

#### 微分形式

$$\nabla \cdot \mathbf{B} = 0$$

**解释：**

- $\nabla \cdot \mathbf{B}$ 是磁场 $\mathbf{B}$ 的散度。

#### 积分形式

$$\oint_S \mathbf{B} \cdot d\mathbf{A} = 0$$

**解释：**

- $\oint_S \mathbf{B} \cdot d\mathbf{A}$ 代表磁场 $\mathbf{B}$ 通过闭合曲面 $S$ 的**磁通量**。

### 3. 法拉第电磁感应定律 (Faraday's Law of Induction)

- **物理意义：** 只要穿过一个回路的磁通量发生变化，就会在这个回路中产生一个感应电动势。

#### 微分形式

描述了变化的磁场如何产生电场。

$$\nabla \times \mathbf{E} = - \frac{\partial \mathbf{B}}{\partial t}$$

**解释：**

- $\nabla \times \mathbf{E}$ 是电场 $\mathbf{E}$ 的旋度。旋度描述了向量场在某一点的“旋转”或“环绕”程度。
- $\frac{\partial \mathbf{B}}{\partial t}$ 是磁场 $\mathbf{B}$ 对时间的变化率。

#### 积分形式

描述了**穿过任意开放曲面**的磁通量的变化率如何在该曲面的边界上产生感应电动势（环路积分的电场）。

$$\oint_C \mathbf{E} \cdot d\mathbf{l} = - \frac{d\Phi_B}{dt}$$

其中，磁通量 $\Phi_B = \int_S \mathbf{B} \cdot d\mathbf{A}$。

**解释：**

- $\oint_C \mathbf{E} \cdot d\mathbf{l}$ 代表电场 $\mathbf{E}$ 沿着闭合回路 $C$ 的**环路积分**，这等于该回路上的感应电动势。$d\mathbf{l}$ 是回路上的线元向量。
- $\frac{d\Phi_B}{dt}$ 是**穿过回路 $C$ 所围面积 $S$ 的磁通量 $\Phi_B$ 对时间的变化率**。
- 负号（楞次定律）表示感应电动势产生的电流方向总是**阻碍**引起磁通量变化的趋势。

### 4. 安培-麦克斯韦定律 (Ampère-Maxwell Law)

- **物理意义：** 这个方程是安培定律的扩展。它说明了磁场的来源有两个：**传导电流**（传统意义上的电流）和**变化的电场**（位移电流）。正是麦克斯韦引入的位移电流项，使得方程组能够描述电磁波的传播，从而将电、磁和光统一起来。

#### 微分形式

描述了电流和变化的电场如何产生磁场。

$$\nabla \times \mathbf{B} = \mu_0 \mathbf{J} + \mu_0 \epsilon_0 \frac{\partial \mathbf{E}}{\partial t}$$

**解释：**

- $\nabla \times \mathbf{B}$ 是磁场 $\mathbf{B}$ 的旋度。
- $\mathbf{J}$ 是电流密度，即单位面积通过的电荷量。
- $\mu_0$ 是真空磁导率，一个物理常数。
- $\mu_0 \epsilon_0 \frac{\partial \mathbf{E}}{\partial t}$ 这一项是麦克斯韦引入的“位移电流”项。

#### 积分形式

描述了磁场沿着**任意闭合回路**的环路积分（磁场环流）与该回路所围面积中穿过的**传导电流**和**位移电流**之和的关系。

$$\oint_C \mathbf{B} \cdot d\mathbf{l} = \mu_0 I_{enc} + \mu_0 \epsilon_0 \frac{d\Phi_E}{dt}$$

其中，电通量 $\Phi_E = \int_S \mathbf{E} \cdot d\mathbf{A}$。

**解释：**

- $\oint_C \mathbf{B} \cdot d\mathbf{l}$ 代表磁场 $\mathbf{B}$ 沿着闭合回路 $C$ 的**环路积分**（磁场环流）。
- $\mu_0$ 是真空磁导率。
- $I_{enc}$ 是通过回路 $C$ 所围面积 $S$ 的**传导电流**（由电荷流动产生）。
- $\mu_0 \epsilon_0 \frac{d\Phi_E}{dt}$ 是**位移电流项**。其中 $\frac{d\Phi_E}{dt}$ 是穿过回路 $C$ 所围面积 $S$ 的电通量 $\Phi_E$ 对时间的变化率。
