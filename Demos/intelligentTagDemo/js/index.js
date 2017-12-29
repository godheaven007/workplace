/**
 * author: xusf
 * description: 智能标签Demo演示
 * createDate: 2017-12-14
 */

var vm = new Vue({
    el:'#app',
    data:{
        subject: '02',
        showFlag: false,
        listData: [],                               // 数据列表
        questionData: [],                           // 题型数据集合
        indicatorALL: [],                           // 指标整体数据集合
        indicatorCur: [],                           // 当前指标数据
        indicatorConvert: [],                       // 指标转换数据集合
        indicatorList: [],                          // 指标数据显示
        matchQuestion: {},                          // 当前匹配题型数据
        url: {
            question: 'data/question.json',
            indicator: 'data/indicator.json',
            indicatorConvert: 'data/indicatorConvert.json'
        },
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

            // 题型数据
            this.$http.get(this.url.question).then(function(res){
                // 请求成功
                _this.questionData = res.body;
            },function(res){
                // 请求失败
            });

            // 指标整体数据
            this.$http.get(this.url.indicator).then(function(res){
                // 请求成功
                _this.indicatorALL = res.body;
                _this.indicatorCur = _this.indicatorALL[_this.subject];
            },function(res){
                // 请求失败
            })

            // 指标转换数据
            this.$http.get(this.url.indicatorConvert).then(function(res){
                // 请求成功
                _this.indicatorConvert = res.body;
                _this.indicatorList = _this.indicatorConvert[_this.subject];
            },function(res){
                // 请求失败
            })
        },
        // 事件处理
        eventHandle: function () {
            var _this = this;

            // 下拉框
            $(document).on('click', '.dropDownBox', function (e) {
                e.stopPropagation();
                $('.dropDownBox').removeClass('active');
                $(this).addClass('active');
            });
            $(document).on('click', '.dropDownBox .dropDownList li', function (e) {
                e.stopPropagation();
                var text = $(this).text(),
                    value = $(this).attr('value');

                $(this).parents('.dropDownList').prev().text(text).attr('value', value);
                $(this).parents('.dropDownBox').removeClass('active');
                _this.showFlag = false;
                _this.subject = value;
                _this.indicatorList = _this.indicatorConvert[_this.subject];
                _this.indicatorCur = _this.indicatorALL[_this.subject];
            });
            $(document).on('click', 'html,body', function () {
                $('.dropDownBox').removeClass('active');
            });

            // 确定
            $(document).on('click', '.dropDownConfirm', function () {

                var $convertArea = $('#convertArea'),
                    content = $.trim($convertArea.val());

                if(content == '') {
                    easyDialog.open({
                        container : {
                            header : '提示',
                            content : '未匹配到相应试题！',
                            yesFn : _this.btnYesFn,
                            yesText: '确&nbsp;&nbsp;定'
                        }
                    });
                    return;
                }

                var data = _this.questionData[_this.subject];
                // TODO.... 查找不到题型应该提示
                _this.getMatchQuestion(data, content);
            });

            // 监控输入框内容变化
            $(document).on('input propertychange', '#convertArea', function(){
                var $convertArea = $('#convertArea'),
                    content = $.trim($convertArea.val());
                if(content == '') {
                    _this.showFlag = false;
                }
            });

            // 重置
            $(document).on('click', '.resetBtn', function(){
                var $convertArea = $('#convertArea');
                $convertArea.val('');
                _this.listData = [];
                _this.showFlag = false;
            });
        },

        // 验证判断
        check: function () {

        },

        btnYesFn: function () {

        },
        // 获取匹配的题型数据
        getMatchQuestion: function(data, content) {
            // 重置显示数据
            this.listData = [];
            this.matchQuestion = {};
            this.showFlag = false;
            for(var i = 0, length = data.length; i < length; i++) {
                if(content.indexOf(data[i].keywords) !== -1) {
                    this.matchQuestion = data[i];
                    break;
                }
            }

            if(!Object.keys(this.matchQuestion).length) {
                easyDialog.open({
                    container : {
                        header : '提示',
                        content : '未匹配到相应试题！',
                        yesFn : this.btnYesFn,
                        yesText: '确&nbsp;&nbsp;定'
                    }
                });
                return;
            }
            this.showFlag = true;

            var scorePoints = JSON.parse(this.matchQuestion.score_points);         // 得分点
            var pWeight = JSON.parse(this.matchQuestion.p_weight);                 // 权重

            for(var p in pWeight) {
                var ques = pWeight[p];        // 小题
                for(var q in ques) {
                    var tempObj = {};
                    tempObj['score'] = scorePoints[p][q];
                    tempObj['point'] = '(' + p + ')-' + q;
                    // 三个维度
                    var dimension = ques[q];
                    for(var dimen in dimension) {
                        if(dimen == 1) {
                            // 知识
                            this.setKnowledgeWeight(tempObj, dimension[dimen]);
                        } else if(dimen == 2) {
                            // 技能
                            this.setSkillWeight(tempObj, dimension[dimen]);
                        } else if(dimen == 3) {
                            // 能力
                            this.setAbilityWeight(tempObj, dimension[dimen]);
                        }
                    }
                    this.listData.push(tempObj);
                }
            }
        },

        // 设置知识权重
        setKnowledgeWeight: function (tempObj, data) {
            if(typeof tempObj['knowledge'] == 'undefined') {
                tempObj['knowledge'] = [];
                for(var i = 0; i < this.indicatorList.knowledge.length; i++) {
                    tempObj['knowledge'][i] = '';
                }
            }

            for(var key in data) {
                // 该指标在知识权重中的位置
                var name = this.indicatorCur[key].name;
                var index = this.indicatorList.knowledge.indexOf(name);
                if(index !== -1) {
                    tempObj['knowledge'][index] = data[key];
                }
            }
        },

        // 设置技能权重
        setSkillWeight: function (tempObj, data) {
            if(typeof tempObj['skill'] == 'undefined') {
                tempObj['skill'] = [];
                for(var i = 0; i < this.indicatorList.skill.length; i++) {
                    tempObj['skill'][i] = '';
                }
            }

            for(var key in data) {
                // 该指标在知识权重中的位置
                var name = this.indicatorCur[key].name;
                var index = this.indicatorList.skill.indexOf(name);
                if(index !== -1) {
                    tempObj['skill'][index] = data[key];
                }
            }
        },

        // 设置能力权重
        setAbilityWeight: function (tempObj, data) {
            if(typeof tempObj['ability'] == 'undefined') {
                tempObj['ability'] = [];
                for(var i = 0; i < this.indicatorList.ability.length; i++) {
                    tempObj['ability'][i] = '';
                }
            }

            for(var key in data) {
                // 该指标在知识权重中的位置
                var name = this.indicatorCur[key].name;
                var index = this.indicatorList.ability.indexOf(name);
                if(index !== -1) {
                    tempObj['ability'][index] = data[key];
                }
            }

        },

        // 过滤html标签
        filterHtmlTag: function (content) {
            content = content.replace(/<\/?[^>]*>/g,''); //去除HTML tag
            content = content.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
            content = content.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
            content = content.replace(/&nbsp;/ig,'');//去掉&nbsp;
            return content;
        }
    },
    // 过滤器
    filters: {}
});
