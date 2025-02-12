# args and kwargs

In Python, \*args and \*\*kwargs are used to allow functions to accept an arbitrary number of arguments.

- \*args (Non-Keyword Arguments)
- \*\*kwargs (Keyword Arguments)

```python
# *args example
def fun(*args):
    return sum(args)

print(fun(1, 2, 3, 4))
# 10

# **kwargs example
def fun(**kwargs):
    for k, val in kwargs.items():
        print(k, val)

fun(a=1, b=2, c=3)
# a 1
# b 2
# c 3
```

We can use both \*args and \*\*kwargs in the same function to accept a mix of positional and keyword arguments.

```python
def fun(*args, **kwargs):
    print("Positional arguments:", args)
    print("Keyword arguments:", kwargs)

fun(1, 2, 3, a=4, b=5)
# Positional arguments: (1, 2, 3)
# Keyword arguments: {'a': 4, 'b': 5}
```
