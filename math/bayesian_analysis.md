# Bayesian Analysis

贝叶斯分析（Bayesian Analysis）的核心原理可以用一句话概括：利用新观察到的数据，来更新我们对某一事物原有认知的过程。

- 先验 (Prior, $P(\theta)$): 在看到新证据之前，你对这件事情的经验或相信程度。
- 似然性 (Likelihood, $P(D|\theta)$): 在假设你的认知是正确的前提下，观察到目前这组新数据的可能性。
- 后验 (Posterior, $P(\theta|D)$): 结合了“老经验”和“新证据”之后，你得到的最终结论。

$$
P(\theta|D) = \frac{P(D|\theta) \times P(\theta)}{P(D)}
$$

迭代进化： 贝叶斯是一个循环过程。今天的“后验”，就是明天的“先验”。 科学研究就是这样通过数据不断完善的。
