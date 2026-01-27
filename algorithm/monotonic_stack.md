# 单调栈

以单调递增栈 (Monotonic Increasing Stack)为例，维护一个单调递增栈，每当新来的元素比栈顶要小时，持续弹出栈顶，直到最新元素比栈顶要大。在弹出的过程中进行一些处理。

应用场景，下一个更大的元素，柱状图中最大的矩形，接雨水，每日温度。

柱状图中最大的矩形代码

```go
func largestRectangleArea(heights []int) int {
	heights = append(heights, 0)
	mono_stack := []int{-1}

	peek := func() int {
		return mono_stack[len(mono_stack)-1]
	}
	pop := func() int {
		ans := peek()
		mono_stack = mono_stack[:len(mono_stack)-1]
		return ans
	}

	max_area := 0

	for i := range heights {
		if peek() == -1 {
			mono_stack = append(mono_stack, i)
			continue
		}

		if heights[i] > heights[peek()] {
			mono_stack = append(mono_stack, i)
			continue
		} else if heights[i] == heights[peek()] {
			continue
		} else {
			for peek() != -1 && heights[i] < heights[peek()] {
				p := pop()
				area := heights[p] * (i - peek() - 1)
				max_area = max(max_area, area)
			}
			mono_stack = append(mono_stack, i)
		}
	}

	return max_area
}

```
