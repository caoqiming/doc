# Abstract Base Classes

> 原来 python 也有抽象类

```python
import abc  # 利用abc模块实现抽象类

class File(metaclass=abc.ABCMeta):  # abc.ABCMeta是实现抽象类的一个基础类
    @abc.abstractmethod  # 定义抽象方法，无需实现功能
    def read(self):
        pass

class Txt1(File):  # 子类继承抽象类，但是必须定义read方法将抽象类中的read方法覆盖
    def read(self):
        print('hello')

class Txt2(File):
    pass

txt1 = Txt1()
txt2 = Txt2()
```

txt1 可以实例化，txt2 不可以。会报错

```txt
Traceback (most recent call last):
  File "xxx/test.py", line 16, in <module>
    txt2 = Txt2()
           ^^^^^^
TypeError: Can't instantiate abstract class Txt2 without an implementation for abstract method 'read'
```
