(function(win, doc) {
    var _clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var _fontSize = _clientWidth / 10;

    document.documentElement.style.fontSize = _fontSize + 'px';
})(window, document);

// 实现核心： 页面宽度 = 页面根元素的fontSize大小