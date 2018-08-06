从接触前端开始，就一直被教导，写页面的时候，样式要放在`head`标签内，引用的JS文件要尽量放在`body`标签底部。至于这样做的原因不是很清楚。于是学习了下该方面的知识，并做了一些学习笔记。

## 浏览器渲染过程
用户请求的HTML文件，通过网络层到达浏览器渲染引擎后，渲染工作正式开始。基础的渲染流程主要包括四部分：
1. `HTML解析,构建 DOM Tree`:渲染引擎解析HTML文档,生成DOM树;
2. `构建Render Tree`: 渲染引擎解析CSS文件，生成`CSSOM`树，并与`DOM 树`结合，构建出新的`渲染树`;
3. `布局Render Tree`: 对渲染树的每个节点进行位置、大小计算，从而进行布局;
4. `绘制Render Tree`: 遍历渲染树的各个节点，通过浏览器的**UI后端**将图形绘制在屏幕上

webkit引擎渲染流程如下，其他引擎(`Gecko`等)渲染流程稍有不同：![webkit引擎渲染流程.png](https://upload-images.jianshu.io/upload_images/6142251-fb48dbec733be462.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 回流与重绘
1. **reflow**：渲染树的某一部分，其大小或位置发生改变时，会影响到整个渲染树的布局，导致所有的节点大小和位置重新计算的过程(譬如删除某一部分的dom，或将某一部分设置为display:none)

2. **repaint**：渲染树的某一部分，只改变其背景色或文字等不影响其大小和位置的属性时，该部分会发生重绘

## 阻塞渲染（CSS与JavaScript）
首先，明确一点：现代浏览器总是并行加载资源的。例如，当HTML解析器被脚本阻塞时，解析器虽然停止构建DOM树，但该脚本后面的资源仍会被预加载。
如下图所示，HTML解析被`A.js`阻塞，但是后续的静态资源（css和图片）仍被预加载。
![资源并行加载.gif](https://upload-images.jianshu.io/upload_images/6142251-1372bd511c95007e.gif?imageMogr2/auto-orient/strip)

1. JavaScript
  - HTML解析过程中，若碰到`script`标签，脚本立即执行，并且会阻塞dom树的构建（解析与渲染），直至脚本执行完成（参考上图`资源并行加载.gif`）

2. CSS
  - css加载会不会阻塞dom树的解析？
    不会。如下图所示，`a.css`延迟加载10s，dom树解析完毕，但`a.css`还在加载过程中。
![css与dom树解析渲染.gif](https://upload-images.jianshu.io/upload_images/6142251-16b38a3a12ef054b.gif?imageMogr2/auto-orient/strip)

  - css加载会不会阻塞dom树的渲染？
  会。参考`css与dom树解析渲染.gif`,`a.css`在加载的这10s中，处于白屏状态，10s后，页面才完全渲染出来。
（P.S. 开发页面的时候，经常会引用第三方css库，譬如**BootStrap.css**,第三方库有可能会引用国外的某些字体库文件，导致加载时间过长或失败，该过程页面就表现为白屏状态，就是因为CSS阻塞了dom树的渲染导致的）

  - css加载会不会阻塞其后js的执行？
会。如下图所示，`A.js`耗时1s加载完毕，但是并没有立即执行，而是等`a.css`耗时10s之后才执行。
![css阻塞js执行.gif](https://upload-images.jianshu.io/upload_images/6142251-e6758f5ac1b2136b.gif?imageMogr2/auto-orient/strip)

3. 白屏与FOUC(无样式内容闪烁，Flash of unstyled content)
根本原因，JS或CSS阻塞了dom树的构建，渲染树无法渲染。不同的浏览器，在处理方式上不一样，Chrome表现为白屏，需要等CSSOM树构建完毕，才显示内容；FireFox表现为先加载HTML内容，待CSSOM构建结束后，渲染树绘制在屏幕上，该过程内容会闪烁以下

Chrome:
![白屏（Chrome）.gif](https://upload-images.jianshu.io/upload_images/6142251-0f252d251ee84d1c.gif?imageMogr2/auto-orient/strip)

FireFox:
![FOUC(FireFox).gif](https://upload-images.jianshu.io/upload_images/6142251-9d3bcb1accf8b91f.gif?imageMogr2/auto-orient/strip)


4. 改变阻塞模式（defer与async）
  - **defer**：JS的加载**不会**阻塞HTML的解析，换句话说，这两个过程是并行的；JS的执行阶段被放到HTML加载解析结束之后，`DOMContentLoaded`事件触发之前完成，**有顺序**。

  - **async**：异步执行引入的 JavaScript，与 defer 的区别在于，如果已经加载好，就会开始执行，无论此刻是 HTML 解析阶段还是 DOMContentLoaded 触发(HTML解析完成事件)之后，无顺序。

以上都是我学习过程中的总结，若有错误，欢迎拍砖指正！
> 参考：
1. [浏览器的渲染：过程与原理](https://zhuanlan.zhihu.com/p/29418126) 
2. [浅析浏览器渲染原理](https://segmentfault.com/a/1190000012960187#articleHeader8)
3. [How browsers work](http://taligarsiel.com/Projects/howbrowserswork1.htm)







