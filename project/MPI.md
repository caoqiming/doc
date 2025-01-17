# Message Passing Interface (MPI)

The Message Passing Interface (MPI) is a standardized and portable message-passing standard designed to function on parallel computing architectures. The MPI standard defines the syntax and semantics of library routines that are useful to a wide range of users writing portable message-passing programs in C, C++, and Fortran. There are several open-source MPI implementations, which fostered the development of a parallel software industry, and encouraged development of portable and scalable large-scale parallel applications.

# Basic Concepts

## communicator

A communicator defines a group of processes that have the ability to communicate with one another. In this group of processes, each is assigned a unique **rank**, and they explicitly communicate with one another by their ranks.

## Point-to-point

A process may send a message to another process by providing the rank of the process and a unique tag to identify the message. A popular example is `MPI_Send`.

## Collective

There are many cases where processes may need to communicate with everyone else. For example, when a manager process needs to broadcast information to all of its worker processes. MPI can handle a wide variety of these types of collective communications that involve all processes. A typical function is the `MPI_Bcast` call (short for "broadcast"). This function takes data from one node and sends it to all processes in the process group. A reverse operation is the `MPI_Reduce` call, which takes data from all processes in a group, performs an operation (such as summing), and stores the results on one node. `MPI_Reduce` is often useful at the start or end of a large distributed calculation, where each processor operates on a part of the data and then combines it into a result. Other operations perform more sophisticated tasks, such as `MPI_Alltoall` which rearranges n items of data such that the nth node gets the nth item of data from each.

## usage

以 openmpi 为例，首先写一个 c 的程序，参考[知乎上的这篇教程](https://zhuanlan.zhihu.com/p/399150417)

```c
#include "mpi.h"
#include <stdio.h>
double f(double);
double f(double x)
{
    return (4.0/(1.0+x*x));
}
int main(int argc,char *argv[])
{
    int myid, numprocs;
    int n, i;
    double mypi, pi;
    double h, sum, x;
    MPI_Init(&argc,&argv);
    MPI_Comm_size(MPI_COMM_WORLD,&numprocs);
    MPI_Comm_rank(MPI_COMM_WORLD,&myid);
    printf("Process %d of %d.\n", myid, numprocs);
    n = 100;
    h = 1.0 / (double) n;
    sum = 0.0;
    for (i = myid + 1; i <= n; i += numprocs)
    {
        x = h * ((double)i - 0.5);
        sum +=f(x);
    }
    mypi = h * sum;
    MPI_Reduce(&mypi, &pi, 1, MPI_DOUBLE, MPI_SUM, 0, MPI_COMM_WORLD);
    if (myid == 0)
    {
        printf("The result is %.10f.\n",pi);
    }
    MPI_Finalize();
}
```

然后编译

```bash
mpicc -o pi.exe pi.c
```

如果单机运行直接

```bash
mpirun -np 8  pi.exe
```

-np 参数指定了运行的进程数量

如果是多机运行则需要准备一个 hostfile 类似于

```text
172.16.16.65 slots=1
172.16.24.88 slots=1
172.16.24.87 slots=1
172.16.16.66 slots=1
```

然后保证所有节点上都有上述编译出的程序，再执行

```bash
mpirun --hostfile $YOUR_HOST_FILE_PATH pi.exe
```
