# interface

在 Golang 中，接口的作用其实是定义了一种约定或者协议，也就是定义了一些方法的集合。任何实现了这些方法的类型，都可以说实现了这个接口。这是 Golang 接口的动态类型特性。
在 Golang 中，并没有直接的方式来通过接口对外屏蔽（隐藏）某个类型的某些方法。如果一个类型实现了一个接口，那么这个类型的所有方法都会被暴露出来，不论这个接口包含了哪些方法。

不过，如果你想对一个类型的某些方法进行封装或者隐藏，需要采取一些其他的方式。创建一个新的类型，这个新类型包含你要隐藏方法的现有类型。然后新类型只对外提供需要的方法。

```go
package main

import (
	"fmt"
	"reflect"
)

type Duck interface {
	Speak()
}

type Person struct {
}

func (p *Person) Speak() {
	fmt.Println("gagaga")
}

func (p *Person) Walk() {
	fmt.Println("walk")
}

type BlackPerson struct {
	P Person
}

func (b *BlackPerson) Speak() {
	b.P.Speak()
}

func main() {
	p := &BlackPerson{Person{}}

	CanDuckWalk(p)

}

func CanDuckWalk(i Duck) {
	t := reflect.TypeOf(i)

	// 查看有哪些方法
	for j := 0; j < t.NumMethod(); j++ {
		fmt.Println(t.Method(j).Name)
	}
	// 查看有哪些数据
	v := reflect.ValueOf(i).Elem() // 因为传入的是指针，所以需要用Elem()来取值, v 是 BlackPerson
	personV := v.Field(0).Addr()   // 因为方法是绑定到*Person上的，所以要用Addr()来获取指针
	fmt.Println(personV.Type())
	fmt.Println(personV.NumMethod())
	for j := 0; j < personV.NumMethod(); j++ {
		personV.Method(j).Call(nil)
	}
}

```

在这个例子里，如果将 BlackPerson 的 Person 改为私有字段，则在外部无法用反射调用`Walk()`方法，但仍然是可以看到该方法的

```go
type BlackPerson struct {
	p Person
}
```
