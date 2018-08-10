// 动态rem
(function() {
    var styleNode = document.createElement('style');
    document.head.appendChild(styleNode);
    var _width = document.documentElement.clientWidth || document.body.clientWidth,
        _fontSize = _width / 10;
    styleNode.innerHTML = `html {font-size: ${_fontSize}px!important;}`;
})();