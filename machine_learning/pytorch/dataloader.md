# dataloader

## dataset

dataset 主要定义了数据集的位置，读取数据时对数据做的变换，对标签做的变换。
一般是在`__init__`时遍历输入的数据集所在的地址，建立一个 key 到每条数据所在地址的 map。然后实现`__getitem__`方法，根据输入的 key，读取数据并进行一些处理（一般是转化为 tensor，归一化等等）。

## dataloader

dataloader 根据 sampler 返回的随机索引从 dataset 中读取数据。
