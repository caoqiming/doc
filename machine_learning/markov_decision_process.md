# Markov Decision Process

它之所以被称为“马尔可夫”过程，是因为它符合马尔可夫性质（Markov Property）：即“未来仅取决于当前状态，而与过去如何到达这个状态无关”（无后效性）。

MDP 动态规划（Dynamic Programming, DP）求解方法分为 value iteration 和 policy iteration

## value iteration

利用[贝尔曼最优方程](./bellman_equation.md) (Bellman Optimality Equation) 迭代更新 $V$

$$
V_{k+1}(s) = \max_{a} \sum_{s', r} p(s', r | s, a) [r + \gamma V_k(s')]
$$

当 $V$ 趋于稳定（收敛）后，再通过一次性提取，得到最终的最优策略。
以解迷宫为例，value iteration会在每一轮迭代中通过 BFS 遍历所有的状态（位置）。奖励从终点传递到其他各个状态，直到各个状态的价值达到稳定。再根据各个状态的价值最高的action生成决策（在哪个状态应该采用哪个action）。最终用决策生成迷宫解决的路径。

## policy iteration

它是一个“循环嵌套”的过程，包含两个子阶段：

初始化阶段为每个状态随机选择一个action，然后不断重复 1，2

1. 策略评估 (Policy Evaluation)： 根据当前策略，计算各个状态的价值。这里需要计算多轮，直到各个状态的价值充分传播，达到稳定。
2. 策略改进 (Policy Improvement)： 遍历状态的每个action， 选出价值最高的action，更新策略。只要策略不再发生变化，就说明找到了最优解。
