# dataloader

## dataset

dataset 主要定义了数据集的位置，读取数据时对数据做的变换，对标签做的变换。
一般是在`__init__`时遍历输入的数据集所在的地址，建立一个 key 到每条数据所在地址的 map。然后实现`__getitem__`方法，根据输入的 key，读取数据并进行一些处理（一般是转化为 tensor，归一化等等）。

## dataloader

dataloader 根据 sampler 返回的随机索引从 dataset 中读取数据。

## example

### 多机训练导入数据

```python
import torch
from torch.utils.data import DataLoader
from torchvision import datasets, transforms
from torch.utils.data.distributed import DistributedSampler

import torch.distributed as dist
import torch.nn as nn
import torch.optim as optim
from torch.nn.parallel import DistributedDataParallel as DDP




# model
class ToyModel(nn.Module):
    def __init__(self):
        super(ToyModel, self).__init__()
        self.flatten = nn.Flatten()
        self.net1 = nn.Linear(500 * 500, 500)
        self.relu1 = nn.ReLU()
        self.net2 = nn.Linear(500, 1000)
        self.relu2 = nn.ReLU()
        self.net3 = nn.Linear(1000, 512)

    def forward(self, x):
        x = self.flatten(x)  # 展平输入
        x = self.relu1(self.net1(x))
        x = self.relu2(self.net2(x))
        return self.net3(x)


def main():
    dist.init_process_group("gloo")
    rank = dist.get_rank()
    print(f"Start running basic DDP example on rank {rank}.")
    model = ToyModel()
    ddp_model = DDP(model)
    loss_fn = nn.MSELoss()
    optimizer = optim.SGD(ddp_model.parameters(), lr=0.001)

    # data loader
    transform = transforms.Compose(
        [
            transforms.CenterCrop((500, 500)),
            transforms.PILToTensor(),
            transforms.ConvertImageDtype(torch.float32),
            transforms.Grayscale(num_output_channels=1),  # 将图片转换为黑白
            transforms.Normalize(0.5, 1),
        ]
    )
    dataset = datasets.Caltech256("/cqm-boe", transform=transform)
    sampler = DistributedSampler(dataset)
    dataloader = DataLoader(dataset, batch_size=10, sampler=sampler)
    #train
    for epoch in range(10):
        print(f"epoch {epoch}.")
        optimizer.zero_grad()
        step = 0
        for data, labels in dataloader:
            outputs = ddp_model(data)
            one_hot_labels = torch.nn.functional.one_hot(labels, num_classes=512).float()
            loss_fn(outputs, one_hot_labels).backward()
            optimizer.step()
            print(f"step {step}.")
            step += 1

    dist.destroy_process_group()
    print(f"Finished running basic DDP example on rank {rank}.")


if __name__ == "__main__":
    main()

```
