# Gitaaa

## 远程仓库起步(这是进行远程仓库操作的基础)
1. 初次使用需配置用户名和邮箱
`git config --global user.name "godheaven007"`
`git config --global user.email 345777292@qq.com`

2. 在~目录查看是否有.ssh目录，并查看.ssh内部是否有`私钥id_rsa` 和`公钥id_rsa.pub`,若不存在，则执行一下命令生成)
`ssh-keygen -t rsa -b 4096 -C "345777292@qq.com"`(具体参考[GitHub](https://help.github.com/articles/generating-an-ssh-key)) 

3. 将`公钥id_rsa.pub`添加至GitHub中  

> 为什么GitHub需要SSH Key呢？因为GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只要知道了你的公钥，就可以确认只有你自己才能推送。当然，GitHub允许你添加多个Key。假定你有若干电脑，你一会儿在公司提交，一会儿在家里提交，只要把每台电脑的Key都添加到GitHub，就可以在每台电脑上往GitHub推送了。

## 克隆远程仓库至本地(针对GitHub上所有可见仓库)
在本地使用命令`git clone git@github.com:godheaven007/blog.git`,克隆线上仓库

## 向自己的远程仓库提交版本
1. 关联远程仓库  `git remote add origin git@server-name:path/repo-name.git`，其中**origin**是远程仓库的别名，可以起其他名字。关联后，使用命令`git push -u origin master`第一次推送**master**分支的所有内容

2. 在对文件修改时，请确保本地仓库版本与远程仓库版本保持一致。可以总结为：**先pull再push**
- `git pull origin master` 
- `git push origin master`

3. 其他相关命令 
- `git remote -v` 查看远程库信息; 
- `git remote remove origin`删除与远程仓库的连接
- `git push -f origin master`强制推送，会覆盖别人代码(绝大部分情况请不要这样做)
- `git remote set-url origin git@server-name:path/repo-name.git`修改origin关联的远程仓库地址

## 向别人的远程仓库提交版本
请确保别人给了你提交的权限

## 分支
- `git branch`查看本地分支
- `git branch -a` 查看本地跟远程分支
- `git branch [name]`创建新分支
- `git checkout [name]`切换分支
- `git checkout -b [name]`创建新分支并切换至该分支
- `git branch -d [name]`删除分支
- `git merge [name]`合并分支至当前分支


## 其他常用命令整理
- `git init` 新建仓库
- `git add`添加至暂存区
- `git commit -m "something described"`将暂存区内容提交至本地仓库
- `git commit -am "something described`或者上面二者结合 
- `git reset HEAD index.html`将暂存区内容撤销至工作区  
- `git checkout -- index.html`放弃工作区中对文件的修改 
- `git status`命令提示操作
- `git log --pretty=oneline --graph --abbrev-commit`只显示**commit**的版本
- `git reflog`显示**commit**、**reset**、**remove**版本
- `git reset --hard commit_id`回退至某一个版本
- `git diff`对比文件差异