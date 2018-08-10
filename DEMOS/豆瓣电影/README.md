## 介绍
模拟了豆瓣电影列表部分功能，由 **Top250**,**欧美**,**搜索**三个模块构成。

## 主要实现功能
1. 各模块滚动至底部请求数据并渲染
2. tab页切换

## 如何判断滚动至底部并加载数据
1. 视口高度(clientHeight) + 向上滚动距离(scrollTop) >= 滚动容器的整体高度(scrollHeight) - 20（该部分距离可根据实际情况添加）
2. 在列表的底部添加一个标签，当滚动条向下滚动，该标签出现在视口中时，则认为用户已浏览完所有电影，于是请求新的数据（该案例采用的就是添加一个`loading`标签）

## 需要注意的细节
1. 滚动到底部连续发请求，需要进行函数节流操作或上锁操作，防止频繁发请求
2. `搜索`模块中，当在输入框中输入数据时，会唤起IOS的软键盘，导致搜索栏上移，布局错乱（fixed的锅)
3. IOS真机测试时，发现滚动条滚动太生硬，应添加`-webkit-overflow-scrolling: touch`属性；点击按钮会有灰色阴影，应添加`-webkit-tap-highlight-color: transparent;`属性；以及添加`-webkit-appearance: none;`去除按钮、输入框等默认样式；
4. 渲染列表时，应以`innerText`的形式，不要用`innerHTML`(防止XSS攻击)
5. `loading`动画，对于行内元素不起作用，需将其转化inline-block或block元素
6. `offsetTop`，如果父元素没有设置relative，则距离的是离自身最近的，并且设置了`position:relative/absolute/fixed`的祖先元素
