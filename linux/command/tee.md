# tee

tee 指令会从标准输入设备读取数据，将其内容输出到标准输出设备，同时保存成文件。

`-a` 参数，附加到既有文件的后面，而非覆盖它。

```bash
ls -l | tee -a out
```
