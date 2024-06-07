# thrift

## install

参考[官网](https://thrift.apache.org/docs/install/debian.html)
libboost-all-dev 安装失败的话尝试用 aptitude

```bash
sudo apt-get install aptitude
sudo aptitude install libboost-all-dev
```

## usage

```bash
thrift -r --gen cpp test.thrift
```
