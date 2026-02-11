# F算法

计算图中任意两点之间的最短路径
核心思想是用三层遍历，从 i 到 k 到 j 如果比直接从 i 到 j cost更低则更新 i 到 j 的 cost

```go
func floyd(adjacency [][]int) [][]int {
	n := len(adjacency)
	for k := 0; k < n; k++ {
		for i := 0; i < n; i++ {
			for j := 0; j < n; j++ {
				if adjacency[i][k] != math.MaxInt && adjacency[k][j] != math.MaxInt &&
					adjacency[i][k]+adjacency[k][j] < adjacency[i][j] {
					adjacency[i][j] = adjacency[i][k] + adjacency[k][j]
				}
			}
		}
	}
	return adjacency
}
```
