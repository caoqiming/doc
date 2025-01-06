# thrift

## install

```bash
sudo apt install thrift-compiler
```

或者从源码安装

参考[环境准备](https://thrift.apache.org/docs/install/debian.html)

libboost-all-dev 安装失败的话尝试用 aptitude

```bash
sudo apt-get install aptitude
sudo aptitude install libboost-all-dev
```

[从源码构建](https://thrift.apache.org/docs/BuildingFromSource)

```bash
./bootstrap.sh
./configure --without-java
make
make install
```

## usage

```bash
thrift -r --gen cpp test.thrift
```
