# template

~~TODO:fix me, 这个页面渲染有问题，直接看 md 吧~~

Go 语言内置了 text/template 和 html/template 两个模板库，专门用于处理网页 html 模板

## 最简单的例子

./demo.tpl

```text
{{define "demo"}}
昵称： {{.Name}},
{{- if .IsWin}}
恭喜，大吉大利，今晚吃鸡！
{{- else}}
遗憾，鸡被吃光了！
{{- end}}
{{- end}}
```

```go
package main

import (
	"log"
	"os"
	"text/template"
)

type GameStatus struct {
	Name  string
	IsWin bool
}

func main() {
	var userStatus = []GameStatus{
		{"大春", true},
		{"NiuBee", false},
		{"球球", true},
	}

	t := template.Must(template.ParseGlob("./*.tpl"))
	for _, u := range userStatus {
		//根据参数u, 渲染命名为demo的模板，并且将渲染结果打印到标准输出
		err := t.ExecuteTemplate(os.Stdout, "demo", u)
		if err != nil {
			log.Println("executing template:", err)
		}
	}
}
```

输出结果

```text
昵称： 大春,
恭喜，大吉大利，今晚吃鸡！
昵称： NiuBee,
遗憾，鸡被吃光了！
昵称： 球球,
恭喜，大吉大利，今晚吃鸡！
```

## 基础语法

- 删除空格
  在左边增加减号和空格，表示删除左边空格： `{{- 模板表达式 }}`
  在右边增加空格和减号，表示删除右边空格： `{{ 模板表达式 -}}`
  删除表达式左右两边空格的写法： `{{- 模板表达式 -}}`

- 参数
  模版参数为 int/bool/string 类型，可以直接用点`.`引用即可
  如果要传入多个模版参数，一般都使用 map 或者 struct 类型
  引用语法格式: `{{.字段名}}`
  嵌套的 struct 或者 map 类型引用语法格式: `{{.字段名1.字段名2}}`

- 模版变量
  在模版中也可以自定义变量，语法如下

  ```
  定义变量
  $title := "标题"

  为变量赋值, 第二次为变量赋值，不需要冒号:
  $title = "新标题"

  引用变量
  {{$title}}
  ```

- if

  ```text
  {{if 表达式}} T1 {{end}}
  {{if 表达式}} T1 {{else}} T0 {{end}}
  {{if 表达式1}} T1 {{else if 表达式2}} T0 {{end}}
  ```

- range

  ```text
  {{range 数组引用}}
  {{.}} - 在range循环中，(点 .) 引用的是数组元素，而不是模版参数。
  {{end}}
  ```

  > 提示：在 range 循环中，改变了 (点 . ) 的作用，(点 . )引用的是当前的数组元素。

  ```text
  {{range $index, $element := 数组或者map的引用}}
  索引: {{$index}}
  元素值: {{$element}}
  {{end}}
  ```

- with

```text
{{with struct类型对象}}
{{.字段}}
{{end}}
```

> 在 with 语句中，点( . ) 代表的是对 with 引用的 struct 对象，而不是模版参数。

## 函数

直接上例子

- len
  `数组大小: {{len .}}`

- printf
  用法跟 fmt.Sprintf 函数一样
  `{{printf "%d - %s" 100 "www.tizi365.com"}}`
  `100 - www.tizi365.com`

- pipeline
  跟 bash 里很像，将多个函数调用或者值串起来，从左往右执行，左边执行的结果会传递给右边，形成一个任务流水。
  `command1 | command2 | command3 ... `

### 自定义模板函数

```go
// 第一步，我们先创建FuncMap, 然后注册我们要定义的函数
// FuncMap是一个map类型
funcMap := template.FuncMap{
    // "toupper" 就是我们在模板中可以调用的函数名,
    //  strings.ToUpper就是我们要注册的函数，
    // 他的作用是将小写字母转成大写字母，这里我们直接将golang自带的函数注入进去。
    // 当然你也可以自己写一个函数
    "toupper": strings.ToUpper,
}

// 这里定义个模板代码
const templateText = `
自定义函数调用例子：{{"abcdef" | toupper}}
`

// 创建一个template对象，模板名字为test,
// 然后调用Funcs注册我们定义的模板函数，
// 然后调用Parse加载templateText模板代码。
tmpl, err := template.New("test").Funcs(funcMap).Parse(templateText)
if err != nil {
    log.Fatalf("解析模板失败: %s", err)
}

// 渲染模板
err = tmpl.Execute(os.Stdout, "")
if err != nil {
    log.Fatalf("渲染模板失败: %s", err)
}
```

## 子模板

定义子模板

```text
{{define "子模板名字"}}
模板内容
{{end}}
```

调用子模板

```text
{{template "子模板名字" 参数}}
```

例子

```go
//模板代码
//这里定义了T1 T2 T3三个模板，T3调用了T1和T2的模板内容，最后我们调用T3模板内容
const templateText = `{{define "T1"}}ONE{{end}}
{{define "T2"}}TWO{{end}}
{{define "T3"}}{{template "T1"}} {{template "T2"}}{{end}}
{{template "T3"}}`


// 创建一个template对象，模板名字为test，然后调用Parse加载templateText模板代码。
tmpl, err := template.New("test").Parse(templateText)
if err != nil {
    log.Fatalf("解析模板失败: %s", err)
}

// 渲染模板
err = tmpl.Execute(os.Stdout, "")
if err != nil {
	log.Fatalf("渲染模板失败: %s", err)
}
```

输出

```text
ONE TWO
```
