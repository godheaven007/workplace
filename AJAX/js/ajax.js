/**
 * author: xusf
 * create: 2017-08-28
 * description: 简易原生ajax封装
 */

var FUN = {
    // 请求地址
    url: '',
    // 默认GET请求
    type: 'get',
    // 请求数据
    data: null,
    // 返回值类型默认为JSON
    dataType: 'json',
    // 默认异步方式
    async: true,
    // 请求成功回调函数
    success: null,
    // 请求失败回调函数
    fail: null,

    init: function (_options) {
        this.url = _options.url || this.url;
        this.async = _options.async || this.async;
        this.dataType = _options.dataType || this.dataType;

        // 请求类型设定
        if(!_options.type || _options.type.toLowerCase() !== 'post'){
            // get方式请求
        } else {
            this.type = _options.type.toLowerCase();
        }

        // 数据初始化
        if(typeof _options.data !== 'undefined'){
            if(this.type == 'get'){
                // get:URL追加字符串
                this.url = this.url + this.setQueryString(_options.data);
            } else if(this.type == 'post'){
                // post: 数据请求
                this.data = _options.data;
            }
        }

        // 回调函数绑定--成功
        if(Object.prototype.toString.call(_options.success) === '[object Function]'){
            // 检测绑定的是否是函数
            this.success = _options.success;
        }

        // 回调函数绑定--失败
        if(Object.prototype.toString.call(_options.fail) === '[object Function]'){
            // 检测绑定的是否是函数
            this.fail = _options.fail;
        }
    },

    /**
     * ajax请求
     * @param options
     */
    ajax: function (options) {
        var _this = this;
        this.init(options);

        var xhr;
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        } else {
            // 不支持xhr对象的低版本IE浏览器（可以参考高级程序设计的写法）
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        // 请求状态发生改变，触发该事件
        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4){
                if((xhr.status >= 200 && xhr.status < 300) || xhr.state == 304){
                    _this.success && _this.success(xhr.responseText);
                } else {
                    _this.fail && _this.fail(xhr.status);
                }
            }
        }

        xhr.open(this.type, this.url, this.async);
        xhr.send(this.data);
    },

    /**
     * get请求，追加查询字符串
      */
    setQueryString: function (data) {
        var paramUrl = [];
        for(var prop in data){
            paramUrl.push(encodeURIComponent(prop) + '=' + encodeURIComponent(data[prop]));
        }
        //
        paramUrl.push(('random= ' + Math.random()).replace('.'));
        return '?' + paramUrl.join('&');
    }
};
