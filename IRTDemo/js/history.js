/**
 * author: xusf
 * description: 历时页面
 * createDate: 2017-4-20
 */

var vm = new Vue({
    el:'#app',
    data:{
        listData:[],                    // 该分组下的所有数据
        generalData:[],                 // 整体知识水平数据
        knowledgeData:[],               // 该答题路径对应的知识点数据（2维数组）
        skillData:[],                   // 该答题路径对应的技能点数据（2维数组）
        abilityData:[],                 // 该答题路径对应的能力点数据（2维数组）
        knowledgePoints:[],             // 知识点名称
        skillPoints: [],                // 技能点名称
        abilityPoints:[],               // 能力点名称
        options:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O'],          // 序号
        url: 'data/dataHandle.json',
        historyData: []
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
            this.$http.get(this.url).then(function(res){
                // 请求成功
                _this.listData = res.body.path;
                _this.knowledgePoints = res.body.point.knowledge;
                _this.skillPoints = res.body.point.skill;
                _this.abilityPoints = res.body.point.ability;
                // 获取历史数据
                if(localStorage.getItem('irtHistory') !== null){
                    _this.historyData = JSON.parse(localStorage.getItem('irtHistory'));// 获取所有历史记录数据
                    // 历时报告，只有在做过超过2次的情况下才生效
                    if(_this.historyData.length >= 2){
                        _this.getData();
                        _this.showLine();
                    }
                }
            },function(res){
                // 请求失败
            })
        },
        showLine: function () {
            var is6Plus = Common.isIphone6Plus();
            // iPhone5,5s,6,6s
            var fontSize = 18;
            // 适配iPhone6Plus
            if(is6Plus){
                fontSize = 28;
            }

            // 整体知识水平、知识维度、技能维度、能力维度线性图
            if(this.historyData.length == 2){
                // 整体知识水平
                Fun.setLine(1, ["第一次","第二次"], this.generalData, fontSize);
                // 知识维度
                Fun.setLine2(2,this.options, this.knowledgeData, fontSize);
                // 技能维度
                Fun.setLine2(3,this.options.slice(0,4), this.skillData, fontSize);
                // 能力维度
                Fun.setLine2(4,this.options.slice(0,2), this.abilityData, fontSize);
            } else {
                // 整体知识水平
                Fun.setLine(1, ["第一次","第二次","第三次"], this.generalData, fontSize);
                // 知识维度
                Fun.setLine3(2,this.options, this.knowledgeData, fontSize);
                // 技能维度
                Fun.setLine3(3,this.options.slice(0,4), this.skillData, fontSize);
                // 能力维度
                Fun.setLine3(4,this.options.slice(0,2), this.abilityData, fontSize);
            }
        },
        // 事件处理
        eventHandle: function () {
            var _this = this;
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
        // 获取知识点、技能点、能力点数据
        getData: function () {
            var _this = this;
            var group,              // 分组数据
                path,               // 答题路径
                itemData;           //
            // 遍历作答历史记录
            for(var i = 0; i < this.historyData.length; i++){
                group = this.historyData[i]['group'];
                path = this.historyData[i]['path'];
                itemData = this.listData[group];

                var knowledgeArr = [],
                    skillArr = [],
                    abilityArr = [];
                $.each(itemData, function (key, curPathData) {
                    if(path == key){
                        // 知识
                        $.each(curPathData[3], function (index, val) {
                            knowledgeArr.push(Math.round(val * 100));
                        });
                        // 技能
                        $.each(curPathData[5], function (index2, val2) {
                            skillArr.push(Math.round(val2 * 100));
                        });
                        // 能力
                        $.each(curPathData[7], function (index2, val2) {
                            abilityArr.push(Math.round(val2 * 100));
                        });
                        // _this.generalData.push(parseInt(curPathData[1] * 100));
                        _this.generalData.push(_this.getKnowledgeMaster(curPathData[3]));
                        _this.knowledgeData.push(knowledgeArr);
                        _this.skillData.push(skillArr);
                        _this.abilityData.push(abilityArr);
                        return;
                    }
                })
            }
        },
        // 整体知识水平
        getKnowledgeMaster: function (knowledgeData) {
            var sum = 0,
                ave = 0,
                length = knowledgeData.length;
            for(var i = 0; i < length; i++){
                sum += knowledgeData[i] * 100;
            }
            ave = Math.round(sum / length);
            return ave;
        },
    },
    filters: {

    }
});
