

var music = (function () {
    var current = 0;                // 当前为第几首歌曲
    // var api = 'https://easy-mock.com/mock/5b73de2185b13978addd6de1/music/getMusicList';
    var api = './data/music.json';  // 请求接口地址
    var musicListData = [];         // 音乐列表数据
    var audio = new Audio();

    // 播放器相关按钮
    var playBtn = '',
        pauseBtn = '',
        previousBtn = '',
        nextBtn = '',
        progress = '',
        musicInfo = '',
        musicControl = '';

    function $(selector) {
        return document.querySelector(selector);
    }

    function $$(selector) {
        return document.querySelectorAll(selector);
    }

    function init() {
        playBtn = $('.play');
        pauseBtn = $('.pause');
        previousBtn = $('.previous');
        nextBtn = $('.next');
        progress = $('.progress');
        musicList = $('.music-list');
        musicInfo = $('.music-info');
        musicControl = $('.music-control');
        getMusicList(function (data) {
            var _html = '';
            console.log(data);
            data.forEach(function (music, index, array) {
                _html += `<li class="music-item" data-current=${index}>
                    <span>${music.title}</span>
                    <span>${music.author}</span>
                    <span>2018-01-01</span>
                </li>`
            })
            musicList.innerHTML = _html;
        });

        eventHandle();
    }
    // 获取音乐列表
    function getMusicList(callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', api, true);
        xhr.onreadystatechange = function () {
            if ((xhr.status >= 200 && xhr.status <= 300) || xhr.status == 304) {
                if (xhr.readyState == 4) {
                    musicListData = JSON.parse(xhr.responseText);
                    callback && musicListData.length && callback(musicListData);
                }
            } else {
                console.log('网络错误!!!');
            }
        }
        xhr.onerror = function () {
            console.log('未知错误!!!');
        }
        xhr.send(null);
    }
    // 获取音乐相关信息
    function getMusicInfo(music) {
        var html = `
            <p>${music.title}</p>
            <p>${music.author}</p>
        `;
        return html;
    }
    // 播放音乐
    function loadMusic() {
        audio.src = musicListData[current].src;
        musicInfo.innerHTML = getMusicInfo(musicListData[current]);
        audio.play();
    }
    function eventHandle() {
        // 播放
        playBtn.addEventListener('click', function () {
            musicControl.classList.add('active');
            loadMusic();
        });
        // 暂停
        pauseBtn.addEventListener('click', function () {
            musicControl.classList.remove('active');
            audio.pause();
        });
        // 上一首
        previousBtn.addEventListener('click', function () {
            current -= 1;
            (current < 0) && (current = musicListData.length - 1);
            loadMusic();
        });
        // 下一首
        nextBtn.addEventListener('click', function () {
            current += 1;
            (current == musicListData.length) && (current = 0);
            loadMusic();
        });
        // 进度点击
        progress.addEventListener('click', function () {
            loadMusic();
        });
        // 事件代理
        musicList.addEventListener('click', function (e) {
            e.stopPropagation();
            var liNode = e.target.parentElement;
            if (liNode.classList.contains('active')) {
                // 正在播放，则暂停
                audio.pause();
                liNode.classList.add('pause');
                liNode.classList.remove('active');
            } else {
                liNode.classList.add('active');
                liNode.classList.remove('pause');
                loadMusic();
            }
        });
    }
    return {
        init: init
    }
})();

music.init()