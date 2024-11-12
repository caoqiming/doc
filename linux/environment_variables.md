# Environment Variables

登录 linux 时执行的顺序为
`/etc/profile` -> (`~/.bash_profile` | `~/.bash_login` | `~/.profile`) -> `~/.bashrc` -> `/etc/bashrc` -> `~/.bash_logout`

如果是 zsh 会执行`~/.zshrc`

## PATH

```bash
export PATH=$JAVA_HOME/bin:$PATH
```

一般将需要添加的 path 放在前面，因为前面的优先级更高
