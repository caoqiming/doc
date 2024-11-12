# capsh

安装命令

```bash
apt-get install libcap2-bin
```

查看 linux capabilities

```bash
capsh --print
```

- Current: 当前进程拥有的能力。这个列表显示了进程当前所具有的各项能力。
- Bounding set: 能力的边界集。这是进程在整个生命周期中可以拥有的最大能力集。如果某个能力不在这个集合中，即使进程能以其他方式获取该能力（例如通过可执行文件或提升权限操作），它也不能真正拥有该能力。
- Ambient set: 环境能力集。这个集决定了继承为子进程的能力。这些能力是用于非特权用户在执行 set-UID 程序时使用。它通常是空的（如你的输出中显示的），因为这个特性比较少用。
- Current IAB (Inheritable/Allowed/Bounding): 当前进程在继承性、允许性和边界性方面的能力强 / 弱矩阵。这里的
  !符号表示进程不拥有这些能力。这些前缀有以下对应关系：
  I (Inheritable): 可继承的能力。
  A (Allowed): 允许的能力。
  B (Bounding): 边界集的能力。
