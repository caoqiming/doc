# reflect

[refer to](https://go.dev/blog/laws-of-reflection)

## interface

Go is statically typed. Every variable has a static type, that is, exactly one type known and fixed at compile time. One important category of type is interface types, which represent fixed sets of methods. Some people say that Go’s interfaces are dynamically typed, but that is misleading.

A variable of interface type stores a pair: **the concrete value assigned to the variable**, and **that value’s type descriptor**. To be more precise, the value is the underlying concrete data item that implements the interface and the type describes the full type of that item. The value inside carries all the type information about that value. That’s why we can do **type assertion**.

One important detail is that the pair inside an interface variable always has the form (value, concrete type) and cannot have the form (value, interface type). Interfaces do not hold interface values.

## reflection

### Reflection goes from interface value to reflection object

At the basic level, reflection is just a mechanism to examine the type and value pair stored inside an interface variable.
函数 `reflect.TypeOf` 和 `reflect.ValueOf` 可以从一个接口的值中分别获取 `reflect.Type` 和 `reflect.Value`
`TypeOf` 函数接受一个`interface{}`，因此当我们调用 reflect.TypeOf(x)时 x 首先被储存在一个空的接口中作为参数传入，然后 `reflect.TypeOf` 从这个空接口中解析出类型信息。

### Reflection goes from reflection object to interface value.

Given a reflect.Value we can recover an interface value using the `Interface()` method

```go
// Interface returns v's value as an interface{}.
func (v Value) Interface() interface{}
```

- To keep the API simple, the “getter” and “setter” methods of Value operate on the largest type that can hold the value: int64 for all the signed integers, for instance. That is, the Int method of Value returns an int64 and the SetInt value takes an int64; it may be necessary to convert to the actual type involved.
- The Kind of a reflection object describes the underlying type, not the static type. 即使用户定义了 `type MyInt int` 通过反射能拿到的类型也是 `reflect.Int`

### To modify a reflection object, the value must be settable

```go
var x float64 = 3.4
v := reflect.ValueOf(x)
v.SetFloat(7.1) // Error: will panic.
```

并不是所有的 `reflect.Value` 都是可以赋值的，可以通过 `v.CanSet()` 来判断。

It is an error to call a Set method on a non-settable Value. But what is settability?

Settability is a bit like addressability, but stricter. It’s the property that a reflection object can modify the actual storage that was used to create the reflection object. Settability is determined by whether the reflection object holds the original item.

```go
var x float64 = 3.4
v := reflect.ValueOf(x)
```

we pass a copy of x to reflect.ValueOf, so the interface value created as the argument to reflect.ValueOf is a copy of x, not x itself. If we want to modify x by reflection, we must give the reflection library a pointer to the value we want to modify.

```go
var x float64 = 3.4
p := reflect.ValueOf(&x) // Note: take the address of x.
fmt.Println("type of p:", p.Type())
fmt.Println("settability of p:", p.CanSet())
```

The output so far is

```
type of p: *float64
settability of p: false
```

The reflection object p isn’t settable, but it’s not p we want to set, it’s (in effect) \*p. To get to what p points to, we call the Elem method of Value, which indirects through the pointer, and save the result in a reflection Value called v:

```go
v := p.Elem()
fmt.Println("settability of v:", v.CanSet())
```

```
settability of v: true
```

and since it represents x, we are finally able to use v.SetFloat to modify the value of x:

```go
v.SetFloat(7.1)
fmt.Println(v.Interface())
fmt.Println(x)
```

The output, as expected, is

```
7.1
7.1
```

Just keep in mind that reflection Values need the address of something in order to modify what they represent.

### Structs

这里是通过反射来分析一个结构体的例子。我们通过结构体的地址来创建 reflection object 因为我们希望后续可以进行修改。

```go
type T struct {
    A int
    B string
}
t := T{23, "skidoo"}
s := reflect.ValueOf(&t).Elem()
typeOfT := s.Type()
for i := 0; i < s.NumField(); i++ {
    f := s.Field(i)
    fmt.Printf("%d: %s %s = %v\n", i,
        typeOfT.Field(i).Name, f.Type(), f.Interface())
}
```

The output of this program is

```
0: A int = 23
1: B string = skidoo
```

Because s contains a settable reflection object, we can modify the fields of the structure.

```go
s.Field(0).SetInt(77)
s.Field(1).SetString("Sunset Strip")
fmt.Println("t is now", t)
```

And here’s the result:

```
t is now {77 Sunset Strip}
```

## example code

```go
// IsValidStructPtr returns error if param s is not a ptr to a struct or s is nil.
func IsValidStructPtr(s interface{}) (err error) {
	structPtrValue := reflect.ValueOf(s)
	if !structPtrValue.IsValid() {
		err = fmt.Errorf("invalid param, s must be a ptr of a struct")
		return
	}

	if structPtrValue.Kind() != reflect.Ptr {
		err = fmt.Errorf("invalid param, s must be a ptr")
		return
	}

	if structPtrValue.IsNil() {
		err = fmt.Errorf("invalid param, s is nil")
		return
	}
	return
}

// SetStringPtrEmptyIfNil sets the given fields in the given struct to empty string ptr if the field is nil.
func SetStringPtrEmptyIfNil(s interface{}, keys []string) (err error) {
	if err = IsValidStructPtr(s); err != nil {
		return
	}

	structValue := reflect.ValueOf(s).Elem()
	for _, key := range keys {
		fieldValue := structValue.FieldByName(key)
		if fieldValue.Kind() == reflect.Invalid {
			err = fmt.Errorf("%s.%s not found", structValue.Type().Name(), key)
			return
		}

		emptyStr := ""
		emptyStrValue := reflect.ValueOf(&emptyStr)
		if emptyStrValue.Type().AssignableTo(fieldValue.Type()) {
			if !fieldValue.IsNil() {
				continue
			}

			fieldValue.Set(emptyStrValue)
		} else {
			err = fmt.Errorf("%s.%s is not string ptr", structValue.Type().Name(), key)
			return
		}
	}
	return
}
```

`reflect.Value` 和 `reflect.Type` 的 `Method()` 方法在用法和目的上存在一些差异。
`reflect.Type` 的 `Method()` 用于获取类型的方法集中索引位置的方法。返回的 `reflect.Method` 只包含方法的静态属性，例如方法名称和方法签名。
`reflect.Value` 的 `Method()` 方法则用于获取类型实例的方法。返回的 `reflect.Value` 可以被调用。
