/**
 * author: xusf
 * createDate: 2017-12-14
 * description: 指标数据转换
 */

var vm = new Vue({
        el: '#app',
        data: {
            subject: '02',              // 科目
            dimension1Arr: [],          // 维度1指标名称
            dimension2Arr: [],          // 维度2指标名称
            dimension3Arr: [],          // 维度3指标名称
            dimension4Arr: [],          // 维度4指标名称
            listData: [],
            convertData: [],            // 转换后的数据
            url: 'data/indicator.json'
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
                this.$http.get(this.url).then(function (res) {
                    // 请求成功
                    _this.listData = res.body[_this.subject];
                    _this.dataHandle();
                }, function (res) {
                    // 请求失败
                });
            },
            // 整体知识水平数据处理
            dataHandle: function () {
                var data = this.listData;
                for(var key in data) {
                    if(data[key].dimension == 1) {
                        this.dimension1Arr.push(data[key].name);
                    } else if(data[key].dimension == 2) {
                        this.dimension2Arr.push(data[key].name);
                    } else if(data[key].dimension == 3) {
                        this.dimension3Arr.push(data[key].name);
                    } else {
                        this.dimension4Arr.push(data[key].name);
                    }
                }
                this.convertData = this.dimension1Arr.concat(this.dimension2Arr).concat(this.dimension3Arr);
            }
        }
    }
)
