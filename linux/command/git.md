# git

常用命令

```bash
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"
# 修改上次的commit
git commmit --amend
# 查看最近5条历史记录
git log -n 5
# 查看diff
git diff [--cached] [commit id] [path]
# 删除远程仓库中被删除但本地仍存在的分枝信息
git remote update origin --prune
# 指定分支push
git push origin <本地分支名>:<远程分支名>
# 删除远程分支
git push origin --delete <branch>
# 删除本地分支
git branch -d <branch>
# 强制pull
git reset --hard remotes/origin/get_report_url
git pull
# 本地压缩commit
git rebase -i commit-id

# making a release
git tag v1.0.0
git push --tags
# 推荐在这个状态下，再切出一个分支，用于后续的修复推送,不要直接在master分支修复
git checkout -b v1
git push -u origin v1
```

## stash

```bash
# 将当前工作区和暂存区的内容保存到堆栈中，并添加描述信息
git stash save "message"
# 指定pop某一个
git stash pop stash@{1}
# 查看所有stash
git stash list
# 删除stash
git stash drop stash@{1}
# 删除所有stash
git stash clear
```

## blame

使用 git blame，可以逐行查看在一个特定文件中谁更改了什么内容，这对于一个协作团队来说很有用。
`--color-by-age`根据改动的时间用不同颜色显示，`-L 1,10` 只显示 1 到 10 行

```bash
git blame --color-by-age -L 1,10 $FILE_PATH
```

找到有问题的一行的 commit id 之后可以通过 `git log` 查看

```bash
git show $COMMIT_ID
```
