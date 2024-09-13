# sed

stream editor(sed) 主要用来自动编辑一个或多个文件、简化对文件的反复操作、编写转换程序等。
详细信息可以查看`man sed`

```bash
sed [-hnV][-e<script>][-f<script文件>][文本文件]
sed 's/要被取代的字串/新的字串/g'
```

例子

替换

```bash
sed -e 's/POD_NAME/'${POD_NAME}'/g' \
    -e 's/POD_UID/'${POD_UID}'/g' \
    ingress_template.yaml >tmp/${POD_NAME}.yaml
```

截取内容的前 22 个字符，最后的\1 表示第一个捕获组的内容，即前面`(.{22})`的内容，跟 vscode 的查询替换的逻辑一样的。

```bash
job=$(echo "$pod" | sed 's/^\(.\{22\}\).*/\1/')
```

## 参数说明

- -e 以选项中指定的 script 来处理输入的文本文件。可以有多个。
- -f 以选项中指定的 script 文件来处理输入的文本文件。
- -h 或--help 显示帮助。
- -n 或--quiet 或--silent 仅显示 script 处理后的结果。
- -V 或--version 显示版本信息。

## 动作说明

- a ：新增， a 的后面可以接字串，而这些字串会在新的一行出现(目前的下一行)
- c ：取代， c 的后面可以接字串，这些字串可以取代 n1,n2 之间的行！
- d ：删除
- i ：插入， i 的后面可以接字串，而这些字串会在新的一行出现(目前的上一行)；
- p ：打印，亦即将某个选择的数据印出。通常 p 会与参数 sed -n 一起用
- s ：取代
