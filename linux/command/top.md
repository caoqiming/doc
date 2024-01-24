# top

## Columns and Fields of Top Command

- PID: It stands for Process Id or unique process Id of the task, which wraps periodically, never rebooting at zero.
- RUSER: It stands for the Real User Name of the task's owner.
- PPID: It stands for Parent Process Pid. It is the process ID of the parent of a task.
- UID: It is the effective user Id of the owner of the task.
- USER: It is the effective user name of the owner of the task.
- GROUP: It is the effective group name of the owner of the task.
- TTY: It is the controlling terminal name.
- PR: It shows the task's priority.
- NI: It is the task's nice value. A negative NI defines higher priority, and a positive NI defines lower priority.
- P: A number indicating the last utilized processor.
- TIME: It shows the CPU time that the task has utilized since it began.

## output

### line1

- time
- how long system is running
- how many users are logged in
- load average
  > In Linux, the load average numbers are known as the sum of the total processes waiting inside the run-queue plus the total count executing currently. The number is not relative but absolute.
  > 把 CPU 想象成一座大桥，桥上只有一根车道，所有车辆都必须从这根车道上通过。系统负荷为 0，意味着大桥上一辆车也没有。系统负荷为 0.5，意味着大桥一半的路段有车。系统负荷为 1.0，意味着大桥的所有路段都有车，也就是说大桥已经"满"了。系统负荷为 1.7，意味着车辆太多了，大桥已经被占满了（100%），后面等着上桥的车辆为桥面车辆的 70%。
  > 这里有三个值，分别是 1 分钟、5 分钟、15 分钟内系统的平均负荷。因为是绝对值，所以要结合 cpu 核数来看

### line2

- Total number of tasks
- number of running tasks
- number of sleeping tasks
- number of stopped tasks
- number of zombie tasks

### line3

It shows CPU usage in percentage for

- users
- system
- low priority processes
- idle processes
- io wait
- hardware interrupts
- software interrupts
- steal time
  > CPU steal time, also known as stolen CPU, is the percentage of time a virtual CPU within a cloud server involuntarily waits on a physical CPU for its processing time.
  > 这个值越高，说明这台物理服务器的资源竞争越激烈。可能是超卖引起的。

### line4

It shows memory usage for

- total memory
- used memory
- free memory
- buffered memory

> - buffers
>   Memory used by kernel buffers (Buffers in `/proc/meminfo`)
>   Buffer memory is a temporary storage area in the main memory (RAM) that stores data transferring between two or more devices or between an application and a device.
> - cache
>   Memory used by the page cache and slabs (Cached and SReclaimable in `/proc/meminfo`)
>   Caching is the process of temporarily storing a copy of a given resource so that subsequent requests to the same resource are processed faster.
> - buff/cache
>   Sum of buffers and cache

### line5

It shows swap memory usage for

> Swap 内存，即交换区内存，也叫虚拟内存。它的本质是物理磁盘拿出来一部分伪装成内存的区域。

- total memory
- used memory
- free memory
- cached memory
  > Cache refers to data that has been read -- it is kept around in case it needs to be read again, but can be immediately reclaimed since it can always be re-read from disk.

> - available
>   Estimation of how much memory is available for starting new applications, without swapping. Unlike the data provided by the cache or free fields, this field takes into account page cache and also that not all reclaimable memory slabs will be reclaimed due to items being in use.

### Table explanation

- proces ID
- user
- priority
- nice user
- virtual memory
- resident memory
- shareable memory
- CPU used percentage
- memory used percentage
- time a process has run
- command

> In modern Linux-based operating systems, each running process is allocated a virtual address space. This gives the process access to a big chunk of memory that may or may not be stored on the physical RAM on our computer.
>
> - resident memory
>   This is a measure of how much memory a process is consuming in our physical RAM, to load all of its pages after its execution.
> - virtual memory
>   This is a measure of much memory a process can access after its execution, includes swapped memory, the memory from external libraries, and allocated memory that’s not used.
> - shared memory
>   shared memory is memory that may be simultaneously accessed by multiple programs with an intent to provide communication among them or avoid redundant copies.
