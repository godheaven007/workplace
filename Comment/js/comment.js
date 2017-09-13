/**
 * author: xusf
 * description: 简易评论系统
 * createDate:2017-09-03
 */

var Comment = {
    // 初始化操作
    init: function () {
        this.eventHandle();
        this.getData();
    },

    // 事件绑定
    eventHandle: function () {
        // 下拉框
        $(document).on('click', '.dropDownBox', function (e) {
            e.stopPropagation();
            if($(this).hasClass('active')){
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }
        });

        $(document).on('click', '.dropDownList li', function (e) {
            var text = $(this).text(),
                avatarId = $(this).attr('avatarid');
            $('.dropDownCont').text(text);
            $('#avatar').attr('src','images/' + avatarId + '.jpg');
        });

        $(document).on('click', 'html,body', function (e) {
            $('.dropDownBox').removeClass('active');
        });

        // 提交
        $(document).on('click', '#submit', function () {
            Comment.getData();
        });
    },

    // ajax请求数据
    getData: function () {
        // 表单序列化
        var ttt = $('#comment_form').serializeArray();
        console.log(Object.prototype.toString);
    }
};

$(function () {
   Comment.init();
});
