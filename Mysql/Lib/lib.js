/**
 * author: xusf
 * create: 2017/09/04
 * description: 一些常用方法的封装实现
 */

var EventUtil = {
    /**
     * 跨浏览器的事件处理程序
     */

    // 绑定事件
    addHandler: function (ele, type, handler) {
        if(ele.addEventListener){
            // Dom2级 false:冒泡阶段 true：捕获阶段
            ele.addEventListener(type, handler, false);
        } else if(ele.attachEvent){
            // IE(需额外加‘on’)
            ele.attachEvent('on' + type, handler);
        } else {
            // Dom0级
            ele['on' + type] = handler;
        }
    },

    // 移除事件
    removeHandler: function (ele, type, handler) {
        if(ele.removeEventListener){
            ele.removeEventListener(type, handler, false);
        } else if(ele.detachEvent){
            ele.detachEvent('on' + type, handler);
        } else {
            // Dom0级
            ele['on' + type] = null;
        }
    },

    /**
     * 事件对象（DOM和IE）
     */

    getEvent: function (event) {
        return event || window.event;
    },

    getTarget: function (event) {
        return event.target || event.srcElement;
    },

    // 阻止默认行为
    preventDefault: function (event) {
        if(event.preventDefault){
            event.preventDefault();
        } else {
            // IE
            event.returnValue = false;
        }
    },

    // 阻止事件冒泡
    stopPropagation: function (event) {
        if(event.stopPropagation){
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};