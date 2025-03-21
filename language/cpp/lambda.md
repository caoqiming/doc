# lambda

```cpp
[捕获](形参) -> 返回类型 {函数体};
```

有形参和返回的例子

```cpp
#include <iostream>

int main()
{
	auto print = [](int s) {std::cout << "value is " << s << std::endl;};
	auto lambAdd = [](int a, int b) ->int { return a + b;};
	int iSum = lambAdd(10, 11);
	print(iSum);

	return 0;
}
```

当我们定义一个 lambda 表达式后，编译器会自动生成一个匿名类，这个类里面会默认实现一个 public 类型的 operator()函数，我们称为闭包类型。那么在运行时，这个 lambda 表达式就会返回一个匿名的闭包实例，它是一个右值。

闭包可以通过传值或者引用的方式捕获其封装作用域内的变量，前面的方括号就是用来定义捕获模式以及变量。

```cpp
#include <iostream>

int main()
{
    int x = 10;
    auto lambAdd2 = [&x](int a, int b)
    { return a + b + x; };
    std::cout << lambAdd2(20, 30) << std::endl;
    return 0;
}
```

## 捕获的类型

- []：默认不捕获任何变量；
- [=]：默认以复制捕获所有变量；
- [&]：默认以引用捕获所有变量；
- [x]：仅以复制捕获 x，其它变量不捕获；
- [x...]：以包展开方式复制捕获参数包变量；
- [&x]：仅以引用捕获 x，其它变量不捕获；
- [&x...]：以包展开方式引用捕获参数包变量；
- [=, &x]：默认以复制捕获所有变量，但是 x 是例外，通过引用捕获；
- [&, x]：默认以引用捕获所有变量，但是 x 是例外，通过复制捕获；
- [this]：通过引用捕获当前对象（其实是复制指针）；
- [*this]：通过复制方式捕获当前对象；

默认情况下，在 lambda 表达式中，对于 operator()的重载是 const 属性的，也就意味着如果以复制形式捕获的变量，是不允许修改的

```cpp
	auto lambAdd = [x](int a) {
	//	x++;  此处x是只读，不允许自增，编译会报错
		return a + x;
	};
```

如果想使用复制捕获，又想修改变量的值，可以给 lambda 表达式指定 mutable 关键字。它的修改出了 lambda 表达式以后就无效了。

```cpp
	auto lambAdd = [x](int a) mutable {
		x++;
		return a + x;
	};
```
