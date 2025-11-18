# helm

Helm is the package manager for Kubernetes. [Docs](https://helm.sh/docs/)

Helm 用 [Go templates](../golang/templete) 来模版化处理资源文件，并在 go 内置的基础上添加了 Sprig library 中的一些函数，以及 include 和 required

- include
  The include function allows you to bring in another template, and then pass the results to other template functions.
- required
  用于检测指定的字段是否存在，下面的例子检测`.Values.who`是否存在，不存在则报错
  `value: {{ required "A valid .Values.who entry required!" .Values.who }}`
- tpl
  The tpl function allows developers to evaluate strings as templates inside a template.
  `{{ tpl .Values.template . }}`

其他函数参见[官网](https://helm.sh/docs/chart_template_guide/function_list/)

## Built-in Objects

We can use `{{ .Release.Name }}` to insert the name of a release into a template. Release is one of the top-level objects that you can access in your templates.

- `Release`: This object describes the release itself. It has several objects inside of it:
  - `Release.Name`: The release name
  - `Release.Namespace`: The namespace to be released into (if the manifest doesn’t override)
  - `Release.IsUpgrade`: This is set to true if the current operation is an upgrade or rollback.
  - `Release.IsInstall`: This is set to true if the current operation is an install.
  - `Release.Revision`: The revision number for this release. On install, this is 1, and it is incremented with each upgrade and rollback.
  - `Release.Service`: The service that is rendering the present template. On Helm, this is always Helm.
- `Values`: Values passed into the template from the values.yaml file and from user-supplied files. By default, Values is empty.
- `Chart`: The contents of the Chart.yaml file. Any data in Chart.yaml will be accessible here. For example `{{ .Chart.Name }}-{{ .Chart.Version }}`
- `Subcharts`: This provides access to the scope (.Values, .Charts, .Releases etc.) of subcharts to the parent. For example `.Subcharts.mySubChart.myValue` to access the myValue in the mySubChart chart.
- `Files`: This provides access to all non-special files in a chart. While you cannot use it to access templates, you can use it to access other files in the chart. See the section Accessing Files for more.
  - `Files.Get` is a function for getting a file by name (.Files.Get config.ini)
  - `Files.GetBytes` is a function for getting the contents of a file as an array of bytes instead of as a string. This is useful for things like images.
  - `Files.Glob` is a function that returns a list of files whose names match the given shell glob pattern.
  - `Files.Lines` is a function that reads a file line-by-line. This is useful for iterating over each line in a file.
  - `Files.AsSecrets` is a function that returns the file bodies as Base 64 encoded strings.
  - `Files.AsConfig` is a function that returns file bodies as a YAML map.
- `Capabilities`: This provides information about what capabilities the Kubernetes cluster supports.
- `Template`: Contains information about the current template that is being executed
  - `Template.Name`: A namespaced file path to the current template
  - `Template.BasePath`: The namespaced path to the templates directory of the current chart

### Values Files

Values 包括

- The values.yaml file in the chart
- If this is a subchart, the values.yaml file of a parent chart
- A values file if passed into helm install or helm upgrade with the -f flag (helm install -f myvals.yaml ./mychart)
- Individual parameters passed with --set (such as helm install --set foo=bar ./mychart)

优先级依次递增。
如果要删除某一个设置，可以将其设置为 null ，如`--set livenessProbe.httpGet=null`

## Template Functions and Pipelines

Helm has over 60 available functions. Some of them are defined by the Go template language itself. Most of the others are part of the Sprig template library.

举几个简单的例子

```
{{ .Values.favorite.food | upper | quote }}
```

`quote`给字符串添加引号，`upper`转化为大写

```
drink: {{ .Values.favorite.drink | default "tea" | quote }}
```

`default`设置默认值

```
{{ range $index, $service := (lookup "v1" "Service" "mynamespace" "").items }}
    {{/* do something with each service */}}
{{ end }}
```

The lookup function can be used to look up resources in a running cluster. The synopsis of the lookup function is `lookup apiVersion, kind, namespace, name -> resource or resource list`.

## Flow Control

```
{{ if PIPELINE }}
  # Do something
{{ else if OTHER PIPELINE }}
  # Do something else
{{ else }}
  # Default case
{{ end }}
```

Notice that we're now talking about pipelines instead of values. The reason for this is to make it clear that control structures can execute an entire pipeline, not just evaluate a value.

需要特别注意空格和换行
When the template engine runs, it **removes** the contents inside of `{{` and `}}`, but it leaves the remaining whitespace exactly as is.

```
data:
  myvalue: "Hello World"
  drink: {{ .Values.favorite.drink | default "tea" | quote }}
  food: {{ .Values.favorite.food | upper | quote }}
  {{- if eq .Values.favorite.drink "coffee" }}
  mug: "true"
  {{- end }}
```

可以利用`-`来移除多余的空白（换行属于空白）。

> Make sure there is a space between the - and the rest of your directive. {{- 3 }} means "trim left whitespace and print 3" while {{-3 }} means "print -3".

```
{{ with PIPELINE }}
  # restricted scope
{{ end }}
```

with can allow you to set the current scope (`.`) to a particular object.
