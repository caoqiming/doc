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

用 vscode 运行 golang 单测默认会开启缓存，非常坑。添加以下设置来关闭

```text
"go.testFlags": ["-count=1"]
```

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

## Ginkgo

Ginkgo 是基于 BBD-Style 的 golang 测试框架

- TDD: Test-Driven Development
  在正式编写需求功能的代码之前，先编写单元测试代码，再编写需求功能代码满足这些单元测试代码。测试粒度很细，一般是对类，函数编写的单元测试。其好处是保证了函数和类级别的可测试性和可维护性，开发人员可以时常重构和优化代码而不必担心无意中引入其他问题。
- BDD: Behavior-Driven Development
  BDD 的核心是开发人员，QA，PD，非技术人员和用户都可以参与到项目的开发中。BDD 强调从用户的需求出发，最终的系统和用户的需求一致。提倡使用简单明了的自然语言描述系统行为，例如使用"在...场景，当进行...动作，将会..."的句式。

Gomega 是 Ginkgo 官方推荐的断言匹配库，可以被其他断言库替代，如 testify，gocheck
通常 Ginkgo 的编写需要三个基本部分，完成 BDD "在...场景，当进行...动作，将会..."
相关术语

1. Describe: 描述场景， 在...场景
2. Context：描述动作，当进行...动作
3. It：校验判断，将会...
4. suite：测试套，一组用例的集合，Ginkgo 从 suite 入口对用例库进行测试
5. spec：单个测试用例，包含在 It 中

### Ginkgo 使用

cd 到 package 所在路径，然后`ginkgo bootstrap`，会在当前路径下自动生成`xxx_suite_test.go`文件。
运行`ginkgo generate mljob_syncer`，就可以为`mljob_syncer.go`生产一个测试文件`mljob_syncer_test.go`

```go
var _ = Describe("Books", func() {
  var foxInSocks, lesMis *books.Book

  BeforeEach(func() {
    lesMis = &books.Book{
      Title:  "Les Miserables",
      Author: "Victor Hugo",
      Pages:  2783,
    }

    foxInSocks = &books.Book{
      Title:  "Fox In Socks",
      Author: "Dr. Seuss",
      Pages:  24,
    }
  })

  Describe("Categorizing books", func() {
    Context("with more than 300 pages", func() {
      It("should be a novel", func() {
        Expect(lesMis.Category()).To(Equal(books.CategoryNovel))
      })
    })

    Context("with fewer than 300 pages", func() {
      It("should be a short story", func() {
        Expect(foxInSocks.Category()).To(Equal(books.CategoryShortStory))
      })
    })
  })
})
```

用容器节点，如`Describe`、`Context`和`When`来组织不同层次的测试，这三者功能完全一样，他们只是名字不同，为了帮助理解测试用的。
用设置节点，如`BeforeEach`来为测试初始化状态
用主题节点，如`It`来进行一些断言
