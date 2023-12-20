# tmux

> tmux is a terminal multiplexer: it enables a number of terminals to be created, accessed, and controlled from a single screen. tmux may be detached from a screen and continue running in the background, then later reattached.

[github link](https://github.com/tmux/tmux)

To create the first tmux session

```
tmux new
```

进入前置操作`control + B`
`"`上下分屏，`%`左右分屏，`d`分离会话
`o`切换屏幕，空格切换上下分屏与左右分屏
`prefix Up,Down,Left,Right`

`tmux ls`查看会话，`tmux attach-session -t my_session`重新接入某个会话
