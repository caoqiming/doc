# pmap

## usage

`pmap` 是 Linux 系统下用于显示进程内存映射的工具，它能展示进程的内存使用情况，包括各个内存区域的地址范围、权限、大小等信息。

```text
768:   /root/miniconda3/bin/python /root/miniconda3/bin/torchrun  /root/code/run.py
Address           Kbytes     RSS   Dirty Mode  Mapping
0000000000400000     124     124       0 r---- python3.10
000000000041f000    2040    2040       0 r-x-- python3.10
000000000061d000    1032     588       0 r---- python3.10
0000000000720000       4       4       4 r---- python3.10
0000000000721000     200     200     200 rw--- python3.10
...
00007fc585f74000       4       4       0 r---- ld-2.31.so
00007fc585f75000     140     140       0 r-x-- ld-2.31.so
00007fc585f98000      32      32       0 r---- ld-2.31.so
00007fc585fa1000       4       4       4 r---- ld-2.31.so
00007fc585fa2000       4       4       4 rw--- ld-2.31.so
00007fc585fa3000       4       4       4 rw---   [ anon ]
00007ffc2dd7d000     136      92      92 rw---   [ stack ]
00007ffc2ddfa000      12       0       0 r----   [ anon ]
00007ffc2ddfd000       8       4       0 r-x--   [ anon ]
---------------- ------- ------- ------- 
total kB         3510996  345344  190928
```

第一行显示进程的 PID 和对应的可执行程序路径。

表头信息

- Address：内存区域的起始虚拟地址。
- Kbytes：该内存区域的大小，以 KB 为单位。
- RSS（Resident Set Size）：该内存区域当前驻留在物理内存中的大小，以 KB 为单位。
- Dirty：该内存区域中已被修改但还未写回磁盘的部分大小，以 KB 为单位。
- Mode：该内存区域的访问权限，常见的权限标志有：
    r：可读
    w：可写
    x：可执行
    -：无对应权限
    s：共享
    p：私有（写时复制）
- Mapping：该内存区域对应的文件映射，[ anon ] 表示匿名映射，通常用于堆、栈等。

## 原理

pmap 主要从 `/proc/[pid]/maps` 和 `/proc/[pid]/smaps` 文件获取进程内存映射信息：

- `/proc/[pid]/maps`：该文件记录了进程的内存映射信息，每行表示一个内存区域，包含该区域的起始地址、结束地址、访问权限、偏移量、设备号、inode 以及映射的文件路径等信息。
- `/proc/[pid]/smaps`：该文件是 `/proc/[pid]/maps` 的扩展，提供了更详细的内存映射信息，如每个内存区域的大小、驻留集大小（RSS）、脏页数量等。使用 `pmap -x` 或 `pmap -XX` 命令时，pmap 会读取此文件以获取更详细的内存使用信息。
