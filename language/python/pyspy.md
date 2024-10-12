# pyspy

## record

py-spy supports recording profiles to a file using the record command

```bash
py-spy record -o profile -d 10 -f speedscope --pid 1439376
```

记录保存的格式有三个选项，默认是 flamegraph，火焰图，还有 raw 原始数据，speedscope 一种性能分析工具的格式。

- 火焰图
  不需要过多解释，就是用于展示程序各个函数调用的层级关系和耗时情况，通过颜色和宽度直观地显示性能热点。亮点是竟然可以点击互动，svg 格式真牛逼。
- raw 格式
  每一行代表一次结果不同的采样，这里有一行代码正在保存图片时的堆栈 ~~才知道原来保存图片比人脸识别更耗时~~
  `<module> (test.py:79);detect_from_img (test.py:62);save (PIL/Image.py:2568);_save (PIL/PngImagePlugin.py:1431);_save (PIL/ImageFile.py:551);_encode_tile (PIL/ImageFile.py:570) 666`
  每一层调用用分号隔开，最后的数字表示该堆栈被采样到的次数。但是 py-spy 会把多次调用都合并到一起统计，因此信息量有损，不如 speedscope 格式。同样记录 30 秒，可以看到 speedscope 格式保存的大小确实比 raw 大很多。~~这叫哪门子 raw 嘛~~
- speedscope
  可以在[网页](https://www.speedscope.app/)导入数据进行查看，也可以离线用命令行进行查看，具体看[speedscope 的 github 页面](https://github.com/jlfwong/speedscope/tree/main)的介绍。

默认会一直记录，可以用-d 参数指定记录时间（秒）
其他参数如下，版本 py-spy 0.3.14

```text
OPTIONS:
    -p, --pid <pid>              PID of a running python program to spy on
        --full-filenames         Show full Python filenames, instead of shortening to show only the package part
    -o, --output <filename>      Output filename
    -f, --format <format>        Output file format [default: flamegraph] [possible values: flamegraph, raw, speedscope]
    -d, --duration <duration>    The number of seconds to sample for [default: unlimited]
    -r, --rate <rate>            The number of samples to collect per second [default: 100]
    -s, --subprocesses           Profile subprocesses of the original process
    -F, --function               Aggregate samples by function's first line number, instead of current line number
        --nolineno               Do not show line numbers
    -t, --threads                Show thread ids in the output
    -g, --gil                    Only include traces that are holding on to the GIL
    -i, --idle                   Include stack traces for idle threads
    -n, --native                 Collect stack traces from native extensions written in Cython, C or C++
        --nonblocking            Don't pause the python process when collecting samples. Setting this option will reduce the performance impact of sampling, but may lead to inaccurate results
    -h, --help                   Print help information
```

## dump

```bash
py-spy dump --pid
```

会打印当前的堆栈
~~不愧是耗时最长的堆栈，一下子就逮到了~~

```text
Process 1496700: python3 test.py
Python v3.9.9 (/usr/local/bin/python3.9)

Thread 1496700 (active): "MainThread"
    _encode_tile (PIL/ImageFile.py:570)
    _save (PIL/ImageFile.py:551)
    _save (PIL/PngImagePlugin.py:1431)
    save (PIL/Image.py:2568)
    detect_from_img (test.py:66)
    <module> (test.py:83)
```
