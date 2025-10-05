# bin search

## c++

```cpp
#include <algorithm>
#include <vector>

std::vector<int> v = {10, 20, 30, 40, 50};
// 判断元素是否存在
bool found = std::binary_search(v.begin(), v.end(), 30); // found is true
// 查找第一个不小于给定值的元素
auto it_30 = std::lower_bound(v.begin(), v.end(), 30); // 指向40
// 查找第一个大于给定值的元素
auto it_30 = std::upper_bound(v.begin(), v.end(), 30); // 指向 40
// 查找一个范围，该范围包含所有与目标值等价的元素
auto range = std::equal_range(v.begin(), v.end(), 30);
// range.first 是 lower_bound 的结果
// range.second 是 upper_bound 的结果
```

## go

```go
// 判断元素是否存在
index := sort.SearchInts(nums, x)
// 查找第一个不小于给定值的元素
nums := []int{2, 5, 7, 8, 11, 12}
index := sort.SearchInts(nums, 8)  // index = 3 (索引 3 处是 8)
// 自定义规则，函数返回的bool值需满足，list的前半部分为false，后半部分为true，返回第一个true的索引
index := sort.Search(len(nums), func(i int) bool {
    return nums[i] >= 8 // 查找第一个 >= 8 的元素
})
```
