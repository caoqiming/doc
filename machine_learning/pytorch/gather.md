# gather

torch.distributed.gather 函数用于将所有 rank 的某一个 tensor 收集到一个 rank 中，默认是收集到 rank0

示例代码

```python
import torch
import torch.distributed as dist
import os

local_rank = int(os.environ["LOCAL_RANK"])
# 初始化进程组
dist.init_process_group(backend='nccl')
rank=dist.get_rank()
world_size=dist.get_world_size()
device = torch.device("cuda", local_rank)
tensor = torch.ones(3, device=device) + rank

print(f"rank {rank} , local_rank {local_rank} ,workd size {world_size}, device {device}, tensor {tensor}")



if rank == 0:
    gather_list = [torch.zeros_like(tensor, device=device) for i in range(world_size)]
else:
    gather_list = None
dist.gather(tensor, gather_list, dst=0)
# Rank 0 gets gathered data.
gather_list

# 打印收集到的结果
if rank == 0:
    print(gather_list)
```

在 2 机 2 卡的环境下运行结果为

```
rank 1 , local_rank 1 ,workd size 4, device cuda:1, tensor tensor([2., 2., 2.], device='cuda:1')
rank 0 , local_rank 0 ,workd size 4, device cuda:0, tensor tensor([1., 1., 1.], device='cuda:0')
[tensor([1., 1., 1.], device='cuda:0'), tensor([2., 2., 2.], device='cuda:0'), tensor([3., 3., 3.], device='cuda:0'), tensor([4., 4., 4.], device='cuda:0')]
```
