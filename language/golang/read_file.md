# 读取文件

## 读取整个文件

```go
content, err := os.ReadFile("file.txt")
if err != nil {
    log.Fatal(err)
}
fmt.Println(string(content))
```

## 遍历路径下的文件

```go
package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
)

func visit(files *[]string) filepath.WalkFunc {
	return func(path string, info os.FileInfo, err error) error {
		if err != nil {
			log.Fatal(err)
		}
		if info.IsDir() {
			return nil
		}
		*files = append(*files, path)
		return nil
	}
}

func main() {
	var files []string

	root := "xxx"
	err := filepath.Walk(root, visit(&files))
	if err != nil {
		panic(err)
	}
	for _, file := range files {
		fmt.Println(file)
	}
}
```

## 创建路径

```go
err := os.MkdirAll(path.Dir(filePath), 0750) // rwx r-x ---
if err != nil {
    log.Fatal("fail to mkdir", err)
}
```
