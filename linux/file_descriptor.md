# 文件描述符

文件描述符（File descriptor）是计算机科学中的一个术语，是一个用于表述指向文件的引用的抽象化概念。

文件描述符在形式上是一个非负整数。实际上，它是一个索引值，指向内核为每一个进程所维护的该进程打开文件的记录表。当程序打开一个现有文件或者创建一个新文件时，内核向进程返回一个文件描述符。在程序设计中，一些涉及底层的程序编写往往会围绕着文件描述符展开。但是文件描述符这一概念往往只适用于 UNIX、Linux 这样的操作系统。

| 整数值 |      名称       | <unistd.h>符号常量 | <stdio.h>文件流 |
| :----: | :-------------: | :----------------: | :-------------: |
|   0    | Standard input  |    STDIN_FILENO    |      stdin      |
|   1    | Standard output |   STDOUT_FILENO    |     stdout      |
|   2    | Standard error  |   STDERR_FILENO    |     stderr      |

## 重定向

|       命令        |                 说明                 |
| :---------------: | :----------------------------------: |
| `command > file`  |         将输出重定向到 file          |
| `command < file`  |         将输入重定向到 file          |
| `command >> file` |   将输出以追加的方式重定向到 file    |
|    `n > file`     | 将文件描述符为 n 的文件重定向到 file |
|     `n >& m`      |        将输出文件 m 和 n 合并        |
|     `n <& m`      |        将输入文件 m 和 n 合并        |

一般情况下，每个 Unix/Linux 命令运行时都会打开三个文件，stdin，stdout，stderr。

- 如果希望 stderr 重定向到 file，可以这样写`command 2>file`。
- 如果希望将 stdout 和 stderr 合并后重定向到 file，可以这样写`command >file 2>&1`。这个命令首先将 stdout（文件描述符为 1）重定向到名为 "file" 的文件，然后将 stderr（文件描述符为 2）重定向到当前的 stdout（也就是 "file"）。
- 如果希望对 stdin 和 stdout 都重定向，stdin 重定向到 file1，将 stdout 重定向到 file2，可以这样写`command < file1 >file2`

> _这里的 2 和 > 之间不可以有空格，2> 是一体的时候才表示错误输出。_
