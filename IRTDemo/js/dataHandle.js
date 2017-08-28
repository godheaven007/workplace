/**
 * author: xusf
 * description: 整体知识水平数据处理
 * createDate: 2017-05-09
 */

var vm = new Vue({
    el: '#app',
    data: {
        listData:[],
        url: 'data/path.json'
    },
    mounted:function () {
        // 注意！！！mounted并不能保证钩子函数中的 this.$el 在 document 中
        this.$nextTick(function(){
            // 页面加载获取请求数据（类似于Jquery中的ready函数）
            this.getInitData();
        })
    },
    methods: {
        // 获取数据
        getInitData: function () {
            var _this = this;
            var url = 'data/path.json';
            this.$http.get(url).then(function (res) {
                // 请求成功
                _this.listData = res.body;
                _this.dataHandle();
            }, function (res) {
                // 请求失败
            });
        },
        // 整体知识水平数据处理
        dataHandle: function () {
            var _this = this;
            for(var i = 0; i < this.listData.length; i++){
                $.each(this.listData[i], function (key, value) {
                    if(value[1] < 0){
                        value[1] = 1 - _this.getLevelData((-value[1]).toFixed(1));
                    } else {
                        value[1] = _this.getLevelData(value[1].toFixed(1));
                    }
                })
            }
            localStorage.setItem('data', JSON.stringify(this.listData));
            // this.setLocalStorageData();
        },
        getLevelData: function (data) {
            switch(data){
                case '-0.1': return 0.4602; break;
                case '0.0': return 0.5; break;
                case '0.1': return 0.5398; break;
                case '0.2': return 0.5793; break;
                case '0.3': return 0.6179; break;
                case '0.4': return 0.6554; break;
                case '0.5': return 0.6915; break;
                case '0.6': return 0.7257; break;
                case '0.7': return 0.758; break;
                case '0.8': return 0.7881; break;
                case '0.9': return 0.8159; break;
                case '1.0': return 0.8413; break;
                case '1.1': return 0.8643; break;
                case '1.2': return 0.8849; break;
                case '1.3': return 0.9032; break;
                case '1.4': return 0.9192; break;
                case '1.5': return 0.9332; break;
                case '1.6': return 0.9452; break;
                case '1.7': return 0.9554; break;
                case '1.8': return 0.9641; break;
                case '1.9': return 0.9713; break;
                case '2.0': return 0.9772; break;
                case '2.1': return 0.9821; break;
                case '2.2': return 0.9861; break;
                case '2.3': return 0.9893; break;
                case '2.4': return 0.9918; break;
                case '2.5': return 0.9938; break;
                case '2.6': return 0.9953; break;
                case '2.7': return 0.9965; break;
                case '2.8': return 0.9974; break;
                case '2.9': return 0.9981; break;
                case '3.0': return 0.9987; break;
                case '3.1': return 0.999032; break;
                case '3.2': return 0.999313; break;
                case '3.3': return 0.999517; break;
                case '3.4': return 0.999663; break;
                case '3.5': return 0.999767; break;
                case '3.6': return 0.999841; break;
                case '3.7': return 0.999892; break;
                case '3.8': return 0.999928; break;
                case '3.9': return 0.999952; break;
                case '4.0': return 0.999968; break;
                case '4.1': return 0.999979; break;
                default: return 1;
            }
        },
        setLocalStorageData: function () {
            var arr = [];
            for(var i = 0; i < this.listData.length; i++){
                var obj = {};
                $.each(this.listData[i], function (key, value) {
                    obj['flag' + key] = value;
                })
                arr.push(obj);
            }
            localStorage.setItem('data', JSON.stringify(arr));
        }
    }
 }
)
