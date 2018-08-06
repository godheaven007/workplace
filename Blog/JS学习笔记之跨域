在日常开发中，我们经常能够碰到跨域相关的问题，在浏览器控制台中，其通常表现如下：
![跨域.jpg](https://upload-images.jianshu.io/upload_images/6142251-d26f4b295cee7e46.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

那报错产生的原因是什么？我们又有哪些方式可以进行跨域呢？

## 同源策略
浏览器出于安全方面的考虑，只允许与`本域`下的接口交互。`不同源`的客户端脚本在没有明确授权的情况下，不能读写对方的资源。
这里的**同源**，指的是`同协议`、`同域名`、`同端口`。
造成上述报错的根本原因就是：`请求数据的接口地址与当前页面地址不同源！`

## 几种常见的跨域方式
那假设我们就是想访问**不同源的接口数据**，是否有相应的解决方案呢？通常，有如下几种方式：


### JSONP
`HTML 中 script 标签可以加载其他域下的js。`当我们引入第三方的JS文件时，其地址与当前页面显然不同源，但该方式却可以绕开同源策略的限制，加载外部JS文件并执行。

既然如此，那完全可以依葫芦画瓢，用该方式直接去服务端获取数据，譬如如下操作：
```
<script src="localhost:8080/getMoney"></script>
```
需要注意的是，虽然可以获取到JSON数据，但我们却无法直接操作它。所以，我们得做一点小改进：
```
function handle() {
  // TODO...
}
<script src="localhost:8080/getMoney?callback=handle&userId=XXX"></script>

// 通常，我们会动态添加script,而不是写死
function add() {
  var script = document.createElement("script");
  script.src = "localhost:8080/getMoney?callback=handle&userId=XX";
  document.body.appendChild(script);
}
```
这里我们事先定义了一个`handle`函数，并在请求的地址后面附上了`callback=handle&userId=XXX`这样一段信息。这样做的根本目的是：当请求到达后端后，后端会解析`callback`拿到`handle`字符串，原本后端直接发送JSON数据`{money: 100}`即可,现在会在JSON数据外封装一层，变为`handle({money: 100})`。当浏览器加载完该请求时，该部分会被当做js立即执行，又因为我们事先定义好了`handle`函数，这样我们可以直接操作返回的数据了。

需要注意的是，JSONP只支持`GET`请求! 
具体实现请参照[demo地址](https://github.com/godheaven007/workplace/tree/master/JavaScript/AJAX/JSONP)

### CORS
`JSONP`跨域请求，给人一种**hack**的味道，那纯正的`XMLHttpRequest`是否支持跨域呢？答案是肯定的。

CORS（跨域资源共享）：若你的浏览器和访问的服务器都支持`CORS`,那你就可以像使用普通的ajax请求那样使用它。其内部实现过程如下：
1. 浏览器检测到某个请求非同源，自动在请求头部加上`origin`字段；
2. 服务器接收到请求后，检测`origin`是否在许可范围内，若允许则在响应头中添加`Access-Control-Allow-Origin:XXX`;
3. 响应到底浏览器后，浏览器去判断响应头中是否存在`Access-Control-Allow-Origin`,若不存在，浏览器直接驳回；若存在且请求头中的`origin`值与响应头中的`Access-Control-Allow-Origin`的值相等，若相等，则接受数据。

具体实现请参照[demo地址](https://github.com/godheaven007/workplace/tree/master/JavaScript/AJAX/CORS)

### JSONP与CORS比较
1. JSONP只支持`GET`请求，CORS支持所有类型的 HTTP 请求；
2. JSONP兼容性好，支持所有浏览器；CORS需要浏览器与服务器同时支持；
3. JSONP类似于`hack`处理，JSONP只要浏览器与服务器都支持，就可以像使用普通ajax请求那样，请求数据。

### iframe跨域
首先，明确一点：`iframe遵循同源策略`，即当前页面地址如果与嵌入的iframe的地址不一样，则不能直接操作**iframe**，如果你这样做了，那控制台会毫不客气的给你类似这样的一个警告：

![非同源访问iframe.jpg](https://upload-images.jianshu.io/upload_images/6142251-298d1bf5c9abd4df.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

实际上，我们可以操作iframe，前提是主域名必须一致，然后我们通过降域的方式，让当前页面的`domain`与`iframe`的`domain`一致即可。

具体实现请参照[demo地址](https://github.com/godheaven007/workplace/tree/master/JavaScript/AJAX/iframe%E8%B7%A8%E5%9F%9F)

## postMessage跨域
上述`iframe`,需要主域相同才可以实现父窗口与子窗口通信，那倘若两个完全不同源的父子窗口又该如何通信呢？

HTML5为了解决跨域，引入了新的API,`跨文档通信 API`。这个API为window对象新增了一个window.postMessage方法，允许跨窗口通信，不论这两个窗口是否同源。
举例来说，非同源的两个窗口`a.com`与`b.com`。`a.com`需要调用`b.com`的接口获取一些数据，这个时候只需要调用`postMessage`发一些参数给`b.com`的接口。`b.com的接口`通过监听`message`函数来获取参数(`origin`允许的情况下)，然后通过正常的ajax请求获取`b.com`该接口的数据。同理，将调取到的数据以同样的方式返回给`a.com`。其实现如下：
```
// a.com父窗口
窗口a.postMessage("参数", "b.com");
window.addEventListener("message", function(e){
  // 哈哈，我拿到了b.com下的接口数据
});

// b.com子窗口
window.addEventListener("message", function(e){
  // 拿到参数e.data，然后TODO...
});
窗口b.postMessage("ajax请求到的数据", "a.com");
```

具体实现请参照[demo地址](https://github.com/godheaven007/workplace/tree/master/JavaScript/AJAX/postMessage%E8%B7%A8%E5%9F%9F)

### 其他跨域方式（WebSocket敬请期待）

(P.S. 除上述几种方式，我们还可以`架设服务器代理`:浏览器请求同源服务器，再由后者请求外部服务)

> 参考文章：  1. [阮一峰-CORS通信](https://wangdoc.com/javascript/bom/cors.html)   2.[阮一峰-浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)

