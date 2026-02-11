# yield

yield 用于定义生成器（generator），使函数在每次遇到 yield 时暂停并返回一个值，下次从暂停处继续执行。生成器是一种惰性可迭代对象，适合处理大数据流或耗时计算。

基本用法示例：

```python
def count_up(n):
    i = 0
    while i < n:
        yield i
        i += 1

for x in count_up(3):
    print(x)  # 输出 0 1 2
```

生成器与迭代器：

- 调用生成器函数返回一个生成器对象（实现了 **iter** 和 **next**）。
- 使用 next(gen) 或 for 循环取值；取尽后抛出 StopIteration。

send、throw、close（进阶用法）：

```python
def echo():
    received = None
    while True:
        received = yield received

g = echo()
next(g)             # 启动生成器，run 到第一个 yield
print(g.send("a"))  # 发送 "a"，yield 表达式返回 "a"，打印 "a"
# g.throw(ValueError("err"))  # 向生成器内抛出异常
# g.close()                  # 关闭生成器
```

生成器表达式（简洁写法）：

```python
gen = (x*x for x in range(3))
print(list(gen))  # [0, 1, 4]
```

何时使用 yield：

- 需要惰性计算、节省内存（例如处理大文件、流数据）。
- 想把状态保存在函数中以便迭代续作。

常见注意点：

- yield 与 return 不同：return 结束函数并返回值，yield 暂停函数并返回值，函数可多次 yield。
- 生成器被消费后就不能复用，需重新创建。
- 使用 send 可以向生成器内部传值，但第一次必须先启动生成器（例如调用 next）。

简洁示例汇总：

```python
def squares(n):
    for i in range(n):
        yield i*i

# 使用
s = squares(5)
print(next(s))  # 0
print(list(s))  # [1, 4, 9, 16]
```
