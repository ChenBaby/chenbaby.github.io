---
title: Git
date: 2018-12-09 12:54:08
tags: Git
---
Git 版本控制系统，创建分支多人开发，提交合并文件，拉取更新
常用命令:
```
git add //添加文件到暂存区
git commit -m "" //提交修改
git status //查看文件的所有状态
git push //推送至远程库
git pull //拉取远程代码
git branch //查看分支 加参数-b 创建分支、-d 删除分支
git revert //回滚版本
git checkout //放弃文件的修改或者后面跟分支名字切换分支
```
<!-- more -->
### 关联远程分支

使用git在本地新建一个分支后，需要做远程分支关联。

关联目的是在执行git pull, git push操作时就不需要指定对应的远程分支

如果没有关联，操作一些git命令时，会提示添加关联。
```
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> dev
```
远程分支关联
`git branch --set-upstream-to=origin/remote_branch your_branch`
其中，origin/remote_branch是你本地分支对应的远程分支；your_branch是你当前的本地分支。