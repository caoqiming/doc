# git

```bash
# 修改上次的commit
git commmit --amend
# 查看历史记录
git log
# 查看diff
git diff [--cached] [commit id] [path]
# 删除远程仓库中被删除但本地仍存在的分枝信息
git remote update origin --prune
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
