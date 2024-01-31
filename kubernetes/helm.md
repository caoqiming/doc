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
