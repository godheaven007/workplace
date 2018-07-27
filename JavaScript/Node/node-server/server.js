var http = require("http");
var path = require("path");
var url = require("url");
var fs = require("fs");

/**
 * 读取客户端请求的静态资源，并返回给客户端
 */
function readStaticResource(req, res) {
    var urlObj = url.parse(req.url, true);
    // 静态资源路径
    var staticPath = path.join(__dirname, "static");

    // 访问根目录（localhost:8080）
    if (urlObj.pathname === '/') {
        staticPath = path.join(staticPath, "index.html");
    } else {
        staticPath = path.join(staticPath, urlObj.pathname);
    }

    // 读取文件内容
    fs.readFile(staticPath, "binary", function (error, data) {
        if (error) {
            res.writeHead(404, "not found");
            res.write("Not Found");
        } else {
            res.writeHead(200, "success");
            res.write(data, "binary");
        }
        res.end();
    });
}

// 路由处理
function routeHandle(req, res) {
    var urlObj = url.parse(req.url, true);
    var handleFn = routes[urlObj.pathname];

    if (handleFn) {
        // 读取路由
        // 以下参考https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
        var body = [];
        req.on("data", function(chunk) {
            body.push(chunk);
        }).on("end", function() {
            body = Buffer.concat(body).toString();
            handleFn(req, res, body);
        });
        
        // handleFn(req, res, body); 不要写在这里！！！body会取不到数据，因为事件执行是异步的
    } else {
        // 根目录或未配置该路由处理函数
        readStaticResource(req, res);
    }
}

// 路由配置信息
var routes = {
    "/course": function (req, res, data) {
        res.setHeader("Content-Type", "charset=utf-8");
        var obj = {};
        var arr = data.split(/&/);
        arr.forEach(function(value, index, array) {
            var temp = value.split("=");
            obj[temp[0]] = temp[1];
        })
        res.end(JSON.stringify(obj));
    },
    // TODO...其他路由处理类似
};

// 启动服务
var server = http.createServer(function (req, res) {
    routeHandle(req, res);
}).listen(8080);

// 提示输出
console.log("Available on: ");
console.log("http://localhost:8080");
console.log("Hit CTRL-C to stop the server");