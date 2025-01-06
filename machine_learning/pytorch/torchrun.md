# torchrun

实际上调用的是 torch.distributed.launch

torchrun 是 PyTorch 提供的一个命令行工具，用于启动分布式训练作业。它简化了分布式训练的启动过程，特别是在使用 PyTorch 的 torch.distributed 模块时。torchrun 命令主要做了以下几件事情：

1. 环境设置：
   torchrun 会自动设置必要的环境变量，如 MASTER_ADDR 和 MASTER_PORT，这些变量用于指定分布式训练的主节点地址和端口。
   它还会设置 WORLD_SIZE 和 RANK 等变量，这些变量用于标识当前进程在分布式训练中的角色和编号。
2. 进程管理：
   torchrun 会启动多个进程，每个进程对应一个 GPU 或 CPU 核心，用于并行训练。
   它会根据指定的参数（如 `--nproc-per-node`）来确定要启动的进程数量，并确保每个进程都能正确地初始化和运行。
3. 分布式初始化：
   torchrun 会调用 `torch.distributed.init_process_group` 函数来初始化分布式训练环境。
   它会根据指定的后端（如 nccl、gloo 等）来选择合适的通信库，并确保所有进程都能正确地连接到主节点。

一些常用的 options:

- --nnodes NNODES Number of nodes, or the range of nodes in form <minimum_nodes>:<maximum_nodes>.
- --nproc-per-node NPROC_PER_NODE, --nproc_per_node NPROC_PER_NODE
  Number of workers per node; supported values: [auto, cpu, gpu, int].
- --rdzv-backend RDZV_BACKEND, --rdzv_backend RDZV_BACKEND
  Rendezvous backend.
  > 默认是 c10d
- --rdzv-endpoint RDZV_ENDPOINT, --rdzv_endpoint RDZV_ENDPOINT
  Rendezvous backend endpoint; usually in form <host>:<port>.
- --standalone Start a local standalone rendezvous backend that is represented by a C10d TCP store on a free port. Useful when launching single-node, multi-worker job. If specified
- --node-rank NODE_RANK, --node_rank NODE_RANK
  Rank of the node for multi-node distributed training.
- --master-addr MASTER_ADDR, --master_addr MASTER_ADDR
  Address of the master node (rank 0) that only used for static rendezvous. It should be either the IP address or the hostname of rank 0. For single node multi-proc training the --master-
  addr can simply be 127.0.0.1; IPv6 should have the pattern `[0:0:0:0:0:0:0:1]`.
- --master-port MASTER_PORT, --master_port MASTER_PORT
  Port on the master node (rank 0) to be used for communication during distributed training. It is only used for static rendezvous.
- --local-addr LOCAL_ADDR, --local_addr LOCAL_ADDR
  Address of the local node. If specified, will use the given address for connection. Else, will look up the local node address instead. Else, it will be default to local machine's FQDN.
