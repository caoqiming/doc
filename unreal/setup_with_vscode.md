# 设置编辑器为 vscode

1. Prefrences 里 general-source code 设置为 vscode 并 set as default
2. tools 里 generate vscode project
3. 按一下步骤手动修改 vscode 的设置，之后每次新增新类之后都要从 2 步骤重新弄一遍

修改 `.vscode/c_cpp_properties.json`，可以直接复制下面的代码替换。修改了 `compilerPath` 为 `/usr/bin/clang++` 并修改了 `includePath`

> include path 好像不改也不碍事，因为最后都是解析的 compileCommands

```json
{
  "configurations": [
    {
      "name": "AnimationAssignment2Editor Editor Mac Development (AnimationAssignment2)",
      "compilerPath": "/usr/bin/clang++",
      "compilerArgs": [
        "-isysroot",
        "/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk"
      ],
      "macFrameworkPath": [
        "/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk/System/Library/Frameworks"
      ],
      "cStandard": "c17",
      "cppStandard": "c++20",
      "intelliSenseMode": "clang-x64",
      "compileCommands": [
        "/Users/glimmer/Documents/Unreal Projects/AnimationAssignment2/.vscode/compileCommands_AnimationAssignment2.json"
      ],
      "includePath": [
        "${workspaceFolder}/Intermediate/**",
        // "${workspaceFolder}/Plugins/**",
        "${workspaceFolder}/Source/**"
      ]
    }
  ],
  "version": 4
}
```

将 `compileCommands_AnimationAssignment2.json`(这个文件名后半部分是项目名称) 里的所有 `/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/clang++` 替换为 `/usr/bin/clang++`
这么做的原因是 Xcode toolchain 里的裸 clang++，它默认不会带上 macOS SDK 的 C++ 头路径。

> 一个 Xcode 可以同时支持 macOS, iOS, watchOS 和 tvOS。如果 clang++ 默认带上 macOS 的头文件路径，那么当你尝试编译 iOS 程序时，就会发生严重的头文件冲突。当你调用 /usr/bin/clang++ 时，你实际上运行的是一个 Shim（垫片程序）。它会自动检测当前的活跃 Xcode 路径（通过 xcode-select 指定），并自动寻找默认的 macOS SDK 路径。

调试的时候选择 `luanch xxx editor(development)`

调试选项：
Development (Editor) 部分优化。为了保证编辑器运行流畅，牺牲了一部分调试精确度。经常会出现“Variable is optimized away”或行号对不上的情况。

Debug Game (Editor) 较慢，但断点精准，变量值不会因为优化而“消失”。

一般不用 Debug 选项，除非要调试 UE 本身的代码
