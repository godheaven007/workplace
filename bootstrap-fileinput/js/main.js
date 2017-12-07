/**
 * author: xusf
 * createDate: 2017-11-29
 */

 $(window).load(function(){
    $.mCustomScrollbar.defaults.theme="light-3";
    $(".scroll").mCustomScrollbar({
        mouseWheelPixels:250,           
    });     
});

// 用于存储临时变量
var temp = ''; 

var Main = {
    options: {
        uploadUrl: '/upload.php',
        language:'zh',
        maxFileCount:1,                                     // 允许最大上传个数
        // maxFileSize:1024 * 1,                            // 文件大小控制
        allowedFileExtensions: ["png", "doc", "docx"],      // 允许接收的文件后缀
        layoutTemplates: {                                  // 缩略图相关操作
            actionDelete: '',
            actionUpload: '',
            actionZoom: ''
        },
        showClose: false,                                   // 右侧关闭按钮
        uploadAsync: true,                                  // 是否异步上传
        // showUpload: false,                               // 上传总按钮
        // showRemove: false,                               // 移除总按钮
        // showCaption:false,                               // 标题名称显示
        // enctype: 'multipart/form-data',
        // showCancel:false,
        // showUploadedThumbs:false,
        // showClose:false,
        // autoReplace:true,
        // overwriteInitial:true,
        // showUploadedThumbs:false,
        // initialPreviewCount:1,
        // initialPreviewShowDelete:false,
    },

    init: function () {
        this.eventHandle();
        $("#upload").fileinput(Main.options);
    },

    eventHandle: function () {

        // 上传
        $(document).on('click', '#uploadBtn', function () {
            $('.mask, .uploadBox').show();
        });

        // 保存
        $(document).on('click', '#save', function () {
            alert("保存");
        });

        // 题型修改
        $(document).on('click', '.quesEditBtn', function () {
            temp = $(this).parent();
            var type = $(this).attr('value');
            $('.radioItem[value='+ type +']').addClass('active');
            $('.mask, .questionBox').show();
        });

        // 关闭弹框
        $(document).on('click', '.uploadClose', function () {
            Main.reset();
            $('.mask, .uploadBox').hide();
        });

        // 题型弹框
        $(document).on('click', '.radioItem', function () {
            $('.radioItem').removeClass('active');
            $(this).addClass('active');
        });

        // 题型弹框--取消
        $(document).on('click', '.questionCancel', function () {
            Main.resetQues();
        });

        // 题型弹框--确认
        $(document).on('click', '.questionConfirm', function () {

            // TODO题型修改....

            if(200){
                var quesType = $('.radioItem.active').attr('value'),
                    quesTxt = $('.radioItem.active').text();

                var html = '<label value="'+ quesType +'">'+ quesTxt +'</label>' +
                            '<div class="quesEditBtn" value="'+ quesType +'">修改</div>';
                temp.html(html);
                Main.resetQues();
            }
        });

         // 下拉框
        $(document).on('click', '.dropDownBox', function (e) {
            e.stopPropagation();
            $('.dropDownBox').removeClass('active');
            $(this).addClass('active');
        });
        $(document).on('click', '.dropDownBox .dropDownItem', function (e) {
            e.stopPropagation();
            var text = $(this).text(),
                value = $(this).attr('value');
            $(this).parents('.dropDownList').prev().text(text).attr('value', value);
            $(this).parents('.dropDownBox').removeClass('active');

            if($(this).hasClass('score')){
                // 分值和选项
                var html = '';
                for(var i = 1; i <= parseInt(value); i++) {
                    html += '<li class="quesNoOption">' +
                                '<span>第'+ i +'小题：</span>' +
                                '<input type="text">' +
                                '<span>分</span>' +
                            '</li>';
                }
                var $target = $(this).parents('.quesCont').find('.quesNoOptions');
                $target.html(html);
            }
            
        });
        $(document).on('click', 'html,body', function () {
            $('.dropDownBox').removeClass('active');
        });


        // 上传$('.dropDownBox').removeClass('active');
        $(document).on('fileuploaded', '#upload', function (event, data, previewId, index) {
            var result = data.response;         // 后台返回JSON
            alert(result.msg);
        });

    },

    // 弹框内容重置
    reset: function(){
        var html = '<input id="upload" name="testFile" type="file" multiple>' +
                    '<div class="uploadClose">' +
                        '<span>关闭弹框</span>' +
                    '</div>';
        $('.uploadBox').html(html);                    
        $("#upload").fileinput(Main.options);
    },

    // 重置题型弹框
    resetQues: function(){
        $('.radioItem').removeClass('active');
        $('.questionBox,.mask').hide();
    }
};

$(function () {
    Main.init();
});
