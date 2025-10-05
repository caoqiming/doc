# radix sort

The time complexity of **Radix Sort** is typically given as $\mathcal{O}(d \cdot (n+b))$, which is often simplified to $\mathcal{O}(k \cdot n)$ or even $\mathcal{O}(n)$ under specific assumptions.

| Factor                      | Description                                                                                                 | Symbol in Formula |
| :-------------------------- | :---------------------------------------------------------------------------------------------------------- | :---------------- |
| **Number of Elements**      | The total number of items to be sorted.                                                                     | $n$               |
| **Number of Digits/Passes** | The maximum number of digits (or length) of the longest item.                                               | $d$ or $k$        |
| **Base/Radix**              | The base of the number system (e.g., 10 for decimal), or the number of "buckets" used by the counting sort. | $b$               |

It is stable.

## go

```go
type IntLike interface {
	GetDigit(n int) int
}

// 需要按顺序调用，radix依次为1,2,3...
func RadixSortOneRound(nums []IntLike, radix int) {
	count := make([]int, 10)
	for _, n := range nums {
		count[n.GetDigit(radix)]++
	}
	// 计算前缀和之后 count[i]就是数字 i 的 bucket 最右侧的 index
	for i := 1; i < 10; i++ {
		count[i] += count[i-1]
	}
	temp := make([]IntLike, len(nums))
	// 保持排序稳定性，从后向前遍历。因为 count[i] 记录的是最右侧的索引。我们放元素的顺序也是从右向左
	for i := len(nums) - 1; i >= 0; i-- {
		n := nums[i].GetDigit(radix)
		temp[count[n]-1] = nums[i]
		count[n]-- // 移动bucket的右侧指针
	}
	copy(nums, temp)
}
```
