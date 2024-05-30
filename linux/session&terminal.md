# Session & Terminal

## 终端

从定义上来说终端是一个输入输出设备，可以简单理解成鼠标、键盘和显示器。

## 虚拟终端

平时我们打开的 Linux 命令行窗口也是一个终端，不过它是用软件的方式来模拟一个终端设备，一般被称为终端模拟器。

## session

session 是一组相关进程的集合，这些进程都是在单一的 terminal 中执行的。每个 terminal 都可以有一个或多个 session，并总是有一个 session 在前台运行，而其他 session 在后台。前台 session 可以进行输入和输出，而后台 session 不能直接与 terminal 交互。
