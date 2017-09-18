/**
 * author: xusf
 * description: 简易评论系统
 * createDate:2017-09-03
 */

var Comment = {
    username: '',           // 用户名
    avatar: 1,              // 头像
    email: '',              // 邮箱
    blog: '',               // 个人网站
    comment: '',            // 评论内容

    // 响应时间过长时,防止用户反复提交
    commitFlag: true,

    // 初始化操作
    init: function () {
        this.eventHandle();
        this.getCurPageData();
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
            Comment.avatar = avatarId;
            $('#avatar').attr('src','images/' + avatarId + '.jpg');
        });

        $(document).on('click', 'html,body', function (e) {
            $('.dropDownBox').removeClass('active');
        });

        // 提交
        $(document).on('submit', '#comment_form', function (e) {
            // 阻止表单默认自动提交
            e.preventDefault();
            if(Comment.commitFlag){
                Comment.commitFlag = false;

                // 可以利用表单序列化进行提交，这里由于头像不是input类型的，所以不能用
                // Comment.getData($(this).serialize());
                Comment.getData();
            }
        });
    },

    // 将时间戳转换为正常日期
    convertUnixDate: function (time) {
        var myDate = new Date(time * 1000),
            year = myDate.getFullYear(),
            month = myDate.getMonth() + 1,
            day = myDate.getDate(),
            hours = myDate.getHours(),
            minutes = myDate.getMinutes(),
            seconds = myDate.getSeconds();

        return year + '年' + month + '月' + day + '日 ' + hours + '时' + minutes + '分' + seconds + '秒';
    },

    // ajax请求数据
    getData: function () {
        if(1){
            // 这里可以作进一步的验证
        }
        // 表单序列化
        var data = {
            username: $('#username').val(),
            avatar: Comment.avatar,
            email: $('#email').val(),
            blog: $('#blog').val(),
            comment: $('#comment').val()
        };
        // $.post('/php/doAction.php', {data:JSON.stringify(data)}, function (data) {
        $.post('php/doAction2.php?act=add', data, function (res) {
            if(res.status){
                // 请求成功
                Comment.commitFlag = true;
                Comment.getHtmlCont(res['data'],1);
            } else {
                // 请求失败
            }
        },'json');
    },

    // 获取当前页的数据
    getCurPageData: function () {
        $.post('php/doAction2.php?act=all',function (res) {
            Comment.getHtmlCont(res, res.length);
        },'json');
    },

    // 获取评论html
    getHtmlCont: function (data,length) {
        var _htmlCont = '';
        if(length){
            for(var i = 0; i < length; i++){
                _htmlCont += '<div class="comment">' +
                    '<img class="comment-avatar" src="images/'+ data[i]['avatar'] +'.jpg" width="30" height="30" alt="图像">' +
                    '<div class="comment-name">'+ data[i]['username'] +'</div>' +
                    '<div class="comment-date">'+ Comment.convertUnixDate(data[i]['pubtime']) +'</div>' +
                    '<div class="comment-cont">'+ data[i]['comment'] +'</div>' +
                    '</div>';
            }
        } else {
            _htmlCont = '<p>该页暂无数据！！！</p>';
        }
        $('.showArea').append(_htmlCont);
    }
};

$(function () {
   Comment.init();
});
