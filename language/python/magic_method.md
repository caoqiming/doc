# magic methods

以双下划线开头和结尾的函数在 python 中有特殊意义。python 会在一些操作中自动调用这些函数。

## Construction and Initialization

每个人都知道`__init__`函数，但实际上在创建一个对象时最先被调用的是`__new__`。在对象的生命周期结束的时候还会调用`__del__`

- `__new__(cls, [...)`
  `__new__ `is the first method to get called in an object's instantiation. It takes the class, then any other arguments that it will pass along to `__init__`. `__new__` is used fairly rarely, but it does have its purposes, particularly when subclassing an immutable type like a tuple or a string.
- `__init__(self, [...)`
  The initializer for the class.
- `__del__(self)`
  If `__new__` and `__init__` formed the constructor of the object, `__del__` is the destructor. It doesn't implement behavior for the statement `del x` (so that code would not translate to `x.__del__()`). Rather, it defines behavior for when an object is garbage collected. It can be quite useful for objects that might require extra cleanup upon deletion, like sockets or file objects. Be careful, however, as there is no guarantee that `__del__` will be executed if the object is still alive when the interpreter exits

## Making Custom Sequences

There's a number of ways to get your Python classes to act like built in sequences (dict, tuple, list, str, etc.)

**to make an immutable container, you need only define `__len__` and `__getitem__`**
**The mutable container protocol requires everything that immutable containers require plus `__setitem__` and `__delitem__`**
**Lastly, if you want your object to be iterable, you'll have to define `__iter__`, which returns an iterator. That iterator must conform to an iterator protocol, which requires iterators to have methods called `__iter__`(returning itself) and `next`**

- `__len__(self)`
  Returns the length of the container. Part of the protocol for both immutable and mutable containers.
- `__getitem__(self, key)`
  Defines behavior for when an item is accessed, using the notation `self[key]`. This is also part of both the mutable and immutable container protocols. It should also raise appropriate exceptions: TypeError if the type of the key is wrong and KeyError if there is no corresponding value for the key.
- `__setitem__(self, key, value)`
  Defines behavior for when an item is assigned to, using the notation `self[nkey] = value`. This is part of the mutable container protocol. Again, you should raise KeyError and TypeError where appropriate.
- `__delitem__(self, key)`
  Defines behavior for when an item is deleted (e.g. `del self[key]`). This is only part of the mutable container protocol. You must raise the appropriate exceptions when an invalid key is used.
- `__iter__(self)`
  Should return an iterator for the container. Iterators are returned in a number of contexts, most notably by the `iter()` built in function and when a container is looped over using the form `for x in container:`. Iterators are their own objects, and they also must define an `__iter__` method that returns self.

  ```python
  class MyIterable:
    def __init__(self, data):
        self.data = data

    def __iter__(self):
        print("MyIterable.__iter__ is called")
        return MyIterator(self.data)

  class MyIterator:
      def __init__(self, data):
          self.data = data
          self.index = 0

      def __next__(self):
          print("__next__ is called")
          if self.index < len(self.data):
              result = self.data[self.index]
              self.index += 1
              return result
          else:
              raise StopIteration


  # 测试
  my_iterable = MyIterable([1, 2, 3, 4])
  for item in my_iterable:
      print(item)
  ```

  输出

  ```text
  MyIterable.__iter__ is called
  __next__ is called
  1
  __next__ is called
  2
  __next__ is called
  3
  __next__ is called
  4
  __next__ is called
  ```

- `__reversed__(self)`
  Called to implement behavior for the `reversed()` built in function. Should return a reversed version of the sequence. Implement this only if the sequence class is ordered, like list or tuple.
- `__contains__(self, item)`
  `__contains__` defines behavior for membership tests using `in` and `not in`. Why isn't this part of a sequence protocol, you ask? Because when `__contains__` isn't defined, Python just iterates over the sequence and returns True if it comes across the item it's looking for.
- `__missing__(self, key)`
  `__missing__` is used in subclasses of dict. It defines behavior for whenever a key is accessed that does not exist in a dictionary (so, for instance, if I had a dictionary d and said d["george"] when "george" is not a key in the dict, `d.__missing__("george")` would be called).

## Comparison magic methods

- `__eq__(self, other)`
- `__ne__(self, other)`
- `__lt__(self, other)`
- `__gt__(self, other)`
- `__le__(self, other)`
- `__ge__(self, other)`

## Numeric magic methods

### Unary operators and functions

- `__pos__(self)`
  Implements behavior for unary positive (e.g. +some_object)
- `__neg__(self)`
  Implements behavior for negation (e.g. -some_object)
- `__abs__(self)`
  Implements behavior for the built in abs() function.
