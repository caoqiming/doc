# sad story

这里记录一些在 UE 里遇到的坑

1. 指针没有初始化为 NULL ，我以为编译器会自动初始化为 NULL ，看起来并没有
2. ~~苹果的 Tagged Pointer~~
3. 打包之后 wakuwaku 不播放，是因为选择了 cook，因为这个东西是代码播放的，UE 以为没用，就没打包进去。在项目设置里配置一下 `additional asset directories to cook` 就行了
4. 新增的 c++类有 include 报错，是因为需要重新在 tools 选项里 refresh vscode project 重新生成的 `.vscode/compileCommands_Default.json` 里就会包含新的 c++ 文件。
5. 类里的 `GENERATED_BODY()` 报错不用管，在编辑器里动态编译一下就好了。但头文件顺序有讲究，`generated.h`要放在最后一个 `CoreMinimal.h` 要放在第一个
