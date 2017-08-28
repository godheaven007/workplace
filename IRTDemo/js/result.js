/**
 * author: xusf
 * description: 诊断结果页
 * createDate: 2017-4-18
 */

var vm = new Vue({
    el:'#app',
    data:{
        listData:[],                    // 该分组下的所有数据
        knowledgeData:[],               // 该答题路径对应的知识点数据（*100）
        knowledgeData2:[],              // 该答题路径对应的知识点数据（原始数据）
        skillData:[],                   // 该答题路径对应的技能点数据
        abilityData:[],                 // 该答题路径对应的能力点数据
        knowledgePoints:[],             // 知识点名称
        skillPoints: [],                // 技能点名称
        abilityPoints:[],               // 能力点名称
        isShowHistory: false,           // 是否显示历时按钮
        isOverFlowHidden:false,         // middle布局是否改变
        myMaster: 0,                    // 我的知识掌握度
        aveMaster: 54,                  // 平均水平的学生知识掌握度
        level: 0,                       // 处于哪一阶段
        map: {},                        // 数组值与索引之间的映射
        options:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O'],          // 序号
        url: 'data/dataHandle.json',
        group: 0,                       // 答题分组
        path: '',                       // 答题路径
    },
    mounted:function () {
        // 注意！！！mounted并不能保证钩子函数中的 this.$el 在 document 中
        this.$nextTick(function(){
            // 页面加载获取请求数据（类似于Jquery中的ready函数）
            this.getInitData();
            this.eventHandle();
            // this.getAdvanceData();
        })
    },
    methods:{
        // 删除重复数据
        removeDuplicatedItem: function (ar) {
            var ret = [];

            ar.forEach(function(e, i, ar) {
                if (ar.indexOf(e) === i) {
                    ret.push(e);
                }
            });
            return ret;
        },
        // 处理重复数据
        getAdvanceData: function () {
            var _this = this;
            this.$http.get(this.url).then(function(res){
                _this.listData = res.body.path;
                var arr = [];
                var that = _this;
                $.each(_this.listData[2], function (key, value) {
                    arr = value[3];
                    arr = that.removeDuplicatedItem(arr);
                    if(arr.length == 14){
                        console.log(key, value[0])
                    }
                })

            },function(res){
                // 请求失败
            })
        },

        // 获取报告列表数据
        getInitData: function () {
            var _this = this;
            $('.mask').hide();
            this.$http.get(this.url).then(function(res){
                // 请求成功
                // 历时数据判断
                var history = localStorage.getItem('irtHistory');
                if(history !== null){
                    history = JSON.parse(history);
                    if(history.length >= 2){
                        _this.isShowHistory = true;
                    }
                }
                // 获取分组数据以及答题路径
                var result = localStorage.getItem('irtResult');
                if(result !== null){
                    result = JSON.parse(result);
                    _this.group = result.group;
                    _this.path = result.path;
                    _this.listData = res.body.path[_this.group];
                    // 各维度知识点名称
                    _this.knowledgePoints = res.body.point.knowledge;
                    _this.skillPoints = res.body.point.skill;
                    _this.abilityPoints = res.body.point.ability;
                    // 获取该答题路径对应的知识点数据
                    _this.getData();
                    // 线性图
                    _this.showLine();
                    // 测验结果
                    _this.myMaster = _this.getKnowledgeMaster();
                }
            },function(res){
                // 请求失败
            })
        },

        showLine: function () {
            // 知识维度、技能维度、能力维度线性图
            // 知识维度
            var is6Plus = Common.isIphone6Plus();
            // iPhone5,5s,6,6s
            var fontSize = 18;
            // 适配iPhone6Plus
            if(is6Plus){
                fontSize = 28;
            }
            Fun.setResult(1,this.options, this.knowledgeData, fontSize);
            // 技能维度
            Fun.setResult(2,this.options.slice(0,4), this.skillData, fontSize);
            // 能力维度
            Fun.setResult(3,this.options.slice(0,2), this.abilityData, fontSize);
        },
        // 事件处理
        eventHandle: function () {
            var _this = this;
            // 进阶训练
            $(document).on('touchend', '#advance', function(){
                _this.advanceDataPreHandle();
                window.location.href = 'advance.html';
            });
            // 关闭九阶说明
            $(document).on('touchend', '#close', function(){
                $('.helpInfo,.mask').hide();
                _this.isOverFlowHidden = false;
            });
            // 展开九阶说明
            $(document).on('touchend', '.nineJie', function(){
                _this.isOverFlowHidden = true;
                $('.helpInfo,.mask').show();
            });

            // 点击展开
            $(document).on('touchend', '.toggle.show i', function(){
                $(this).parent().next().show();
                $(this).parent().hide();
                $(this).parent().prev().slideDown();
            });
            // 点击收起
            $(document).on('touchend', '.toggle.hide i', function(){
                $(this).parent().prev().show();
                $(this).parent().hide();
                $(this).parent().prev().prev().slideUp();
            });
        },
        // 阶段训练数据预处理
        advanceDataPreHandle: function () {
            // 数组复制
            var copyArr = this.knowledgeData2.concat();

            // 数组值与索引建立映射
            for(var i = 0; i < copyArr.length; i++){
                var key = copyArr[i];
                this.map[key] = i;
            }
            copyArr.sort(function (a,b) {
                return a - b;
            });
            this.filterData(copyArr);
        },
        // 过滤数据
        filterData: function (arr) {
            // 筛选知识点掌握度最低的5个
            var lowestFive = arr.slice(0,5);
            var advance = [];

            for(var i = 0; i < lowestFive.length; i++){
                var obj = {};
                obj["knowledgeIndex"] = this.map[lowestFive[i]];            // 知识点所处的索引
                obj["knowledgeMaster"] = lowestFive[i];                     // 知识点掌握度
                advance.push(obj);
            }
            localStorage.setItem('irtAdvance', JSON.stringify(advance));
        },
        // 获取知识点、技能点、能力点数据
        getData: function () {
            var _this = this;
            $.each(this.listData, function (key,value) {
                var knowledgeArr = [],
                    skillArr = [],
                    abilityArr = [];
                if(_this.path == key){
                    $.each(value[3], function (index, val) {
                        knowledgeArr.push(Math.round(val * 100));
                    });
                    $.each(value[5], function (index, val) {
                        skillArr.push(Math.round(val * 100));
                    });
                    $.each(value[7], function (index, val) {
                        abilityArr.push(Math.round(val * 100));
                    });
                    _this.knowledgeData2 = value[3];
                    _this.knowledgeData = knowledgeArr;
                    _this.skillData = skillArr;
                    _this.abilityData = abilityArr;
                    return;
                }
            });
        },
        // 知识掌握程度
        getKnowledgeMaster: function () {
            var sum = 0,
                ave = 0,
                length = this.knowledgeData.length;
            for(var i = 0; i < length; i++){
                sum += this.knowledgeData[i];
            }
            ave = Math.round(sum / length);
            if(ave >= 0 && ave < 20){
                this.level = 1;
            } else if(ave >= 20 && ave < 40){
                this.level = 2
            } else if(ave >= 40 && ave < 60){
                this.level = 3;
            } else if(ave >= 60 && ave < 67.5){
                this.level = 4;
            } else if(ave >= 67.5 && ave < 75){
                this.level = 5;
            } else if(ave >= 75 && ave < 82.5){
                this.level = 6;
            } else if(ave >= 82.5 && ave < 90){
                this.level = 7;
            } else if(ave >= 90 && ave < 95){
                this.level = 8;
            } else {
                this.level = 9;
            }
            return ave;
        },
        // 返回至答题页
        back: function () {
            window.location.href = 'answer.html';
        },
        // 跳转至历时诊断报告
        link: function () {
            if(Common.checkPlatform() == 'ios'){
                window.location.href = "history.html";
            } else if(Common.checkPlatform() == 'android'){
                window.location.href = "historyAndroid.html";
            }

        }
    },
    filters: {
        levelFilter: function (_filter, level) {
            switch (level){
                case 1: return '不堪一击'; break;
                case 2: return '初学乍练'; break;
                case 3: return '初窥门径'; break;
                case 4: return '登堂入室'; break;
                case 5: return '驾轻就熟'; break;
                case 6: return '融会贯通'; break;
                case 7: return '炉火纯青'; break;
                case 8: return '出神入化'; break;
                case 9: return '登峰造极'; break;
            }
        }
    }
});
