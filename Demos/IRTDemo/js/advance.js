/**
 * author: xusf
 * description: 进阶训练页
 * createDate:  2017-5-11
 */

var vm = new Vue({
    el:'#app',
    data:{
        listData:[],                        // 所有题目的数据
        question:[],                        // 推送的所有阶段训练题目
        itemData:[],                        // 当前题目的数据
        url:'data/advance.json',            // 进阶数据url
        options:['A','B','C','D','E'],      // 答案选项
        isShowAnswer: true,                 // 显示答题区或答案区
        curIndex:0,                         // 当前正在答第几题
    },
    mounted:function () {
        // 注意！！！mounted并不能保证钩子函数中的 this.$el 在 document 中
        this.$nextTick(function(){
            // 页面加载获取请求数据（类似于Jquery中的ready函数）
            this.getInitData();
            this.eventHandle();
        })
    },
    methods:{
        // 获取报告列表数据
        getInitData: function () {
            var _this = this;
            $('.mask').hide();
            this.$http.get(this.url).then(function(res){
                // 请求成功
                _this.listData = res.body;
                if(localStorage.getItem('irtAdvance') !== null){
                    _this.filterAdvanceData();
                    _this.setProgress();
                }
            },function(res){
                // 请求失败
            })
        },
        // 过滤进阶训练题目
        filterAdvanceData: function () {
            var advanceStorage = JSON.parse(localStorage.getItem('irtAdvance'));
            for(var i = 0; i < advanceStorage.length; i++){
                this.pickAdvanceQues(advanceStorage[i]["knowledgeIndex"], advanceStorage[i]["knowledgeMaster"]);
            }
        },
        /**
         * 挑选进阶训练题目
          * @param index    知识点索引
         * @param master    知识点掌握度
         */
        pickAdvanceQues: function (index, master) {
            // 在当前知识点对应的所有题目中，根据 （1- master）的值去匹配题目
            // 若 0.2 + （1- master） < difficulty < (1- master) + 0.2, 则命中该题目
            var _this = this;
            var curQuesList = this.listData[index];             // 当前知识点对应的所有题目
            master = 1 - master;

            $.each(curQuesList, function (i, ques) {
                if(((master - 0.1) < ques.difficulty) && (ques.difficulty < (master + 0.1))) {
                    _this.question.push(ques);
                }
            })
            this.itemData = this.question[this.curIndex];
        },
        // 事件处理
        eventHandle: function () {
            // 单选
            $(document).on('touchend', '#option .itemWrap', function(){
                $('#option .itemWrap').removeClass('active');
                $(this).addClass('active');
            });

            // 退出登录
            $(document).on('touchend', '#quit', function () {
                window.location.href = 'index.html';
            });
            // 再测一次
            $(document).on('touchend', '#again', function () {
                window.location.href = 'testSelect.html';
            });
        },
        setProgress: function () {
            var percent = (1 / this.question.length) * 100;
            var _width = (this.curIndex + 1) * percent + '%';
            $('.progress-in').animate({
                width: _width
            },500, 'linear',function () {
            })
        },
        // 获取下一道题的相关数据并展现
        next: function () {
            this.isShowAnswer = !this.isShowAnswer;
            this.curIndex += 1;
            this.itemData = this.question[this.curIndex];
            this.setProgress();
        },
        // 答题结束，跳转至首页
        finish: function () {
            $('.mask,.finishBoxMask,.finishBox').show();
        },
        // 提交所做答案
        submit: function () {
            var myAnswer = $('#option .itemWrap.active').text();
            this.itemData['myAnswer'] = myAnswer;
            this.isShowAnswer = !this.isShowAnswer;
        },
    },
    // 过滤器
    filters: {
        observe: function(_filter, cont){
            if(cont.length == 0){
                return '无';
            } else {
                return cont.join('、');
            }
        },
    }
});
