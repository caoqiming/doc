# range

golang 中，在遍历一个 slice 时，`for _, one := range array` 中的 `one` 并不是其中的元素本身，而是其拷贝。

举个例子

```go
type A struct {
	Number int
}

func main() {
	array := []A{
		{Number: 1},
		{Number: 2},
		{Number: 3},
	}
	ret := make([]*int, 0)
	for _, one := range array {
		fmt.Printf("%p\n", &one)
		ret = append(ret, &one.Number)
	}

	for i := range array {
		fmt.Printf("%p\n", &array[i])
	}

	for _, one := range ret {
		fmt.Println(*one)
	}
}
```

打印出的 `one` 的地址三次都是相同的，通过 `&array[i]` 获取的地址才是不同的，是元素真实的地址。
最后 `ret` 的结果都是 3，因为他们都指向同一个局部变量 one.Number 的地址。

- 把 `[]A` 替换为 `[]*A` 之后 ret 的结果就是 1,2,3 了。因为此时one是指针，one.Number 就是实际元素指向的 Number 字段的地址。

map 也同理

```go
func main() {
	m := map[int]int{
		1: 1,
		2: 2,
		3: 3,
	}

	for _, v := range m {
		v += 1
	}

	for k, v := range m {
		fmt.Println("k:", k, "v:", v)
	}
}

```

最终 `m` 并没有被改变，想要修改 map 需要直接用索引去修改

```go
	for k := range m {
		m[k] += 1
	}
```
