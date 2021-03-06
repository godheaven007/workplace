## 远程仓库起步(这是进行远程仓库操作的基础)
1. 初次使用需配置用户名和邮箱
`git config --global user.name "godheaven007"`
`git config --global user.email 345777292@qq.com`

2. 在~目录查看是否有.ssh目录，并查看.ssh内部是否有`私钥id_rsa` 和`公钥id_rsa.pub`,若不存在，则执行一下命令生成)
`ssh-keygen -t rsa -b 4096 -C "345777292@qq.com"`(具体参考[GitHub](https://help.github.com/articles/generating-an-ssh-key)) 

3. 将`公钥id_rsa.pub`添加至GitHub中  

> 为什么GitHub需要SSH Key呢？因为GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只要知道了你的公钥，就可以确认只有你自己才能推送。当然，GitHub允许你添加多个Key。假定你有若干电脑，你一会儿在公司提交，一会儿在家里提交，只要把每台电脑的Key都添加到GitHub，就可以在每台电脑上往GitHub推送了。

## 克隆远程仓库至本地(针对GitHub上所有可见仓库)
1. 在本地使用命令`git clone git@github.com:godheaven007/blog.git gitName`,克隆线上仓库,其中**gitName**默认为线上仓库名称，可以修改为你想要的名称
2. 当你从远程仓库克隆时，实际上Git自动把本地的`master`分支和远程的`master`分支对应起来了，并且，远程仓库的默认名称是`origin`,可以用`git remote -v`查看相应信息

## 向自己的远程仓库提交版本
1. 关联远程仓库  `git remote add origin git@server-name:path/repo-name.git`，其中**origin**是远程仓库的别名，可以起其他名字。关联后，使用命令`git push -u origin master`第一次推送**master**分支的所有内容

2. 在对文件修改时，请确保本地仓库版本与远程仓库版本保持一致。可以总结为：**先pull再push**
即先`git pull origin master`后`git push origin master`

3. 其他相关命令 
- `git remote -v` 查看远程库信息; 
- `git remote remove origin`删除与远程仓库的连接
- `git push -f origin master`强制推送，会覆盖别人代码(绝大部分情况请不要这样做)
- `git remote set-url origin git@server-name:path/repo-name.git`修改origin关联的远程仓库地址

## 向别人的远程仓库提交版本
请确保别人给了你提交的权限

## 分支管理
### 分支相关命令
- `git branch` 查看本地分支
- `git branch -a` 查看本地分支、远程分支
- `git branch branchName` 从当前分支创建新分支
- `git checkout branch` 从当前分支切换至指定分支
- `git checkout -b newBranch` 从当前分支创建新分支并切换至该分支
- `git branch -d branch` 删除分支(**不能在当前分支删除自身**)
- `git branch -D branch` 强行删除一个没有被合并过的分支
- `git merge branch` 将指定分支合并至当前分支

### 分支策略
实际开发中，通常以master作为线上稳定分支，进行项目的发布，develop分支为开发分支，各个开发成员基于develop分支，单独拉取自己的分支，再开发完成的代码合并至develop分支。

### bug分支
1. 【线上紧急bug】
   基于master分支，创建hotfix分支，修改完成后合并至master分支，经测试无误后再推送至远程master分支

2. 【功能开发至中途，需解决紧急bug】
    用`git stash`命令将`案发现场`保存起来,等bug修复完毕之后，再通过`git stash apply`恢复，继续之前被中断的开发任务
    **关于stash的其他命令**
    - `git stash list` 查看保存的`案发现场`
    - `git stash apply stash@{0}` 恢复`案发现场`, **stash内容不删除**,必须通过`git stash drop stash@{0}`命令手动删除
    - `git stash pop stash@{0}` 恢复`案发现场`的同时，一并将**stash内容**删除

### 多人协作
1. 用`git push origin <branch-name>`推送自己的修改；
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
3. 如果合并有冲突，则解决冲突，并在本地提交；
4. 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送就能成功！
> 如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。

其他相关命令：
- 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致
- 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`

## 其他常用命令整理
- `git init` 新建仓库
- `git add`添加至暂存区
- `git commit -m "something described"`将暂存区内容提交至本地仓库
- `git commit -am "something described`或者上面二者结合 
- `git reset HEAD index.html`将暂存区内容撤销至工作区  
- `git checkout -- index.html`放弃工作区中对文件的修改 
- `git status`命令提示操作
- `git log --pretty=oneline --graph`只显示**commit**的版本
- `git reflog`显示**commit**、**reset**、**remove**版本
- `git reset --hard commit_id`回退至某一个版本

参考文章：
1. [廖雪峰Git](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)