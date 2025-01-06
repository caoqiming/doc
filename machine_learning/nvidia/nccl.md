# nccl

The NVIDIA Collective Communications Library (NCCL, pronounced “Nickel”) is a library providing inter-GPU communication primitives that are topology-aware and can be easily integrated into applications.

NCCL provides the following collective communication primitives :

> Like MPI collective operations, NCCL collective operations have to be called for each rank (hence CUDA device) to form a complete collective operation. Failure to do so will result in other ranks waiting indefinitely.

- AllReduce
  The AllReduce operation is performing reductions on data (for example, sum, max) across devices and writing the result in the receive buffers of every rank.
- Broadcast
  The Broadcast operation copies an N-element buffer on the root rank to all ranks.
- Reduce
  The Reduce operation is performing the same operation as AllReduce, but writes the result only in the receive buffers of a specified root rank.
- AllGather
  In the AllGather operation, each of the K processors aggregates N values from every processor into an output of dimension K\*N. The output is ordered by rank index. Each rank receives the aggregation of data from all ranks in the order of the ranks.
- ReduceScatter
  The ReduceScatter operation performs the same operation as the Reduce operation, except the result is scattered in equal blocks among ranks, each rank getting a chunk of data based on its rank index.

Additionally, it allows for point-to-point send/receive communication which allows for scatter, gather, or all-to-all operations.
