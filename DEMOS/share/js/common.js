/**
 * author: xusf
 * createDate: 2018-6-8
 * description: 共用JS
 */

var Common = {
    // 微信浏览器禁止页面下拉查看网址
    overScroll: function (el) {
        el.addEventListener('touchstart', function() {
            var top = el.scrollTop
                , totalScroll = el.scrollHeight
                , currentScroll = top + el.offsetHeight;
            //If we're at the top or the bottom of the containers
            //scroll, push up or down one pixel.
            //
            //this prevents the scroll from "passing through" to
            //the body.
            if(top === 0) {
                el.scrollTop = 1;
            } else if(currentScroll === totalScroll) {
                el.scrollTop = top - 1;
            }
        });
        el.addEventListener('touchmove', function(evt) {
            //if the content is actually scrollable, i.e. the content is long enough
            //that scrolling can occur
            if(el.offsetHeight < el.scrollHeight)
                evt._isScroller = true;
        });
    },
    isIphone6Plus: function () {
        var h = window.innerHeight,
            w = window.innerWidth,
            useragent = navigator.userAgent.toLowerCase(),
            isP6p = false;
        //  && ( h>w ? (Math.abs(w-414)<10 && h<=736) : (Math.abs(w-736)<10) && h<=414)
        if(useragent.match(/mobile/i)!==null ) {
            if(useragent.match(/iphone/i)!==null){
               if(window.screen.width == 414){
                   isP6p = true;
               }
            }
        }
        return isP6p;
    },
    // 检测手机平台
    checkPlatform: function () {
        var platform = 'ios';
        if(/android/i.test(navigator.userAgent)){
            platform =  'android';
        } else if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
            platform =  'ios';
        }
        return platform;
    },
};
