# 滚动哈希（Rolling hash）

滚动哈希（Rolling Hash），也叫作旋转哈希，是一种**高效计算数据子串哈希值**的算法。

### 什么是滚动哈希算法？

它的核心思想是：

1.  **定义一个固定大小的“窗口”**：这个窗口在数据流（如字符串）上滑动。
2.  **快速更新哈希值**：当窗口从位置 $i$ 移动到 $i+1$ 时，新窗口的哈希值不是从头计算的，而是通过以下三个步骤，**在常数时间 $O(1)$ 内**从旧哈希值推导出来：
    - **减去**窗口移出字符（最左边字符）的贡献。
    - **平移/调整**旧窗口剩余字符的贡献。
    - **加上**窗口移入字符（最右边字符）的贡献。

**优点**：对于长度为 $N$ 的文本和长度为 $M$ 的子串，计算所有子串的哈希值只需要 $O(N)$ 的时间，而不是传统的 $O(N \cdot M)$。

**最简单的实现原理**：通常使用**多项式哈希**（Polynomial Rolling Hash）。对于一个子串 $s[i \dots i+k-1]$，它的哈希值 $H$ 定义为：

$$H = (s[i] \cdot p^{k-1} + s[i+1] \cdot p^{k-2} + \dots + s[i+k-1] \cdot p^0) \pmod{m}$$

其中：

- $s[i]$ 是字符的数值（如 ASCII 值）。
- $p$ 是一个选定的素数基数。
- $m$ 是一个大的模数。

### Go 语言的最简单实现（多项式哈希）

下面是一个使用多项式哈希原理实现的简单 Go 语言滚动哈希结构：

```go
package main

import (
	"fmt"
	"math"
)

// RollingHash 结构体，用于存储滚动哈希的状态
type RollingHash struct {
	base     int       // 基数 p
	mod      int       // 模数 m
	windowSize int       // 窗口大小 k
	currentHash int    // 当前窗口的哈希值
	powM     int       // base^(windowSize-1) % mod，用于减去最左边字符的贡献
}

// NewRollingHash 初始化滚动哈希
func NewRollingHash(base, mod, windowSize int, initialData string) *RollingHash {
	rh := &RollingHash{
		base:     base,
		mod:      mod,
		windowSize: windowSize,
	}

	// 1. 计算 powM = base^(windowSize-1) % mod
	rh.powM = 1
	for i := 0; i < windowSize-1; i++ {
		rh.powM = (rh.powM * base) % mod
	}

	// 2. 计算初始窗口的哈希值
	if len(initialData) >= windowSize {
		rh.currentHash = rh.calculateHash(initialData[:windowSize])
	}

	return rh
}

// calculateHash 计算一个子串的完整哈希值（用于初始化）
func (rh *RollingHash) calculateHash(s string) int {
	h := 0
	for _, char := range s {
		h = (h*rh.base + int(char)) % rh.mod
	}
	return h
}

// Roll 执行滚动操作，将窗口向前移动一步
// 移除 leftChar，并添加 rightChar
func (rh *RollingHash) Roll(leftChar, rightChar byte) {
	// 1. 减去最左边字符的贡献 (s[i] * p^(k-1))
	// 注意：Go中 % 运算符在处理负数时可能产生负结果，所以需要额外的加法 (rh.mod) 来确保结果为正
	leftValue := (int(leftChar) * rh.powM) % rh.mod
	rh.currentHash = (rh.currentHash - leftValue + rh.mod) % rh.mod

	// 2. 平移：将剩余部分乘以基数 p
	rh.currentHash = (rh.currentHash * rh.base) % rh.mod

	// 3. 加上最右边字符的贡献 (s[i+k] * p^0)
	rh.currentHash = (rh.currentHash + int(rightChar)) % rh.mod
}

func main() {
	text := "abracadabra"
	windowSize := 5
	base := 31 // 常用基数
	mod := 1000000007 // 常用大质数模数

	if len(text) < windowSize {
		fmt.Println("文本太短")
		return
	}

	// 初始化滚动哈希
	rh := NewRollingHash(base, mod, windowSize, text)
	fmt.Printf("初始窗口: %s, Hash: %d\n", text[:windowSize], rh.currentHash)

	// 滚动遍历
	for i := 0; i < len(text) - windowSize; i++ {
		leftChar := text[i]
		rightChar := text[i+windowSize]

		rh.Roll(leftChar, rightChar)

		// 验证：新窗口的哈希值应该等于直接计算的哈希值
		expectedHash := rh.calculateHash(text[i+1 : i+1+windowSize])

		fmt.Printf("窗口移动到: %s, Rolling Hash: %d, Expected Hash: %d\n",
			text[i+1 : i+1+windowSize], rh.currentHash, expectedHash)
	}
}
```