- `__invert__(self)`
  Implements behavior for inversion using the ~ operator. For an explanation on what this does, see the Wikipedia article on bitwise operations.
- `__round__(self, n)`
  Implements behavior for the built in round() function. n is the number of decimal places to round to.
- `__floor__(self)`
  Implements behavior for math.floor(), i.e., rounding down to the nearest integer.
- `__ceil__(self)`
  Implements behavior for math.ceil(), i.e., rounding up to the nearest integer.
- `__trunc__(self)`
  Implements behavior for math.trunc(), i.e., truncating to an integral.

### Normal arithmetic operators

- `__add__(self, other)`
  Implements addition.
- `__sub__(self, other)`
  Implements subtraction.
- `__mul__(self, other)`
  Implements multiplication.
- `__floordiv__(self, other)`
  Implements integer division using the // operator.
- `__truediv__(self, other)`
  Implements true division. Note that this only works when from `__future__` import division is in effect.
- `__mod__(self, other)`
  Implements modulo using the % operator.
- `__divmod__(self, other)`
  Implements behavior for long division using the divmod() built in function.
- `__pow__`
  Implements behavior for exponents using the \*\* operator.
- `__lshift__(self, other)`
  Implements left bitwise shift using the << operator.
- `__rshift__(self, other)`
  Implements right bitwise shift using the >> operator.
- `__and__(self, other)`
  Implements bitwise and using the & operator.
- `__or__(self, other)`
  Implements bitwise or using the | operator.
- `__xor__(self, other)`
  Implements bitwise xor using the ^ operator.

### Reflected arithmetic operators

与 Normal arithmetic operators 相似，区别在于前者是`some_object + other`（实现方法的对象为 some_object，other 是另外一种对象），这里是`other + some_object`。
Reflected arithmetic operators 只有在`other`对象没有定义 Normal arithmetic operators 时才会被执行。
In most cases, the result of a reflected operation is the same as its normal equivalent, so you may just end up defining `__radd__` as calling `__add__` and so on.

- `__radd__(self, other)`
  Implements reflected addition.
  剩下的也一样，就是名字在对应的 Normal arithmetic operators 前加了一个 r ，就不列出来了

### Augmented assignment

类似于 `x += 1`

- `__iadd__(self, other)`
  Implements addition with assignment.
  剩下的也是对应 Normal arithmetic operators 前加了个 i，不列出来了

### Type conversion magic methods

实现了内置的类型转换函数

- `__int__(self)`
  Implements type conversion to int.
- `__long__(self)`
  Implements type conversion to long.
- `__float__(self)`
  Implements type conversion to float.
- `__complex__(self)`
  Implements type conversion to complex.
- `__oct__(self)`
  Implements type conversion to octal.
- `__hex__(self)`
  Implements type conversion to hexadecimal.
- `__index__(self)`
  Implements type conversion to an int when the object is used in a slice expression. If you define a custom numeric type that might be used in slicing, you should define `__index__`.
  把对象当作索引扔给 list 的时候会调用`__index__`，但是 dict 不行

  ```python
  class Thing(object):
      def __index__(self):
          print('__index__ called!')
          return 1

  thing = Thing()

  list_ = ['abc', 'def', 'ghi']
  list_[thing]  # __index__ is called, resutl is 'def'
  ```

