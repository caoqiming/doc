# exiftool

修改 pdf 文件元信息

```bash
AUTHOR="glimmer"
exiftool -overwrite_original -Creator="$AUTHOR" -Author="$AUTHOR"   xxx.pdf
```
