/**
 * author: xusf
 * createDate: 2018/06/07
 * 皮皮狐-报告分享
 */
var vm = new Vue({
    el:'#app',
    data:{
        url: "data/share.json", // 测试数据
        // url: url,
        dataState: "",      // 有无历史数据：1：有，2：无
        personalInfo: "",   // 用户信息
        rankTopData: [],    // 排名数据1
        rankMidData: [],    // 排名数据2
        radarData: [],      // 雷达数据
        exceedData: [],     // 超越同龄人的指标据
        exceedTextData: [],
        exceedText: "",
        behindData: [],     // 落后同龄人的指标据
        behindTextData: [],
        behindText: "",
    },
    mounted:function () {
        // 注意！！！mounted并不能保证钩子函数中的 this.$el 在 document 中
        this.$nextTick(function(){
            // 页面加载获取请求数据（类似于Jquery中的ready函数）
            this.getInitData();
        })
    },
    methods:{
        // 获取报告列表数据
        getInitData: function () {
            var _this = this;
            this.$http.get(this.url).then(function(res){
                if(res.body.status == 0) {
                    // 请求成功
                    var _data = res.body.data;
                    _this.dataState = _data.dataState;
                    _this.personalInfo = _data.user;
                    // 排名数据
                    _this.rankTopData = _data.now.left.leftData;
                    _this.rankMidData = _data.now.right.rightData;
                    // 雷达数据
                    _this.radarData = _data.radar.contData;
                    // 超越同龄人的指标
                    _this.exceedData = _data.radar.targeName.first;
                    _this.exceedTextData = _data.radar.text.firstText;
                    _this.exceedText = _this.exceedTextData.join("");
                    // 落后同龄人的指标
                    _this.behindData = _data.radar.targeName.end;
                    _this.behindTextData = _data.radar.text.endText;
                    _this.behindText = _this.behindTextData.join("");


                    setTimeout(function() {
                        if(_this.dataState == 1 || _this.dataState == 0) {
                            var graphChart = echarts.init(document.getElementById('graph'));
                            if(_this.radarData.length < 3) {
                                // 柱状图
                                graphChart.setOption(Graph.getBarOption(_this.radarData));
                            } else {
                                // 雷达图
                                graphChart.setOption(Graph.getRadarOption(_this.radarData));
                            }
                        }
                    },10)
                }
            },function(res){
                // 请求失败
            })
        },
        // 下载
        download: function() {
            var platForm = Common.checkPlatform();
            if(platForm == "android") {
                window.location.href = "http://www.baidu.com";
            } else {
                window.location.href = "https://itunes.apple.com/cn/app/id1345855795?mt=8";
            }
        },
    },
    // 过滤器
    filters: {
        filterSuggest: function(_filter, cont){
            if(!cont.length) {
                return '无11';
            }
        },
    }
});

var Graph = {
    // 获取雷达图配置参数
    getRadarOption: function(data) {
        var indicator = [],                      // 指示器名称
            personData = [],                   	 // 个人表现
            colonyData =[];           			 // 群体表现

        for(var i = 0, length = data.length; i < length; i++) {
            indicator[i] = { name: data[i]['name'], max: 100};
            personData[i] = parseFloat(data[i]['ratio']);
            colonyData[i] = parseFloat(data[i]['colony']);
        }
        indicator[0]['axisLabel'] = {show:true, formatter: '{value}%'};

        var setting = {
            fontSize: 20,
            nameGap: 20
        };
        if(Common.checkPlatform() == "android") {
            setting.fontSize = 12;
            setting.nameGap = 8;
        }
        return {
            tooltip : {
                show: false,
            },
            calculable : false,
            radar: [
                {
                    indicator: indicator,
                    center: ['50%', '56%'],
                    radius: '70%',
                    startAngle: 90,
                    splitNumber: 5,
                    nameGap: setting.nameGap,
                    z:1,
                    name: {
                        textStyle: {
                            color:'#999',
                            fontSize: setting.fontSize
                        }
                    },
                    axisLine: {
                        show:false,
                    },
                    splitLine: {
                        show:true,
                        lineStyle:{
                            color:['#999'],
                            width:1,
                            type:'dashed'
                        }
                    },
                    splitArea:{
                        show:false,
                    },
                    axisLabel: {
                        show: false,
                        textStyle: {
                            color: '#999',
                            fontSize:setting.fontSize
                        }
                    }
                }
            ],
            series: [
                {
                    name: '雷达图',
                    type: 'radar',
                    symbol: 'none',
                    animation: false,
                    data: [
                        {
                            value:personData ,
                            name: '个人表现',
                            z:4,
                            itemStyle: {
                                normal: {
                                    color:'#a8c4fc',
                                    lineStyle: {
                                        color:  '#a8c4fc',
                                        width: 3,
                                    }
                                }
                            }
                        },
                        {
                            value: colonyData,
                            name: '群体表现',
                            z:5,
                            itemStyle: {
                                normal: {
                                    color:'#f984b3',
                                    lineStyle: {
                                        color:  '#f984b3',
                                        width: 3
                                    }
                                }
                            }
                        }

                    ]
                }
            ]
        }
    },

    // 获取柱状图配置参数
    getBarOption: function(data) {
        var indicator = [],             // x轴名称
            personData = [],          // 个人表现数据
            colonyData = [];             // 群体表现数据

        for(var i = 0, length = data.length; i < length; i++) {
            indicator[i] = data[i].name;
            personData[i] = parseFloat(data[i]['ratio']);
            colonyData[i] = parseFloat(data[i]['colony']);
        }
        var setting = {
            fontSize: 20,
            barWidth: 40
        };
        if(Common.checkPlatform() == "android") {
            setting.fontSize = 12;
            setting.barWidth = 24;
        }

        return {
            grid: {
                left: 20,
                right: 40,
                bottom: 20,
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data :indicator,
                    axisLabel:{
                        textStyle:{
                            color: '#585858',
                            fontSize: setting.fontSize
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick:{
                        show: false
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    splitLine:{
                        show:true
                    },
                    splitArea:{
                        show:true,
                        areaStyle:{
                            color:['rgba(204,221,255,1)','rgba(204,221,255,0.8)','rgba(217,229,254,0.6)','rgba(229,237,255,0.4)','rgba(242,246,254,0.2)']
                        }
                    },
                    axisLabel:{
                        formatter: '{value}%',
                        textStyle:{
                            color: '#585858',
                            fontSize: setting.fontSize
                        },
                    },
                    interval:20,
                    splitNumber:5,
                    min:0,
                    max:100,
                }
            ],
            series : [
                {
                    name:'个人表现',
                    type:'bar',
                    z: 3,
                    itemStyle:{
                        normal:{
                            barBorderRadius:[20, 20, 20, 20],
                            color: '#a8c4fc'
                        }
                    },
                    barWidth: setting.barWidth,
                    data:personData,
                },
                {
                    name:'群体表现',
                    type:'bar',
                    z: 3,
                    itemStyle:{
                        normal:{
                            barBorderRadius:[20, 20, 20, 20],
                            color: '#f984b3'
                        }
                    },
                    barWidth: setting.barWidth,
                    data:colonyData,
                }
            ]
        }
    }
}