- `__trunc__(self)`
  Called when math.trunc(self) is called. `__trunc__` should return the value of `self truncated to an integral type (usually a long).

## Representing your Classes

- `__str__(self)`
  Defines behavior for when str() is called on an instance of your class.
- `__repr__(self)`
  Defines behavior for when repr() is called on an instance of your class. The major difference between str() and repr() is intended audience. repr() is intended to produce output that is mostly machine-readable (in many cases, it could be valid Python code even), whereas str() is intended to be human-readable.
- `__format__(self, formatstr)`
  Defines behavior for when an instance of your class is used in new-style string formatting. For instance, "Hello, {0:abc}!".format(a) would lead to the call `a.__format__("abc")`. This can be useful for defining your own numerical or string types that you might like to give special formatting options.
- `__hash__(self)`
  Defines behavior for when hash() is called on an instance of your class. It has to return an integer, and its result is used for quick key comparison in dictionaries. Note that this usually entails implementing `__eq__` as well. Live by the following rule: a == b implies hash(a) == hash(b).
- `__bool__(self)`
  Defines behavior for when bool() is called on an instance of your class. Should return True or False, depending on whether you would want to consider the instance to be True or False.
- `__dir__(self)`
  Defines behavior for when dir() is called on an instance of your class. This method should return a list of attributes for the user. Typically, implementing `__dir__` is unnecessary, but it can be vitally important for interactive use of your classes if you redefine `__getattr__` or `__getattribute__` (which you will see in the next section) or are otherwise dynamically generating attributes.
- `__sizeof__(self)`
  Defines behavior for when sys.getsizeof() is called on an instance of your class. This should return the size of your object, in bytes. This is generally more useful for Python classes implemented in C extensions, but it helps to be aware of it.

## Controlling Attribute Access

- `__getattr__(self, name)`
  It gets called when a nonexistent attribute is accessed
- `__setattr__(self, name, value)`
  It allows you to define behavior for assignment to an attribute regardless of whether or not that attribute exists, meaning you can define custom rules for any changes in the values of attributes.
  得小心导致无限递归

  ```python
  def __setattr__(self, name, value):
    self.name = value
    # since every time an attribute is assigned, __setattr__() is called, this
    # is recursion.
    # so this really means self.__setattr__('name', value). Since the method
    # keeps calling itself, the recursion goes on forever causing a crash
    def __setattr__(self, name, value):
        self.__dict__[name] = value # assigning to the dict of names in the class
        # define custom behavior here
  ```

- `__delattr__(self, name)`
  This is the exact same as `__setattr__`, but for deleting attributes instead of setting them.
- `__getattribute__(self, name)`
  After all this, `__getattribute__` fits in pretty well with its companions `__setattr__` and `__delattr__`.

## Reflection

You can also control how reflection using the built in functions `isinstance()` and `issubclass()` behaves by defining magic methods. The magic methods are:

- `__instancecheck__(self, instance)`
  Checks if an instance is an instance of the class you defined (e.g. `isinstance(instance, class)`).
- `__subclasscheck__(self, subclass)`
  Checks if a class subclasses the class you defined (e.g. `issubclass(subclass, class)`).

## Callable Objects

As you may already know, in Python, functions are first-class objects.

> first-class objects（第一类对象）指的是那些在编程语言中被视为主要的并且可以灵活操作的实体。具体来说，first-class objects 具备以下特点：
>
> 1. 可以赋值给变量：函数可以赋值给变量，比如 f = some_function。
> 2. 可以作为参数传递：函数可以作为参数传递给其他函数，比如 map(f, iterable)。
> 3. 可以作为函数的返回值：函数可以作为另一个函数的返回值，比如 def outer(): return inner_function。
> 4. 可以存储在数据结构中：函数可以存储在列表、字典等数据结构中，比如 functions_list = [func1, func2]。

A special magic method in Python allows instances of your classes to behave as if they were functions, so that you can "call" them, pass them to functions that take functions as arguments, and so on.

- `__call__(self, [args...])`
  Allows an instance of a class to be called as a function. Essentially, this means that `x()` is the same as `x.__call__()`. Note that `__call__` takes a variable number of arguments; this means that you define `__call__` as you would any other function, taking however many arguments you'd like it to.

## Context Managers

```python
with open('foo.txt') as bar:
    # perform some action with bar
```

Context managers allow setup and cleanup actions to be taken for objects when their creation is wrapped with a with statement. The behavior of the context manager is determined by two magic methods:

- `__enter__(self)`
  Defines what the context manager should do at the beginning of the block created by the with statement. Note that the return value of `__enter__` is bound to the target of the with statement, or the name after the `as`.
- `__exit__(self, exception_type, exception_value, traceback)`
  Defines what the context manager should do after its block has been executed (or terminates). It can be used to handle exceptions, perform cleanup, or do something always done immediately after the action in the block. If the block executes successfully, `exception_type`, `exception_value`, and `traceback` will be None. Otherwise, you can choose to handle the exception or let the user handle it; if you want to handle it, make sure `__exit__` returns True after all is said and done. If you don't want the exception to be handled by the context manager, just let it happen.

## Abstract Base Classes

see [ABC](./abc)

## Building Descriptor Objects

To be a descriptor, a class must have at least one of `__get__`, `__set__`, and `__delete__` implemented.

- `__get__(self, instance, owner)`
  Define behavior for when the descriptor's value is retrieved. instance is the instance of the owner object. owner is the owner class itself.
- `__set__(self, instance, value)`
  Define behavior for when the descriptor's value is changed. instance is the instance of the owner class and value is the value to set the descriptor to.
- `__delete__(self, instance)`
  Define behavior for when the descriptor's value is deleted. instance is the instance of the owner object.

```python
class Celsius:
    def __init__(self, value=0.0):
        self.value = float(value)

    def __get__(self, instance, owner):
        print("Celsius.__get__ is called instance: %s owner: %s" % (instance, owner))
        return self.value

    def __set__(self, instance, value):
        # Celsius_instance = value 时就会调用这个函数，也就是说给 Celsius 的实例赋值的时候可以不是 Celsius 类型。
        # 就这个例子而言，只能是一个数字，Celsius类型的实例不能赋值给另外一个Celsius类型的实例！！！
        # 因为这里的 float(value) 不接受 Celsius 类型。 除非再定义一下 __float__(self)
        print("Celsius.__set__ is called instance: %s owner: %s" % (instance, value))
        self.value = float(value)


