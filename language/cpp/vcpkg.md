# vcpkg

微软开发的 c++包管理器，安装参考[官网](https://learn.microsoft.com/zh-cn/vcpkg/get_started/get-started?pivots=shell-bash)

```bash
git clone https://github.com/microsoft/vcpkg.git
cd vcpkg && ./bootstrap-vcpkg.sh
```

设置环境变量

```bash
export VCPKG_ROOT=/path/to/vcpkg
export PATH=$VCPKG_ROOT:$PATH
```

## usage

添加依赖项和项目文件

```bash
vcpkg new --application
```

会在当前目录生成两个 json 文件，`vcpkg-configuration.json`和`vcpkg.json`

添加依赖项，以 fmt 为例

```bash
vcpkg add port fmt
```

要允许 CMake 项目系统识别 vcpkg 提供的 C++ 库，需要提供 vcpkg.cmake 工具链文件。 需要创建一个 CMakePresets.json 文件：

```json
{
  "version": 2,
  "configurePresets": [
    {
      "name": "default",
      "generator": "Ninja",
      "binaryDir": "${sourceDir}/build",
      "cacheVariables": {
        "CMAKE_TOOLCHAIN_FILE": "$env{VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake"
      }
    }
  ]
}
```

```cmake
cmake_minimum_required(VERSION 3.10)
project(HelloWorld)
find_package(fmt CONFIG REQUIRED)
add_executable(HelloWorld main.cpp)
target_link_libraries(HelloWorld PRIVATE fmt::fmt)
```

- `find_package(fmt CONFIG REQUIRED)` 使用 fmt 库的 CMake 配置文件查找该库。 REQUIRED 关键字确保在找不到包时生成错误。
- `target_link_libraries(HelloWorld PRIVATE fmt::fmt)` 指定 HelloWorld 可执行文件应链接到 fmt 库。 PRIVATE 关键字表明 fmt 仅在生成 HelloWorld 时需要，不应传播到其他依赖项目。这里的第一个 fmt 指的是指定 fmt 库的命名空间。在 CMake 中，这是你从中获取目标库的地方。这个名字一般来自于 find_package()中定义的名称或者是你通过 add_library()创建的库的名字。第二个 fmt 则是指 fmt 库中的 fmt 目标。

使用 cmake 的时候再指定这个 preset

```bash
cmake --preset=default
```

如果 vscode 找不到头文件（这不会影响编译），需要添加一下 include 路径，在 vcpkg 的文件夹下`vcpkg/packages/fmt_x64-linux/include`

编译的时候因为 `CMakePresets.json`中的 generator 选了 Ninja，就不是 make 了，直接执行`cmake --build build`
如果选的是 `Unix Makefiles` 就是用 make
