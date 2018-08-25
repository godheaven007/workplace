/**
 * author: xusf
 * createDate: 2018/08/25
 * description: 弹框组件
 */

(function (win, doc) {
    function Dialog(_config) {
        this.init(_config);
        this.render(this.config);
        this.bind();
    }

    Dialog.prototype = {
        constructor: Dialog,
        // 默认参数(TODO...目前尽量简单话，后期再补充功能)
        config: {
            // 弹框标题
            title: null,
            // 弹框内容
            content: null,
            // 弹框按钮(默认一个红色确认按钮，且不绑定回调函数)
            buttons: null
        },
        // 参数初始化
        init: function (_config) {
            // 若不指定任何参数
            if (Object.prototype.toString.call(_config) !== '[object Object]') {
                return;
            }

            this.config.title = !_config.title ? ' ' : _config.title;
            this.config.content = !_config.content ? '确定不需要弹框内容吗?' : _config.content;
            if (!_config.buttons && Object.prototype.toString.call(_config) !== '[object Array]') {
                // 按钮未传参或传参错误，则指定一个默认为红色的无回调函数的确认按钮
                this.config.buttons = [{
                    text: '确认',
                    color: 'red'
                }];
            } else {
                this.config.buttons = _config.buttons;
            }
        },
        // dom渲染
        render: function (config) {
            this.dialogNode = doc.createElement('div');
            this.dialogNode.className = 'ui-dialog-mask';
            doc.body.appendChild(this.dialogNode);

            this.dialogNode.innerHTML = `<div class="ui-dialog-wrapper animate">
                <div class="ui-dialog-header">
                    <p>${config.title}</p>
                </div>
                <div class="ui-dialog-content">
                    <p>${config.content}</p>
                </div>
                <div class="ui-dialog-bottom">
                    ${this.createBtns(config.buttons)}
                </div>
            </div>`;
        },
        // 按钮生成
        createBtns: function (_arr) {
            let _html = '';
            _arr.forEach((item) => {
                _html += `<div class="ui-dialog-btn ui-dialog-btn-${!item.color ? 'red' : item.color}">${!item.text ? '确认' : item.text}</div>`;
            });
            return _html;
        },
        // 关闭弹框
        close: function () {
            this.dialogNode.remove();
        },
        // 按钮事件(回调函数)
        bind: function () {
            let buttonArr = this.config.buttons;
            let btnNodes = doc.querySelectorAll('.ui-dialog-btn');

            btnNodes.forEach((item, index) => {
                if (!buttonArr[index].callback) {
                    // 若没有指定回调函数，则关闭弹框
                    item.addEventListener('click', () => {
                        this.close();
                    });
                } else {
                    item.addEventListener('click', () => {
                        buttonArr[index].callback();
                        this.close();
                    });
                }
            })
        }
    }

    window.Dialog = {
        open: function (_config) {
            return new Dialog(_config);
        }
    };

})(window, document);