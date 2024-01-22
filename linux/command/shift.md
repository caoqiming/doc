# shift

shift 命令用于对参数的移动(左移)，通常用于在不知道传入参数个数的情况下依次遍历每个参数然后进行相应处理。

对于这样一个脚本，`test.sh`

```bash
#!/bin/bash
while [ $# != 0 ]
do
    echo "prama is $1,prama size is $#"
    shift
done
```

执行命令`bash ./test.sh a b c`，结果如下

```txt
prama is a,prama size is 3
prama is b,prama size is 2
prama is c,prama size is 1
```
