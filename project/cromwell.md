# cromwell

Cromwell is a Workflow Management System geared towards scientific workflows.

## modes

run 模式运行一个工作流，一般用于调试

```bash
java -jar cromwell-[version].jar run myWorkflow.wdl
```

server 模式，可以同时运行多个工作流，默认开启 localhost:8000

```bash
java -jar cromwell-[version].jar server
```

By default, you can find all generated files (outputs and logs) in this folder:
`xx/cromwell-execetions/{workflow name}/{hash code id}/call-{task name}`

## Language Support

支持 WDL 1.0 和 WDL draft-2，未来可能支持 WDL development
[WDL 相关介绍](../language/WDL.md)
