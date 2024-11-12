# gcc

gcc 的全称是 GNU Compiler Collection，它是一个能够编译多种语言的编译器。最开始 gcc 是作为 C 语言的编译器（GNU C Compiler），现在除了 c 语言，还支持 C++、java、Pascal 等语言。gcc 支持多种硬件平台。而 g++是 GNU 的 c++编译器。
[编译过程](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/848949fa0a0e4fd7b72961c0853b571a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
~~TODO:画一遍这个图~~

## g++

| 选项名             | 作用                                                                                                                               |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| -B ＜ directory ＞ | 将＜ director ＞添加到编译器的搜索路径                                                                                             |
| -v                 | 显示编译器调用的程序                                                                                                               |
| -E                 | 仅预处理；不要编译、汇编或链接                                                                                                     |
| -S                 | 仅编译；不要组装或连接                                                                                                             |
| -c                 | 编译和汇编，但不链接                                                                                                               |
| -o ＜ file ＞      | 将输出放入＜ file>。                                                                                                               |
| -shared            | 创建共享库                                                                                                                         |
| -x                 | 指定以下输入文件的语言。允许的语言包括：c++汇编程序无“none”表示恢复到默认行为 根据文件的扩展名猜测语言。                           |
| -fpic              | 生成位置无关代码（PIC，Position Independent Code）。位置无关代码意味着它可以在主内存中的任何地方执行，而无论其实际物理地址是什么。 |

安装 g++

```bash
apt install build-essential
```
