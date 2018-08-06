## 实现原理
1. 页面初始化时，给所有图片提供同一个`loading`图片，并将真实图片地址绑定在图片的自定义属性上,如下：
    ```
    <img src="loading.png" data-img-src="图片真实地址">
    ```
2. 对视口容器的滚动事件进行监听，当图片出现在视口中时，加载图片（将上述的自定义属性值赋给图片的`src`属性），其中出现在视口中的判断如下：
```
    视口高度(clientHeight) + 视口容器向上滚动的距离（scrollTop）>= 元素距离父容器顶部的距离(offsetTop)
```

## 参考文章
1. [Element size and scrolling](http://javascript.info/size-and-scroll#geometry)