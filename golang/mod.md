# mod

golang 提供了 go mod 命令来管理包。

- download: download modules to local cache
- edit: edit go.mod from tools or scripts
- graph: print module requirement graph
- init: initialize new module in current directory
- tidy: add missing and remove unused modules
- vendor: make vendored copy of dependencies
- verify: verify dependencies have expected content
- why: explain why packages or modules are needed

`go.mod`文件内有四个关键词

- `module` 语句指定包的名字（路径）
- `require` 语句指定的依赖项模块
- `replace` 语句可以替换依赖项模块
- `exclude` 语句可以忽略依赖项模块

## updating modules

`go get -u` 使用最新的 minor 版本或修补程序版本（即它将从 1.0.0 更新到例如 1.0.1，或者，如果可用，则更新为 1.1.0）
`go get -u=patch` 以使用最新的 修补程序 版本（即，将更新为 1.0.1 但不更新 为 1.1.0）
`go get package@version` 以更新到特定版本

## vendor

vendor 是较早的方法，用于将所有的依赖项都存储在项目的 vendor 文件夹中。这样，无论何时何地检出代码，都无需外部网络就可以构建项目。然而，使用 vendor 目录的一个缺点是你必须把整个 vendor 目录也放到版本控制系统中，这会使得项目变得非常大。
在使用 Go modules 时，并不需要 vendor 目录，因为依赖会被缓存在你的本地计算机上。但是，如果项目需要在没有网络连接的环境（如 Docker 构建）中进行构建，仍然可以选择使用 vendor 目录。在这种情况下，只需执行 go mod vendor 命令，Go 会将所有在 go.mod 中列出的依赖下载到 vendor 目录中。
