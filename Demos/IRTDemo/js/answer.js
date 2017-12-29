/**
 * author: xusf
 * description: 作答页
 * createDate: 2017-4-17
 * modifyData: 2017-5-8  数据更新
 */

var vm = new Vue({
    el:'#app',
    data:{
        listData:[],                        // 所有题目的数据
        itemData:[],                        // 当前题目的数据
        path:[],                            // 答题路径
        url:'data/dataHandle.json',         // 模拟数据url
        options:['A','B','C','D','E'],      // 答案选项
        zAxis:0,                            // z轴值(第2道题公式用)
        group:0,                            // 题目组（共3组）
        curIndex:0,                         // 当前正在答第几题（总共7题）
        quesIndex:0,                        // 当前题目在所有题目中的索引
        intervalTime: 30,                   // 每道题的作答时间
        intervalObj: ''
    },
    mounted:function () {
        // 注意！！！mounted并不能保证钩子函数中的 this.$el 在 document 中
        this.$nextTick(function(){
            // 页面加载获取请求数据（类似于Jquery中的ready函数）
            this.getInitData();
            this.eventHandle();
            // // 进度条初始化
            // this.getProgress();
            // // 启动计时器
            // this.startTime();
        })
    },
    methods:{
        // 获取报告列表数据
        getInitData: function () {
            var _this = this;
            this.$http.get(this.url).then(function(res){
                // 请求成功
                _this.listData = res.body.question;
                _this.itemData = _this.listData[this.getRandom()];
            },function(res){
                // 请求失败
            })
        },
        // 事件处理
        eventHandle: function () {
            var _this = this;
            // 单选
            $(document).on('touchend', '#option .itemWrap', function(){
                $('#option .itemWrap').removeClass('active');
                $(this).addClass('active');
            });
            // 点击注意事项确定
            $(document).on('touchend','#attention_btn', function () {
               $('.attention').hide();
               $('.countDown').show();
               setTimeout(function(){
                   $('.countDown,.mask').hide();
                   // 进度条初始化
                   _this.getProgress();
                   // 启动计时器
                   _this.startTime();
               },4000)
            });
        },
        // 获取一开始的题目序号（1,4,7）
        getRandom: function () {
            var num = parseInt(Math.random() * 100);
            if(num < 33){
                this.zAxis = 2;
                this.group = 0;
                this.quesIndex = 0;
                return 0;
            } else if(num < 66){
                this.zAxis = 1;
                this.group = 1;
                this.quesIndex = 3;
                return 3;
            } else {
                this.zAxis = 0;
                this.group = 2;
                this.quesIndex = 6;
                return 6;
            }
        },
        // 获取下一道题的相关数据并展现
        next: function () {
            // 小题索引累加
            if(this.curIndex < 6){
                // 进度条重置
                this.progressReset();
                //
                clearInterval(this.intervalObj);
                this.startTime();
                this.curIndex += 1;
                var correctAnswer = this.itemData.answer;
                // 时间到未答，则自动算错误
                var myAnswer = $('#option .itemWrap.active .item').text();
                this.path.push(correctAnswer == myAnswer ? 1 : 0);
                // 清除选中状态
                $('#option .itemWrap').removeClass('active');

                // 选题
                if(this.curIndex == 1){
                    // 第2题
                    if(correctAnswer == myAnswer){
                        this.quesIndex = this.quesIndex + 2;
                    } else {
                        this.quesIndex = this.quesIndex + 1;
                    }
                } else if(this.curIndex == 2){
                    // 第3题
                    if(correctAnswer == myAnswer){
                        this.quesIndex = this.curIndex + 3 * this.zAxis + 1 + this.quesIndex;
                    } else {
                        this.quesIndex = this.curIndex + 3 * this.zAxis + 0 + this.quesIndex;
                    }
                } else {
                    // 第4,5,6,7题
                    if(correctAnswer == myAnswer){
                        this.quesIndex = this.curIndex + this.quesIndex + 1;
                    } else {
                        this.quesIndex = this.curIndex + this.quesIndex + 0;
                    }
                }
                // 设置将要展示的小题数据
                this.itemData = this.listData[this.quesIndex];
            } else {
                clearInterval(this.intervalObj);
                this.submit();
            }
        },
        // 提交所做答案
        submit: function () {
            // 提交答案时，将最后一次的选项插入数组
            var correctAnswer = this.itemData.answer;
            var lastAnswer = $('#option .itemWrap.active .item').text();
            this.path.push(correctAnswer == lastAnswer ? 1 : 0);
            // 缓存历时作答
            this.setHistory();
            // 跳转至诊断结果页
            if(Common.checkPlatform() == 'ios'){
                window.location.href = 'result.html';
            } else if(Common.checkPlatform() == 'android'){
                window.location.href = 'resultAndroid.html';
            }

        },
        // 设置历时作答
        setHistory: function () {
            var obj = {
                group: this.group,
                path: this.path.join('')
            };
            // 设置结果页、进阶训练页需要获取的参数
            localStorage.setItem('irtResult',JSON.stringify(obj));

            // 设置历时作答页数据
            var history = localStorage.getItem('irtHistory');
            var historyData = [];
            if(history == null){
                // 第一次作答
                historyData.push(obj);
            } else {
                // 有作答记录
                historyData = JSON.parse(history);
                historyData.push(obj);
                if(historyData.length > 3){
                    // 取最新的3次作答历时记录
                    historyData.shift();
                }
            }
            localStorage.setItem('irtHistory',JSON.stringify(historyData));
        },
        // 启动计时器
        startTime: function () {
            this.intervalTime = 30;
            $('#time').text(this.intervalTime + 's');
            this.intervalObj = setInterval(this.setRemainTime, 1000);
        },
        // 时间设置
        setRemainTime: function () {
            this.intervalTime--;
            if (this.intervalTime == 0) {
                $("#time").text( + this.intervalTime + "s");
                this.next();
            } else {
                $("#time").text( + this.intervalTime + "s");
            }
        },
        // 进度条重置
        progressReset: function () {
            $('.progress-in').stop(true);
            $('.progress-in').css('width',0 +'%');
            this.getProgress();
        },
        getProgress: function () {
            var _this = this;
            $('.progress-in').animate({
                width: 100 + '%'
            },30000, 'linear',function () {
                // _this.next();
            })
        },
        // 返回上一页
        back: function () {
            window.location.href = 'testSelect.html';
        }
    },
    // 过滤器
    filters: {}
});
