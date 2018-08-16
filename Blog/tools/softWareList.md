## node相关
1. http-server
2. fanyi
3. sprity  npm包管理工具（自动合并精灵图） 

## chrome插件
1. Page Ruler(尺寸选择) 
2. ColorZilla(颜色选择)
3. DownFaster（下载JS、Img、CSS等静态资源文件）


## 常用工具软件
1. cutterman
2. BeyondCompare


## Sublime Text
1. Mac下在命令行中用ST打开指定文件
	- 打开用户配置文件（不存在则新建）：vim ~/.bash_profile
	- 起别名：alias st="'/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl'"
	- 让命令生效： source ~/.bash_profile
	- 打开指定文件：st test.js

## z软件(用命令行在目录中进行切换)
1. 切换至**~**目录，下载**z.sh**
curl -L https://raw.githubusercontent.com/rupa/z/master/z.sh > z.sh

2. 在**~**目录下找到**.zshrc**文件（zsh的配置文件），在其头部追加刚刚下载好的**z.sh**文件，如下：
    `source ~/z.sh`
3. 让配置文件**.zshrc**立即生效
    `source ~/.zshrc`
4. 更高级用法（若模糊匹配了多个目录，该如何选择?这里需要用到**fzf**，具体的安装方式请参考其GitHub地址`https://github.com/junegunn/fzf#installation`）
  **fzf**安装：
	a. brew install fzf
	b. $(brew --prefix)/opt/fzf/install

5. 添加脚本至**.zshrc**，脚本如下：
```
j() {
     if [[ -z "$*" ]]; then
         cd "$(_z -l 2>&1 | fzf +s | sed 's/^[0-9,.]* *//')"
     else
         _last_z_args="$@"
         _z "$@"
     fi
 }

 jj() {
     cd "$(_z -l 2>&1 | sed 's/^[0-9,.]* *//' | fzf -q $_last_z_args)"
 }
```

6. 执行**source**命令，让**.zshrc**配置文件立即生效

## Adobe PhotoShop 2018 CC 破解
[参考文章](http://www.bigzhong.com/wenzhang/20161121/14.html)


