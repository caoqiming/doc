# sad story

这里记录一些在 UE 里遇到的坑

## vscode

因为 xcode 不能点击跳转，改用 vscode，~~折腾环境真心累~~

1. UE 无法生成 vsocode 项目，这个需要把 UE 的默认编辑器设置为 vscode 才行，只改成 vscode 是没用的，必须再点一下保存为默认设置才行。这个办法还是我自己试出来的
2. 按官网的教程正在`.vscode/c_cpp_properties.json`里添加了

   ```json
       "includePath": [
           "${workspaceFolder}/Intermediate/**",
           "${workspaceFolder}/Plugins/**",
           "${workspaceFolder}/Source/**",
           "/Users/Shared/Epic Games/UE_5.5/Engine/Source/Runtime/Core/Public/**"
       ],
   ```

   代码点击是能跳转的，但是会有红色波浪线的各种报错，编译也是可以编译的。暂时没找到解决方案，干脆在 vscode 里把 `C_Cpp: Error Squiggles` 禁用了，先苟着吧，又不是不能用。

3. 最后把 c++ 的插件的设置 `C/C++ Edit Configurations(UI)` 里设置编译器路径（cmd+p 然后输入 c/c++ 能搜索到），从 xcode 的 clang++ 修改为 `/usr/bin/clang++`
4. 如何调试 cpp 参考这个[视频](https://www.youtube.com/watch?v=YsqU1-hQdQo&ab_channel=SidaLiu) 虽然是 windows 的，但 mac 也差不多，可惜没早点看见。
5. 指针没有初始化为 NULL ，我以为编译器会自动初始化为 NULL ，看起来并没有
6. ~~苹果的 Tagged Pointer~~
7. 打包之后 wakuwaku 不播放，是因为选择了 cook，因为这个东西是代码播放的，UE 以为没用，就没打包进去。在项目设置里配置一下 `additional asset directories to cook` 就行了

8. 新增的 c++类有 include 报错，是因为需要重新在 tools 选项里 refresh vscode project 重新生成的 `.vscode/compileCommands_Default.json` 里就会包含新的 c++ 文件。如果还有问题就把 该文件里的 arguments 里的第一项改为 "/usr/bin/clang++" 不要用 xcode 的那个
