# 最长递增子序列 (Longest Increasing Subsequence,LIS)

```go
func getLongestIncreasingSequence(nums []int) []int {
	// length of longest increasing sequence end at nums[i]
	LIS := make([]int, len(nums))
	LIS[0] = 1
	// longest increasing sequence with length i end at least at dp[i]
	dp := make([]int, len(nums))
	dp[0] = nums[0]
	length := 1
	for i := 1; i < len(nums); i++ {
		if nums[i] > dp[length-1] {
			dp[length] = nums[i]
			length++
		} else {
			index := sort.Search(length, func(j int) bool {
				return dp[j] > nums[i]
			})
			if index == 0 || dp[index-1] < nums[i] {
				dp[index] = nums[i]
			}
		}
		LIS[i] = length
	}

	return LIS
}
```

> `dp[i]` 表示长度为 `i` 的递增子串至少的结束值。显然`dp[i]`是递增的。遍历 nums 对于一个新考虑的 `nums[i]` 可以用二分法找到第一个 `dp[j] > nums[i]` 的位置 j，将`dp[j]` 更新为 `nums[i]`
> 为什么是更新第一个 `dp[j] > nums[i]` 的位置？这是因为我们要找的递增子序列，也就是说 `nums[i]` 至少得比它所在的子序列的前一个更大。
> 这个的实际意义就是长度为 j 的子串如果在 i 的位置结束，它的结束值可以更小一点。这个 dp 的设计还是很难想到的。
