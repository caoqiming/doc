# awk

AWK 是一种处理文本文件的语言，是一个强大的文本分析工具

```bash
# 输出第二列包含 "th"，并打印第二列与第四列，~ 表示模式开始。// 中是模式
awk '$2 ~ /th/ {print $2,$4}' log.txt
# 计算文件大小
ls -l *.txt | awk '{sum+=$5} END {print sum}'
```
