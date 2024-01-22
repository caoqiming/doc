# test

## test 命令

```bash
go test -v -count=1 -run {测试函数名字}
```

## 参数

- -failfast 第一次测试失败后，不要再开始新的测试
- -run regexp 只运行那些与正则表达式相匹配的测试和示例
- -v Verbose 输出：在测试运行时记录所有测试。即使测试成功，也会打印所有来自 Log 和 Logf 调用的文本
- -count=1 禁用缓存

## mockgen

用于生成接口的 mock 的实现

```bash
mockgen -source=./client.go -destination=./mock/client.go -package mock_client
```

例子

```go
func Gen(t *testing.T) *MockClient {
	ctrl := gomock.NewController(t)
	m := NewMockClient(ctrl)
	m.EXPECT().Send(gomock.Any(), gomock.Any()).AnyTimes().Return(nil)
	m.EXPECT().SetAuth(gomock.Any(), gomock.Any()).AnyTimes().Return()
	return m
}
```
