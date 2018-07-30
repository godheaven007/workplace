## 使用方式
1. 启动终端，执行`node server.js`
2. 浏览器打开 `http://localhost:8080/index.html`,查看效果和网络请求
3. hosts文件添加一条新记录，`127.0.0.1 a.com`，重启服务器，输入`http://a.com:8080/index.html`,
    查看效果和网络请求（浏览器控制台提示跨域报错）
4. 修改`server.js`，添加一条响应头信息 `res.setHeader('Access-Control-Allow-Origin','http://a.com:8080')`,重启服务器，再次查看效果


## CORS实现原理
1. 向后台发起一个请求，浏览器检测该请求为非同源请求，则在请求头中添加`origin:XXX`字段；
2. 服务器接收到请求后，判断该请求是否在许可范围内，若允许，在响应头中添加一条`Access-Control-Allow-Origin`信息；
3. 浏览器接收到响应后，检测返回的响应头中是否存在`Access-Control-Allow-Origin`,若不存在，直接驳回；若存在且其值与请求头中的`origin`相等，则接收数据。