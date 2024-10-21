# Message Passing Interface (MPI)

The Message Passing Interface (MPI) is a standardized and portable message-passing standard designed to function on parallel computing architectures. The MPI standard defines the syntax and semantics of library routines that are useful to a wide range of users writing portable message-passing programs in C, C++, and Fortran. There are several open-source MPI implementations, which fostered the development of a parallel software industry, and encouraged development of portable and scalable large-scale parallel applications.

# Basic Concepts

## communicator

A communicator defines a group of processes that have the ability to communicate with one another. In this group of processes, each is assigned a unique **rank**, and they explicitly communicate with one another by their ranks.

## Point-to-point

A process may send a message to another process by providing the rank of the process and a unique tag to identify the message. A popular example is `MPI_Send`.

## Collective

There are many cases where processes may need to communicate with everyone else. For example, when a manager process needs to broadcast information to all of its worker processes. MPI can handle a wide variety of these types of collective communications that involve all processes. A typical function is the `MPI_Bcast` call (short for "broadcast"). This function takes data from one node and sends it to all processes in the process group. A reverse operation is the `MPI_Reduce` call, which takes data from all processes in a group, performs an operation (such as summing), and stores the results on one node. `MPI_Reduce` is often useful at the start or end of a large distributed calculation, where each processor operates on a part of the data and then combines it into a result. Other operations perform more sophisticated tasks, such as `MPI_Alltoall` which rearranges n items of data such that the nth node gets the nth item of data from each.
