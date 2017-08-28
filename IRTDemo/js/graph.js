/**
 * author: xusf
 * createDate: 2017-04-18
 * description: 公共JS方法
 */

var Fun = {
    /**
     * 线性图设置
     * @param _index
     * @param _xAxisData  x轴各个名称
     * @param _data       x轴对应的数据
     */
    // 一条线
    setLine: function (_index, _xAxisData, _data, _fontSize) {
        var lineChart = echarts.init(document.getElementById('line' + _index));
        lineChart.setOption(this.getLineOption(_xAxisData, _data, _fontSize));
    },
    getLineOption: function (_xAxisData, _data, _fontSize) {
        return {
            grid: {
                left: '8%',
                right: '8%',
                bottom: '8%',
                containLabel: true,
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    nameGap: 25,
                    splitArea:{
                        show: true,
                        // areaStyle: {
                        // 	color: ['#fff','rgba(230,230,230,0.9)']
                        // },
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#666',
                            width: 2
                        }
                    },
                    axisTick:{show:false},
                    axisLabel:{
                        show:true,
                        textStyle:{
                            fontSize: _fontSize
                        },
                        margin: 16
                    },
                    z:2,
                    data: _xAxisData
                }
            ],
            yAxis : [
                {
                    type: 'value',
                    name: '(%)',
                    nameTextStyle:{
                        fontSize:_fontSize
                    },
                    nameGap: 25,
                    min:0,
                    max:100,
                    splitLine: {
                        lineStyle: {
                            color: '#c4c4c4',
                            width: 1,
                            type: 'dashed'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#666',
                            width: 2
                        }
                    },
                    axisLabel:{
                        textStyle:{
                            fontSize: _fontSize
                        },
                        margin: 16
                    },
                    axisTick:{show:false},
                    interval:50,
                    z:1
                }
            ],
            series : [
                {
                    type:'line',
                    data: _data,
                    // symbol: 'none',
                    // symbolSize:0,
                    lineStyle:{
                        normal:{
                            color: '#f9cb00'
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#666',
                                fontSize: _fontSize
                            }
                        }
                    },
                    itemStyle:{
                        normal:{
                            borderColor: '#f9cb00',
                            borderWidth: 2,
                        }
                    },
                    markLine: {
                        symbolSize:0,
                        label:{
                          normal:{
                              textStyle: {
                                  fontSize: _fontSize
                              }
                          }
                        },
                        lineStyle:{
                            normal:{
                                color:'#f00'
                            }
                        },
                        data: [
                            {
                                type: 'average',
                                name: '平均值1',
                                label:{
                                    normal:{
                                        show: true,
                                        formatter: function(obj){
                                            return parseInt(obj.data.value);
                                        }
                                    }
                                }
                            }
                        ],
                    },
                }
            ],
            animation:false
        }
    },
    // 两条线
    setLine2: function (_index, _xAxisData, _data, _fontSize) {
        var lineChart = echarts.init(document.getElementById('line' + _index));
        lineChart.setOption(this.getLineOption2(_xAxisData, _data, _fontSize));
    },
    getLineOption2: function (_xAxisData, _data, _fontSize) {
        return {
            grid: {
                left: '8%',
                right: '8%',
                bottom: '8%',
                containLabel: true,
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    nameGap: 25,
                    splitArea:{
                        show: true,
                        // areaStyle: {
                        // 	color: ['#fff','rgba(230,230,230,0.9)']
                        // },
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#666',
                            width: 2
                        }
                    },
                    axisTick:{show:false},
                    axisLabel:{
                        show:true,
                        textStyle:{
                            fontSize: _fontSize
                        },
                        margin: 16
                    },
                    z:2,
                    data: _xAxisData
                }
            ],
            yAxis : [
                {
                    type: 'value',
                    name: '(%)',
                    nameTextStyle:{
                        fontSize:_fontSize
                    },
                    nameGap: 25,
                    min:0,
                    max:100,
                    splitLine: {
                        lineStyle: {
                            color: '#c4c4c4',
                            width: 1,
                            type: 'dashed'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#666',
                            width: 2
                        }
                    },
                    axisLabel:{
                        textStyle:{
                            fontSize: _fontSize
                        },
                        margin: 16
                    },
                    axisTick:{show:false},
                    interval:20,
                    z:1
                }
            ],
            series : [
                {
                    type:'line',
                    data: _data[0],
                    symbol: 'none',
                    symbolSize:0,
                    lineStyle:{
                        normal:{
                            color: '#3db8cf'
                        }
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'top',
                            textStyle: {
                                color: '#666',
                                fontSize: 18
                            }
                        }
                    },
                    itemStyle:{
                        normal:{
                            borderColor: '#3db8cf',
                            borderWidth: 2,
                        }
                    }
                },
                {
                    type:'line',
                    data: _data[1],
                    symbol: 'none',
                    symbolSize:0,
                    lineStyle:{
                        normal:{
                            color: '#f9cb00'
                        }
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'top',
                            textStyle: {
                                color: '#666',
                                fontSize: 18
                            }
                        }
                    },
                    itemStyle:{
                        normal:{
                            borderColor: '#f9cb00',
                            borderWidth: 2,
                        }
                    }
                }
            ],
            animation:false
        }
    },
    // 三条线
    setLine3: function (_index, _xAxisData, _data, _fontSize) {
        var lineChart = echarts.init(document.getElementById('line' + _index));
        lineChart.setOption(this.getLineOption3(_xAxisData, _data, _fontSize));
    },
    getLineOption3: function (_xAxisData, _data, _fontSize) {
        return {
            grid: {
                left: '8%',
                right: '8%',
                bottom: '8%',
                containLabel: true,
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    nameGap: 25,
                    splitArea:{
                        show: true,
                        // areaStyle: {
                        // 	color: ['#fff','rgba(230,230,230,0.9)']
                        // },
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#666',
                            width: 2
                        }
                    },
                    axisTick:{show:false},
                    axisLabel:{
                        show:true,
                        textStyle:{
                            fontSize: _fontSize
                        },
                        margin: 16
                    },
                    z:2,
                    data: _xAxisData
                }
            ],
            yAxis : [
                {
                    type: 'value',
                    name: '(%)',
                    nameTextStyle:{
                        fontSize:_fontSize
                    },
                    nameGap: 25,
                    min:0,
                    max:100,
                    splitLine: {
                        lineStyle: {
                            color: '#c4c4c4',
                            width: 1,
                            type: 'dashed'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#666',
                            width: 2
                        }
                    },
                    axisLabel:{
                        textStyle:{
                            fontSize: _fontSize
                        },
                        margin: 16
                    },
                    axisTick:{show:false},
                    interval:20,
                    z:1
                }
            ],
            series : [
                {
                    type:'line',
                    data: _data[0],
                    symbol: 'none',
                    symbolSize:0,
                    lineStyle:{
                        normal:{
                            color: '#3db8cf'
                        }
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'top',
                            textStyle: {
                                color: '#666',
                                fontSize: 18
                            }
                        }
                    },
                    itemStyle:{
                        normal:{
                            borderColor: '#3db8cf',
                            borderWidth: 2,
                        }
                    }
                },
                {
                    type:'line',
                    data: _data[1],
                    symbol: 'none',
                    symbolSize:0,
                    lineStyle:{
                        normal:{
                            color: '#f9cb00'
                        }
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'top',
                            textStyle: {
                                color: '#666',
                                fontSize: 18
                            }
                        }
                    },
                    itemStyle:{
                        normal:{
                            borderColor: '#f9cb00',
                            borderWidth: 2,
                        }
                    }
                },
                {
                    type:'line',
                    data: _data[2],
                    symbol: 'none',
                    symbolSize:0,
                    lineStyle:{
                        normal:{
                            color: '#f82217'
                        }
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'top',
                            textStyle: {
                                color: '#666',
                                fontSize: 18
                            }
                        }
                    },
                    itemStyle:{
                        normal:{
                            borderColor: '#f82217',
                            borderWidth: 2,
                        }
                    }
                }
            ],
            animation:false
        }
    },

    // result
    setResult: function (_index, _xAxisData, _data, _fontSize) {
        var lineChart = echarts.init(document.getElementById('line' + _index));
        lineChart.setOption(this.getLineOptionResult(_xAxisData, _data, _fontSize));
    },
    getLineOptionResult: function (_xAxisData, _data, _fontSize) {
        return {
            grid: {
                left: '8%',
                right: '8%',
                bottom: '8%',
                containLabel: true,
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    nameGap: 25,
                    splitArea:{
                        show: true,
                        // areaStyle: {
                        // 	color: ['#fff','rgba(230,230,230,0.9)']
                        // },
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#666',
                            width: 2
                        }
                    },
                    axisTick:{show:false},
                    axisLabel:{
                        show:true,
                        textStyle:{
                            fontSize: _fontSize,
                        },
                        margin: 16
                    },
                    z:2,
                    data: _xAxisData
                }
            ],
            yAxis : [
                {
                    type: 'value',
                    name: '(%)',
                    nameTextStyle:{
                        fontSize:_fontSize
                    },
                    nameGap: 25,
                    min:0,
                    max:100,
                    splitLine: {
                        lineStyle: {
                            color: '#c4c4c4',
                            width: 1,
                            type: 'dashed'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#666',
                            width: 2
                        }
                    },
                    axisLabel:{
                        textStyle:{
                            fontSize: _fontSize
                        },
                        margin: 16
                    },
                    axisTick:{show:false},
                    interval:20,
                    z:1
                }
            ],
            series : [
                {
                    type:'line',
                    data: _data,
                    symbol: 'none',
                    symbolSize:0,
                    lineStyle:{
                        normal:{
                            color: '#e8600c'
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#666',
                                fontSize: 18
                            }
                        }
                    },
                    itemStyle:{
                        normal:{
                            borderColor: '#e8600c',
                            borderWidth: 2,
                        }
                    }
                }
            ],
            animation:false
        }
    },

};
