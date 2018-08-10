
/**
 * 模块
 * @param {*} module 1: 排名250, 2: 欧美, 3: 搜索
 */
function module(module) {
    var start = 0;                                       // 从哪一条数据开始计算
    var count = 10;                                      // 每页请求数据记录数
    var query = '';                                      // 搜索关键字
    var searchBtn = '';                                  // 搜索按钮   
    var lock = false;                                    // 防止滚动反复请求数据（可以用函数节流替代）
    var $scrollWrap = $('.wrap' + module);               // 滚动区域
    var $loading = $scrollWrap.find('.loading');  // loading加载

    // 请求地址
    var URL = {
        url1: 'https://api.douban.com/v2/movie/top250',
        url2: 'https://api.douban.com/v2/movie/us_box',
        url3: 'https://api.douban.com/v2/movie/search'
    };
    return function () {
        // 初始化
        function init() {
            bind();
            getData();
        }
        // 事件绑定
        function bind() {
            $scrollWrap.on('scroll', function () {
                if (isScrollToBottom($loading)) {
                    // 这里需要函数节流，防止反复请求数据
                    getData();
                }
            });

            if(module == 3) {
                $('#search').click(function() {
                    query = $('#keyword').val();
                    // 搜索重置
                    start = 0;
                    count = 10;
                    $('.film-list3').html("");
                    // $scrollWrap.find('search-loading').addClass('active');
                    getData();
                })
            }

        }
        // 获取数据
        function getData() {
            if (lock) return;
            lock = true;
            var queryObj = {
                type: 'GET',
                dataType: 'jsonp',
                data: {},
                url: URL['url' + module]
            };
            if(module == 1 || module == 3) {
                // top250 search
                queryObj.data.start = start;
                queryObj.data.count = count;
            }
            if (module == 3) {
                queryObj.data.q = query;
            }
            $.ajax(queryObj).done(function (res) {
                render(res, function() {
                    $loading.removeClass('active');
                });
                start += 10;
            }).fail(function () {
                alert("请求失败！");
            }).always(function () {
                lock = false;
            })
        }
        // 转化导演/演员数据格式
        function getDirectorOrCasts(arr) {
            var result = [];
            arr.forEach(function(item, index, array) {
                result.push(item.name);
            });
            return result.join('/');
        }
        // 获取电影列表模板
        function getTemplate(item) {
            var _html = `
                <li class="film-item">
                    <a href="${item.alt}">
                        <img src="${item.images.large}" alt="${item.title}">
                        <div class="content">
                            <h3>${item.title}</h3>
                            <p><em>${item.rating.average}</em>分/ ${item.collect_count
                            }收藏</p>
                            <p>${item.year}/${item.genres.join('/')}</p>
                            <p>导演：${getDirectorOrCasts(item.directors)}</p>
                            <p>主演：${getDirectorOrCasts(item.casts)}</p>
                        </div>
                    </a>
                </li>
            `;
            return _html;
        }
        // 渲染处理
        function render(data) {
            var _html = '';
            if (data.subjects.length) {
                data.subjects.forEach(function(item, index, array) {
                    if(module == 2) {
                        // 北美数据结构不一致，单独处理
                        _html += getTemplate(item.subject);
                    } else {
                        _html += getTemplate(item);
                    }
                })
            }
            // 这里最好改用字符串的方式插入dom（防止XSS攻击）
            $('.film-list' + module).append(_html);
        }
        
        // 判断是否滚动到底部
        function isScrollToBottom($target) {
            var container = $scrollWrap.get(0);
            var loading = $target.get(0);
            // loading显示
            $loading.addClass('active');
            return container.clientHeight + container.scrollTop >= loading.offsetTop;
        }
        return {
            init: init
        }
    }
}

var App = {
    init: function() {
        module(1)().init();
        module(2)().init();
        module(3)().init();
        this.bind();
    },
    bind: function() {
        // 切换tab
        $('.category').click(function() {
            if($(this).hasClass('active')) return;
            var index = $(this).index();
            $('.category,.module').removeClass('active');
            $(this).addClass('active');
            $('.module').eq(index).addClass('active');
        });
    }
}

App.init();
