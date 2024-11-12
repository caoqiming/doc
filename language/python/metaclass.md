# metaclass

## 在 python 中，类本身也是一种对象

在 Python 中，类本身也是一种对象，我们可以像操作普通对象一样直接操作一个类，所不同的是，这些操作都会反映到所有类的实例身上。

既然类也是一种对象，那么类也存在类型，类的类型就称作元类，即元类用于创建类对象。在 Python 中，默认的元类是 type。我们可以利用 type 来创建类，就像我们利用类来创建实例一样。type 接收三个参数来创建类，第一个是类名，第二个是基类元组，第三个是类属性：

```python
class Class: pass
c = Class()
# 对类的操作会影响到每个实例
Class.attr = 'attr'
print(c.attr)
# attr

# 正常创建一个类
class C(Class):
    def __init__(self, c):
        self.c = c

o = C(10)

# 等价于
# 利用type动态地创建类
def __init__(self, c):
    self.c = c

C = type('C', (Class,), dict(__init__=__init__))
o = C(10)

print(issubclass(C, Class))
# True
print(type(C))
# <class 'type'>
```

## 指定元类

在普通类的继承列表后面增加关键字参数 metaclass 以指定元类

```python
class File(metaclass=abc.ABCMeta):
    pass
```

## 元类的作用

- 元类能够作用于父类以及它的所有子类中。所以如果希望修改一个继承链中的所有类，只需要为基类增加一个元类即可。
- 我们可以通过改写元类的 `__new__` 和 `__init__` 方法来控制类的创建过程
- 我们可以利用元类来限制类的方法的命名格式
- 我们可以利用元类来限制子类对方法的重载，让其必须同父类的参数列表一致
