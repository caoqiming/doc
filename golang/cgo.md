# cgo

golang 运行 c 最简单的例子，内嵌 c 代码

```go
package main

/*
#include <stdio.h>

void printint(int v) {
    printf("printint: %d\n", v);
}
*/
import "C"

func main() {
    v := 42
    C.printint(C.int(v))
}

```

开头的注释中写了要调用的 C 函数和相关的头文件，头文件被 include 之后里面的所有的 C 语言元素都会被加入到”C” 这个虚拟的包中。需要注意的是，import "C" 导入语句需要单独一行，不能与其他包一同 import。向 C 函数传递参数也很简单，就直接转化成对应 C 语言类型传递就可以。如上例中 C.int(v) 用于将一个 Go 中的 int 类型值强制类型转换转化为 C 语言中的 int 类型值，然后调用 C 语言定义的 printint 函数进行打印。

## 链接

在 `import "C"` 语句前的注释中可以通过 `#cgo` 语句设置编译阶段和链接阶段的相关参数。编译阶段的参数主要用于定义相关宏和指定头文件检索路径。链接阶段的参数主要是指定库文件检索路径和要链接的库文件。

CFLAGS 对应 C 语言特有的编译选项， CXXFLAGS 对应是 C++ 特有的编译选项， CPPFLAGS 则对应 C 和 C++ 共有的编译选项
-D 定义宏，-I 定义头文件目录
LDFLAGS 不区分 c 和 c++，因为在链接阶段就没有 c 和 c++的语言区别了。
库文件检索目录则需要绝对路径。在库文件的检索目录中可以通过 `${SRCDIR}` 变量表示当前文件所在文件夹的绝对路径：
