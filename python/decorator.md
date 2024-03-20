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
