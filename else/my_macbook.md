# my mac book

这里记录我的 macbook 上的一些信息
~~这或许不应该放在公开的笔记里，但存在这里最方便~~
**记得别存敏感信息**

## android

SDK Folder: /Users/glimmer/Library/Android/sdk
/Users/glimmer/Library/Android/sdk/build-tools/34.0.0

## UE

"/Users/Shared/Epic Games/UE_5.5/Engine"
UE 自动安装 android ndk

```txt
Added /Users/glimmer/Library/Android/sdk/platform-tools:/Users/glimmer/Library/Android/sdk/build-tools/34.0.0:/Users/glimmer/Library/Android/sdk/tools/bin to PATH in /Users/glimmer/.bash_profile
grep: /Users/glimmer/.zprofile: No such file or directory
Added /Users/glimmer/Library/Android/sdk/platform-tools:/Users/glimmer/Library/Android/sdk/build-tools/34.0.0:/Users/glimmer/Library/Android/sdk/tools/bin to PATH in /Users/glimmer/.zprofile
Adding UE Android dev env variables to .zprofile
```

`~/.zprofile` 的具体内容

```bash
export ANDROID_HOME="/Users/glimmer/Library/Android/sdk"

export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"

export PATH="$PATH:/Users/glimmer/Library/Android/sdk/platform-tools:/Users/glimmer/Library/Android/sdk/build-tools/34.0.0:/Users/glimmer/Library/Android/sdk/tools/bin"

export NDKROOT="/Users/glimmer/Library/Android/sdk/ndk/25.1.8937393"
export NDK_ROOT="/Users/glimmer/Library/Android/sdk/ndk/25.1.8937393"
```

> zsh 会 自动执行这个文件 `～/.zprofile`
