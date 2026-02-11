# @ Symbol in Python

In Python, the “@” symbol is primarily associated with decorators. Decorators are a powerful and flexible way to modify or extend the behavior of functions or methods without changing their code. They are often used for tasks such as logging, authentication, and performance monitoring. The “@” symbol is used to apply a decorator to a function or method.

## Example

### Apply the Decorator to a Function

```python
# Define a decorator function
def log_function_call(func):
    def wrapper(*args, **kwargs):
        print(f"Calling function {func.__name__} with arguments {args} and keyword arguments {kwargs}")
        result = func(*args, **kwargs)
        print(f"Function {func.__name__} returned {result}")
        return result
    return wrapper

# Apply the decorator to a function
@log_function_call
def add(a, b):
    return a + b

# Call the decorated function
result = add(5, 3)
```

Output:

```
Calling function add with arguments (5, 3) and keyword arguments {}
Function add returned 8
```

当你用装饰器包装一个函数时，其实是将原函数替换成了一个新的函数。 通常是装饰器内部定义的 wrapper
这会导致一个问题：如果你使用 IDE（如 PyCharm 或 VS Code）查看函数提示，或者使用自动化文档工具，它们会告诉你这个函数叫 wrapper
可以用`functools.wraps`来将原函数的名字等各种原数据复制过来。

```python
import time
import tracemalloc
from functools import wraps

def benchmark(func):
    @wraps(func)
    def wrapper(self, *args, **kwargs):
        # 1. 准备统计环境
        tracemalloc.start()
        start_time = time.perf_counter()

        # 2. 执行核心算法
        result = func(self, *args, **kwargs)

        # 3. 收集数据
        end_time = time.perf_counter()
        current, peak = tracemalloc.get_traced_memory()
        tracemalloc.stop()

        # 4. 将统计结果写入实例属性 (self 是 MazeSolver 的实例)
        self.stats = {
            "time_ms": (end_time - start_time) * 1000,
            "memory_kb": peak / 1024,
            "steps": len(result) if result else 0
        }

        return result
    return wrapper
```

### Matrix Multiplication using the “@” operator

```python
import numpy as np

# Define two matrices as NumPy arrays
matrix_a = np.array([[1, 2], [3, 4]])
matrix_b = np.array([[5, 6], [7, 8]])

# Perform matrix multiplication using the "@" operator
result = matrix_a @ matrix_b

# Print the result
print(result)
```

Output:

```
[[19 22]
 [43 50]]
```
