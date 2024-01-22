# test

```bash
go test -v -count=1 -run {测试函数名字}
```

### 参数

- -failfast 第一次测试失败后，不要再开始新的测试
- -run regexp 只运行那些与正则表达式相匹配的测试和示例
- -v Verbose 输出：在测试运行时记录所有测试。即使测试成功，也会打印所有来自 Log 和 Logf 调用的文本
- -count=1 禁用缓存
