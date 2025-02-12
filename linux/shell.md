# shell

设置 shell

```bash
chsh -s /bin/bash
chsh -s /bin/zsh
```

## sh

sh 的全称是 Bourne shell，由 AT&T 公司的 Steve Bourne 开发，为了纪念他，就用他的名字命名了。sh 是 UNIX 上的标准 shell，很多 UNIX 版本都配有 sh。sh 是第一个流行的 shell。

> The Bourne shell, sh, was a new Unix shell by Stephen Bourne at Bell Labs. Distributed as the shell for UNIX Version 7 in 1979.

## bash

bash 由 GNU 组织开发，保持了对 sh shell 的兼容性，是各种 Linux 发行版默认配置的 shell。bash 兼容 sh 意味着，针对 sh 编写的 shell 代码可以不加修改地在 bash 中运行。但他们的行为可能并不完全一致。

> The shell's name is an acronym for Bourne-Again SHell, a pun on the name of the Bourne shell that it replaces and the notion of being "born again". First released in 1989.

## zsh

Zsh 对 Bourne shell 做出了大量改进，同时加入了 Bash、ksh 及 tcsh 的某些功能。

> 保罗·弗斯塔德（Paul Falstad）于 1990 年在普林斯顿大学求学时编写了 Zsh 的初版。名称 zsh 源于耶鲁大学教授邵中（Zhong Shao，后转为普林斯顿大学教授）, 保罗将教授的用户名"zsh"作为此 Shell 的名称。

### oh-my-zsh

Oh My Zsh is a delightful, open source, community-driven framework for managing your Zsh configuration.

#### 安装

```bash
sudo apt install zsh
command -v zsh | sudo tee -a /etc/shells
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

> `sh -c` 命令，它可以让 bash 将一个字串作为完整的命令来执行，这样就可以将 sudo 的影响范围扩展到整条命令。

#### 插件

zsh 的设置在`~/.zshrc`

> 下载的插件放置`~/.oh-my-zsh/custom/plugins`目录下，然后在 plugins 后面追加插件名字即可

推荐插件

```
plugins=(
    git
    zsh-syntax-highlighting
    zsh-autosuggestions
    alias-finder
    rand-quote
    )
```

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting
```

- zsh-syntax-highlighting 可以识别的 shell 命令并高亮显示
- zsh-autosuggestions 自动补全插件，输入命令后会自动提示相关命令，使用方向键`→`可以实现自动补全
- alias-finder 当你引用或定义了很多别名时，但是你记不住，这个插件会提示你可以使用什么别名，这使得学习新别名更容易
- rand-quote 提供一条 quote 命令，显示随机名言，就图一乐。可以放在 zshrc 最后一行这样每次打开 shell 随机显示一条名言

修改之后

````bash
source ~/.zshrc
```

#### 使用

- 可以用`cd .....`向上 5 层
- 可以用`d`回车列出最近 5 个目录，然后用数字选择进入哪个目录
- 命令选项补全
- zsh 的历史记录在多个 terminal 是共享，可以用向上箭头来搜索
````

## bash 常用语法

### if

```bash
# 判断目录是否存在
if [ -d "$LOG_DIR" ]; then

fi

# 判断文件是否存在
if [ -f $a ]; then
  echo "$a exists and is a file"
fi

# 判断字符串长度是否不为0，相当于判断变量是否有值
if [[ -n "$DEBUG" ]]; then

fi

```

### 数组

```bash
my_array=("apple" "banana" "cherry" "date" "elderberry")

# 遍历数组的每个元素并打印出来
for element in "${my_array[@]}"
do
    echo "$element"
done
```

### set

set 命令用于改变 shell 的行为，`+` 和 `-` 表示关闭和打开特定的选项。

- `set -e`：这个选项会让脚本在遇到任何错误（即任何返回非零值的命令）时立即退出。
- `set -x`：这个选项会打印每一条即将执行的命令，这对于调试脚本非常有用。
- `set -o pipefail`：如果脚本中的管道命令失败，那么整个脚本就会退出。
- `set -n`：仅读取脚本但不执行，用于检查脚本是否有语法错误。
- `set -v`：将输入到 shell 的命令打印出来，这对于跟踪脚本的执行很有用。

### trap

trap 命令用于捕获并处理信号。

```bash
cleanup() {
  echo "Received signal, exiting with status 0..."
  exit 0
}

trap cleanup SIGINT SIGTERM
```
