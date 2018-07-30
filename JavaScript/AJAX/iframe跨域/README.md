## 如何使用
1. 利用`http-server`在本地起一个服务，并在`hosts`文件中新增2条记录，分别为
	- 127.0.0.1   course.com
	- 127.0.0.1   math.course.com

2. 打开浏览器，输入访问地址：`course.com:8081/a.html`（注意，这里的端口号与你所起的那个服务的端口一致）
3. 观察嵌入的iframe地址（与当前访问地址不同源）
4. 输入框中输入内容，可以看到iframe内容被修改（即我们成功跨域访问了iframe）

## 使用iframe跨域的条件
1. iframe本身遵循`同源策略`，导致我们无法直接操作嵌入的iframe
2. 若访问页面与嵌入的iframe主域名一致，则可以通过降域的方式(`document.domain == XXX`)达到跨域操作的目的