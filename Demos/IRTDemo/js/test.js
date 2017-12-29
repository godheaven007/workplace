/**
 * author: xusf
 * description: 测试首页
 * createDate: 2017-4-15
 */

var vm = new Vue({
    el: '#app',
    data: {
        isShowHistory: false,                   // 是否显示历史查看
        historyStorage: '',                     // 历史作答本地数据
    },
    mounted:function () {
        // 注意！！！mounted并不能保证钩子函数中的 this.$el 在 document 中
        this.$nextTick(function(){
            // 页面加载获取请求数据（类似于Jquery中的ready函数）
            this.getInitData();
            this.eventHandle();
        })
    },
    methods: {
        // 初始数据获取
        getInitData: function () {
            var storage = localStorage.getItem('irtHistory');
            if(storage !== null){
                this.isShowHistory = true;
                this.historyStorage = JSON.parse(storage);
            }
        },
        // 事件绑定
        eventHandle: function () {
            var _this = this;
            // 点击测试
            $(document).on('touchend', '#test', function () {
                window.location.href = 'testSelect.html';
            });
            // 查看历史
            $(document).on('touchend', '#reviewHistory', function () {
                // 作答次数为1，直接跳转至诊断结果页；若大于1次，则跳转至历时诊断页
                if(_this.historyStorage.length == 1){
                    if(Common.checkPlatform() == 'ios'){
                        window.location.href = 'result.html';
                    } else if(Common.checkPlatform() == 'android'){
                        window.location.href = 'resultAndroid.html';
                    }

                } else {
                    if(Common.checkPlatform() == 'ios'){
                        window.location.href = 'history.html';
                    } else if(Common.checkPlatform() == 'android'){
                        window.location.href = 'historyAndroid.html';
                    }
                }
            });
        }
    }
});
