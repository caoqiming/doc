# Environment Variables

登录 linux 时执行的顺序为
`/etc/profile` -> (`~/.bash_profile` | `~/.bash_login` | `~/.profile`) -> `~/.bashrc` -> `/etc/bashrc` -> `~/.bash_logout`

如果是 zsh 会执行`~/.zshrc`

## PATH

```bash
export PATH=$JAVA_HOME/bin:$PATH
```

一般将需要添加的 path 放在前面，因为前面的优先级更高

## 不同进程的环境变量

在 Unix/Linux 系统中，子进程会继承父进程的环境变量。但是，子进程可以通过调用 setenv 或 putenv 等函数来修改自己的环境变量，而不会影响父进程或其他子进程的环境变量。
要查看一个进程的环境变量

```bash
cat /proc/{PID}/environ | tr '\0' '\n'
```

这个文件的分割符是`\0`，因此这里将其替换为换行方便查看
这里的环境变量是这个进程初始的环境变量，想要获取当前的环境变量需要`ptrace`系统调用

## 常用环境变量

~~备份一下，这个丢了就很费劲~~

`code ~/.zshrc`

```bash
source /Users/glimmer/.gvm/scripts/gvm
eval "$(/opt/homebrew/bin/brew shellenv)"
export GOPROXY=https://goproxy.cn
export PATH=/Users/glimmer/bin:$PATH
export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"
```

`~/.zprofile` 里也有一部分
