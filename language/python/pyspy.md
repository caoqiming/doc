# pyspy

## record

py-spy supports recording profiles to a file using the record command

```bash
py-spy record -o profile -d 10 -f speedscope --pid 1439376
```

记录保存的格式有三个选项，默认是 flamegraph，火焰图，还有 raw 原始数据，speedscope 一种性能分析工具的格式。

### 火焰图

不需要过多解释，就是用于展示程序各个函数调用的层级关系和耗时情况，通过颜色和宽度直观地显示性能热点。亮点是竟然可以点击互动，svg 格式真牛逼。

### raw 格式

每一行代表一个不同调用栈的采样，这里有一行代码正在保存图片时的调用栈 ~~才知道原来保存图片比人脸识别更耗时~~
`<module> (test.py:79);detect_from_img (test.py:62);save (PIL/Image.py:2568);_save (PIL/PngImagePlugin.py:1431);_save (PIL/ImageFile.py:551);_encode_tile (PIL/ImageFile.py:570) 666`
每一层调用用分号隔开，最后的数字表示该堆栈被采样到的次数。但是 py-spy 会把多次调用都合并到一起统计，因此信息量有损，不如 speedscope 格式。同样记录 30 秒，可以看到 speedscope 格式保存的大小确实比 raw 大很多。~~这叫哪门子 raw 嘛~~

### speedscope

> 可以在[网页](https://www.speedscope.app/)导入数据进行查看，也可以离线用命令行进行查看，具体看[speedscope 的 github 页面](https://github.com/jlfwong/speedscope/tree/main)的介绍。

有三种显示模式 Time Order, Left Heavy, Sandwich

Time Order，字面意思就是按时间顺序的一个火焰图，非常直观。点击其中一个调用之后下面还会显示当前位置的具体堆栈信息以及统计信息。统计信息分为 This Instance 和 All Instances，其中 All Instances 指的是这个函数在整个分析的时间段内的总和，This Instance 显然就只是这一次调用占用的时间了。然后 Total 指的是该函数整体（包括对下层函数的调用）在上一层函数的耗时中贡献的百分比。Self 是这个函数自身（不包括这个函数下一层调用其他的函数）在上一层函数耗时中贡献的百分比。

LeftHeavy，这个模式就会把 Time Order 中因为多次调用而分开展示的同一个函数都合并，然后将其按照耗时排序。

Sandwich，是一张表，函数调用和 LeftHeavy 模式一样有被同类合并，可以根据 total 或 self 进行排序。如果点击其中一个函数，就能看到所有调用者（展示在该条之上）和被调用者（展示在该函数之下）的火焰图。这也是 sandwich 这个名字的由来。注意一般火焰图只有向下的，向上部分的火焰图左右有分段是因为该函数上层的调用栈不同。

#### speedscope json format

```json
{
  "version": "0.1.2",
  "$schema": "https://www.speedscope.app/file-format-schema.json",
  "profiles": [
    {
      "type": "sampled",
      "name": "simple.speedscope.json",
      "unit": "seconds",
      "startValue": 0,
      "endValue": 14,
      "samples": [
        [0, 1, 2],
        [0, 1, 2],
        [0, 1, 3],
        [0, 1, 2],
        [0, 1]
      ],
      "weights": [1, 1, 4, 3, 5]
    }
  ],
  "shared": {
    "frames": [
      {
        "name": "a"
      },
      {
        "name": "b"
      },
      {
        "name": "c"
      },
      {
        "name": "d"
      }
    ]
  }
}
```

以官网的例子来说明，这里的 frames 是采集到的一些帧（就是采集的那一刻程序运行到了哪里），这里只给了函数名，py-spy 输出的还包括文件地址，行数。然后重点来了，samples 表示的是某一次采样时的调用栈。其中的数字是 frames 的 index ，比如这里的`[0,1,2]`就代表这里的堆栈是`a-b-c`，`[0,1,3]`就代表这里的堆栈是`a-b-d`。weights 的长度和 samples 的长度一致，表示每个 samples 的权重（时间）

### 命令参数

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
