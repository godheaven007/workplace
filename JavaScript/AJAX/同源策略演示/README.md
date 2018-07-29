## 如何使用
1. 修改`host`文件，增加1条记录
	127.0.0.1  a.com
2. 在终端下输入`node server.js`
3. 打开浏览器，输入`localhost:8080/getWeather`
4. 将`localhost`改成`a.com`，控制台报跨域请求错误

## 原理
请求的接口地址为：`http://localhost:8080/getWeather`,修改成`http://a.com:8080/getWeather`后，
虽然都指向`127.0.0.1`,但因为`不同源`,导致浏览器报错。