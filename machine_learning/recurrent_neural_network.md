# Recurrent Neural Network(RNN)

中文通常翻译为 “循环神经网络” 或 “递归神经网络”。

> 注意 RNN 也可能是 (Recursive Neural Network)：递归神经网络的缩写

RNN 就是会把某一层在上一次 forward 的输出，作为这一次的该层输入的一部分。如果说残差网络（ResNet）是空间上（跨层）的联系，那么 RNN 就是时间上（跨步骤）的联系。

由于标准的 RNN 存在“长程依赖”问题（即容易忘记很久以前的信息），现在的实际应用中，人们更常使用的是它的变体：

LSTM (Long Short-Term Memory) —— 长短期记忆网络。

GRU (Gated Recurrent Unit) —— 门控循环单元。
