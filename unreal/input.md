# input

使用增强输入

1. 在内容浏览器中右键，选择 input 选择 input action，这一步相当于创建一个事件
2. 接着在内容浏览器中创建 input action context，并在这个 context 中设置 1 中创建的时间对应的按键映射关系
3. 在 pawn 中的 envent beginplay 中，get player controller -> get enhanced input local player subsystem -> add mapping context 选择 2 中创建的映射关系上下文（看起来不同的地方哪怕使用了相同的事件，这些事件也可以由不同的按键触发，因为可以在这里设置不同的映射上下文）
4. 就可以在蓝图里使用 1 中创建的事件了
