# cmake

CMake is cross-platform free and open-source software for build automation, testing, packaging and installation of software by using a compiler-independent method. CMake is not a build system itself; it generates another system's build files.

## usage

这里介绍 linux 下如何使用 cmake。

### 最简单的例子

```cmake
# CMake 最低版本号要求
cmake_minimum_required (VERSION 2.8)

# 项目信息
project (Demo1)

# 设置include目录
include_directories(${CMAKE_SOURCE_DIR}/external/workflow/_include)
# 设置lib目录
link_directories(${CMAKE_SOURCE_DIR}/external/workflow/_lib)
# 指定生成目标
add_executable(demo main.cpp)
# 连接
target_link_libraries(demo workflow)
```

`add_executable` 需要指定所有相关的 cpp 文件。编译器并没有把查找源文件的功能。可以考虑用通配符，但注意，即使这样，每次新增文件之后都需要重新执行 cmake

```cmake
file(GLOB_RECURSE SOURCE_FILES "*.cpp")
add_executable(myproject ${SOURCE_FILES})
```

然后在当前目录执行`cmake .`，会自动生成一些文件以及 Makefile。再执行`make`就会编译了。

### else

mac 上 cmake 找不到 libomp，安装 libomp 时 brew 也有提示 libomp is keg-only
那么只需要在 cmakelists 文件里添加

```
list(APPEND CMAKE_PREFIX_PATH "/usr/local/opt/libomp")
```

为了不影响项目其他的文件，一般会创建一个 build 文件夹

```bash
mkdir build
cd build
cmake ..
make
```
