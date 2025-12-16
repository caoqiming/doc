# pdb

```bash
python -m pdb your_script.py
```

命令
n (next),n,单步跳过 (Step Over)，执行当前行，不进入函数内部。
s (step),s,单步进入 (Step Into)，执行当前行，会进入函数内部。
r (return),r,单步退出 (Step Out)，执行完当前函数并返回。
c (continue),c,继续，运行到下一个断点或程序结束。
p (print),p,打印变量的值，例如 p result。
q (quit),q,退出调试器，终止程序。
l (list),l,列出当前位置周围的代码。
b (breakpoint),b,设置断点，例如 b 15 (在第 15 行设置断点)。
