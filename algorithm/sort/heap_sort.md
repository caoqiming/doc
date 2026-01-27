# heap sort

The time and space complexity for **Heapsort** are:

- **Time Complexity:** $O(n \log n)$
- **Space Complexity:** $O(1)$ (In-place sort)

```go
func Swap(nums []int, i, j int) {
	nums[i], nums[j] = nums[j], nums[i]
}

// Max heap
func Heapify(nums []int, i, l int) {
	left := 2*i + 1
	right := 2*i + 2
	biggest := i
	if left < l && nums[biggest] < nums[left] {
		biggest = left
	}
	if right < l && nums[biggest] < nums[right] {
		biggest = right
	}
	if biggest != i {
		Swap(nums, i, biggest)
		// 这里的 biggest i 的某个叶子节点，现在 i 上的元素和这个节点的位置交换了。
		// 需要继续判断被换下来的元素是否需要继续下沉。
		Heapify(nums, biggest, l)
	}
}

func MakeMaxHeap(nums []int) {
	l := len(nums)
	for i := l / 2; i >= 0; i-- {
		Heapify(nums, i, l)
	}
}

func FindKthLargest(nums []int, k int) int {
	MakeMaxHeap(nums)
	l := len(nums)
	for i := 0; i < k-1; i++ {
		j := l - 1 - i
		Swap(nums, 0, j)
		Heapify(nums, 0, j)
	}
	return nums[0]
}
```

> 以大顶堆为例，把堆排序想象成，将节点与最大的叶子节点交换，使得小的元素一直下沉。从第一个非叶子节点一直遍历到跟节点就完成了堆的构建。排序时将根节点与最后一个元素交换，再维护一下堆。这样可以获得前 k 个最大的元素。这样排序的结果是由小到大。

## 使用标准库

```go
package main

import (
	"container/heap"
	"fmt"
)

// 1. 定义一个类型
type IntHeap []int

// 2. 实现 sort.Interface (Len, Less, Swap)
func (h IntHeap) Len() int           { return len(h) }
func (h IntHeap) Less(i, j int) bool { return h[i] < h[j] } // 小根堆
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

// 3. 实现 heap.Interface 需要的 Push 和 Pop
func (h *IntHeap) Push(x interface{}) {
	*h = append(*h, x.(int))
}

func (h *IntHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

func main() {
	nums := &IntHeap{3, 1, 4, 1, 5, 9, 2}

	// 堆化 (Heapify)
	heap.Init(nums)

	// 依次 Pop 出来的就是有序序列
	fmt.Print("排序结果: ")
	for nums.Len() > 0 {
		fmt.Printf("%d ", heap.Pop(nums))
	}
}
```
