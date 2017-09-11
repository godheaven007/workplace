/**
 * author: xusf
 * createDate: 2017-09-01
 * description: ajax简单交互实现
 */

var DEMO = {
    init: function () {
        this.eventHandle();
    },

    eventHandle: function () {
        // 下拉
        $(document).on('click','.stuSelect', function (event) {
            event.stopPropagation();
            if($('.stuSelectBox').css('display') == 'block'){
                $('.stuSelectBox').hide();
            } else {
                $('.stuSelectBox').show();
            }
        });

        // 点击空白处
        $(document).on('click', 'html,body', function () {
            $('.stuSelectBox').hide();
        });

        // 选择学生
        $(document).on('click', '.stuSelectBox li', function (event) {
            event.stopPropagation();
            $('.stuSelect .name').text($(this).text());
            $('.stuSelectBox').hide();

            // 异步请求
            var stuId = $(this).attr('stuid');
            DEMO.getStuInfo(stuId);
        });
    },

    // 获取学生信息
    getStuInfo: function (stuId) {
        FUN.ajax({
            type: 'post',
            url:'php/getStuInfo.php',
            data:{
                'stuId': stuId
            },
            success: function (res) {
                var json = JSON.parse(res);
                var htmlCont = '<div class="stuItem">'+ json[0] +'</div>' +
                        '<div class="stuItem">'+ json[1] +'</div>' +
                        '<div class="stuItem">'+ json[2] +'</div>';
                $('#stuInfo').html(htmlCont);
            }
        })
    },
};

$(document).ready(function () {
    DEMO.init();
});