class Temperature:
    celsius = Celsius()


temp = Temperature()
temp.celsius  # calls celsius.__get__
temp.celsius = 26  # calls celsius.__set__
```

输出为

```text
Celsius.__get__ is called instance: <__main__.Temperature object at 0x107ddab40> owner: <class '__main__.Temperature'>
Celsius.__set__ is called instance: <__main__.Temperature object at 0x107ddab40> owner: 26
```

目前直接赋值`temp.celsius = Celsius(27)`是会报错的，因为 Celsius 还没办法转为 float，在`self.value = float(value)`会报错。给 Celsius 加上 `__float__`方法就可以了。

```python
class Celsius:
    def __init__(self, value=0.0):
        self.value = float(value)

    def __get__(self, instance, owner):
        print("Celsius.__get__ is called instance: %s owner: %s" % (instance, owner))
        return self.value

    def __set__(self, instance, value):
        print("Celsius.__set__ is called instance: %s owner: %s" % (instance, value))
        self.value = float(value)

    def __float__(self):
        return self.value


class Temperature:
    celsius = Celsius()


temp = Temperature()
temp.celsius  # calls celsius.__get__
temp.celsius = Celsius(27)  # calls celsius.__set__
```

输出为

```text
Celsius.__get__ is called instance: <__main__.Temperature object at 0x1045cec60> owner: <class '__main__.Temperature'>
Celsius.__set__ is called instance: <__main__.Temperature object at 0x1045cec60> owner: <__main__.Celsius object at 0x1045ceea0>
```

如果不将 celsius 作为 Temperature 的成员，`__get__`和`__set__`并不会被调用。

## Copying

- `__copy__(self)`
  Defines behavior for copy.copy() for instances of your class. copy.copy() returns a **shallow** copy of your object -- this means that, while the instance itself is a new instance, all of its data is referenced -- i.e., the object itself is copied, but its data is still referenced (and hence changes to data in a shallow copy may cause changes in the original).
- `__deepcopy__(self, memodict={})`
  Defines behavior for copy.deepcopy() for instances of your class. copy.deepcopy() returns a **deep** copy of your object -- the object and its data are both copied. memodict is a cache of previously copied objects -- this optimizes copying and prevents infinite recursion when copying recursive data structures. When you want to deep copy an individual attribute, call copy.deepcopy() on that attribute with memodict as the first argument.

## Pickling Your Objects

用 pickle 包序列化和反序列化自定义的类

> 依稀记得曾经用过，但不咋好使

- `__getinitargs__(self)`
  If you'd like for `__init__` to be called when your class is unpickled, you can define `__getinitargs__`, which should return a tuple of the arguments that you'd like to be passed to `__init__`. Note that this method will only work for old-style classes.
- `__getnewargs__(self)`
  For new-style classes, you can influence what arguments get passed to `__new__` upon unpickling. This method should also return a tuple of arguments that will then be passed to `__new__`.
- `__getstate__(self)`
  Instead of the object's `__dict__` attribute being stored, you can return a custom state to be stored when the object is pickled. That state will be used by `__setstate__` when the object is unpickled.
- `__setstate__(self, state)`
  When the object is unpickled, if `__setstate__` is defined the object's state will be passed to it instead of directly applied to the object's `__dict__`. This goes hand in hand with **getstate**: when both are defined, you can represent the object's pickled state however you want with whatever you want.
- `__reduce__(self)`
  When defining extension types (i.e., types implemented using Python's C API), you have to tell Python how to pickle them if you want them to pickle them. `__reduce__` is called when an object defining it is pickled. It can either return a string representing a global name that Python will look up and pickle, or a tuple. The tuple contains between 2 and 5 elements: a callable object that is called to recreate the object, a tuple of arguments for that callable object, state to be passed to `__setstate__` (optional), an iterator yielding list items to be pickled (optional), and an iterator yielding dictionary items to be pickled (optional).
- `__reduce_ex__(self)`
  `__reduce_ex__` exists for compatibility. If it is defined, `__reduce_ex__` will be called over `__reduce__` on pickling. `__reduce__` can be defined as well for older versions of the pickling API that did not support `__reduce_ex__`.
