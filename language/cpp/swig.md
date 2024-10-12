# swig

Simple Wrapper and Interface Generator （SWIG） is a software development tool that connects programs written in C and C++ with a variety of high-level programming languages. SWIG is used with different types of target languages including common scripting languages such as Javascript, Perl, PHP, Python, Tcl and Ruby.

```bash
swig -tcl example.i
gcc -fpic -c example.c example_wrap.c -I/usr/include/tcl
gcc -shared example.o example_wrap.o -o example.so
tclsh
```

## 安装 tcl

tcl 是一种动态语言

```bash
sudo apt-get install tcl-dev
```

安装完成后，你应该就可以在 /usr/include 目录下找到 "tcl.h" 文件了
