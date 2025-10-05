## reverse

```go
// ReverseSlice 接收任何类型的切片，并原地反转它。
// T 是一种类型参数，用于表示切片中的元素类型。
func ReverseSlice[T any](s []T) {
    // 使用双指针 i 和 j，从两端向中间遍历
    for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
        // 交换 s[i] 和 s[j]
        s[i], s[j] = s[j], s[i]
    }
}
```
