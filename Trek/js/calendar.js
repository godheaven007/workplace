/**
 * author: xusf
 * createDate: 2018/09/02
 * description: 日历组件（展示用）
 */

;(function (win, doc) {
  function Calendar(selector, data) {
    this.wrapNode = document.querySelector(selector);       // 日历最外层容器
    this.totalMarkData = data;                              // 所有签到数据
    this.curMarkData = null;                                // 当月的签到数据
    this.monthData = null;                                  // 整个月的数据
    this.year = null;
    this.month = null;
    this.getCurMarkData();
    this.setMonthData();
  }

  Calendar.prototype = {
    constructor: Calendar,

    // 获取某年某月的签到数据
    getCurMarkData: function(year, month) {
      if (typeof year == 'undefined' || typeof month == 'undefined') {
        var today = new Date();
        year = today.getFullYear();
        month = today.getMonth() + 1;
      }
      
      month = month < 10 ? '0' + month : month + '';
      this.curMarkData = this.totalMarkData[year + month];
    },

    setMonthData: function (year, month) {
      var data = this.getMonthData(year, month, this.curMarkData);
      this.monthData = data.days;
      this.year = data.year;
      this.month = data.month;

      this.render();
    },

    render: function () {
      var html = `<div class="ui-calendar-header">
                    <span class="ui-calendar-btn prev-year-btn iconfont icon-prev-year"></span>
                    <span class="ui-calendar-btn prev-month-btn iconfont icon-prev-month"></span>
                    <span class="ui-calendar-date">${this.year} - ${this.month < 10 ? '0' + this.month : this.month}</span>
                    <span class="ui-calendar-btn next-month-btn iconfont icon-next-month"></span>
                    <span class="ui-calendar-btn next-year-btn iconfont icon-next-year"></span>
                  </div>
                  <div class="ui-calendar-body">
                    <div class="ui-calendar-title">
                      <div>一</div>
                      <div>二</div>
                      <div>三</div>
                      <div>四</div>
                      <div>五</div>
                      <div>六</div>
                      <div>日</div>
                    </div>
                    <div class="ui-calendar-bar-wrap">
                      ${this.renderDate()}
                    </div>
                  </div>`;
      this.wrapNode.innerHTML = html;
      this.bindEvent();
    },
    // 渲染指定月份的日期数据
    renderDate: function () {
      var html = '';
      for (var i = 0; i < this.monthData.length; i++) {
        var date = this.monthData[i];
        if (i % 7 === 0) {
          html += `<div class="ui-calendar-bar">`;
        }
        html += `<div class="ui-calendar-item ${date.month !== this.month ? "invalid" : ""} ${this.setToday(date)}" data-date="${date.date}">
                  ${date.showDate}<span class="iconfont icon-mark ${date.mark ? 'mark' : ''}"></span>
                </div>`;
        if (i % 7 === 6) {
          html += `</div>`;
        }
      }
      return html;
    },
    // 当天标记
    setToday: function(data) {
      
      var d = new Date();
      var date = d.getDate();
      var month = d.getMonth() + 1;
      var year =  d.getFullYear();

      var compare1 = '' + data.year + data.month + data.showDate;
      var compare2 = '' + year + month + date;
      // console.log(compare1, compare2)
      if(compare1 === compare2) {
        return 'today';
      }
      return '';
    },
    // 上一月/下一月 上一年/下一年
    bindEvent: function () {
      // 事件委托
      var calendarHeader = this.wrapNode.querySelector('.ui-calendar-header');

      calendarHeader.addEventListener('click', (event) => {
        var target = event.target;
        if (target.classList.contains('prev-month-btn')) {
          this.month -= 1;
        } else if (target.classList.contains('next-month-btn')) {
          this.month += 1;
        } else if (target.classList.contains('prev-year-btn')) {
          this.year -= 1;
        } else if (target.classList.contains('next-year-btn')) {
          this.year += 1;
        }
        this.getCurMarkData(this.year, this.month);
        this.setMonthData(this.year, this.month);
        this.render();
      });
    },

    // 获取某年某月下的数据
    getMonthData: function (year, month, markData = []) {
      var ret = [];
      if (typeof year == 'undefined' || typeof month == 'undefined') {
        var today = new Date();
        year = today.getFullYear();
        month = today.getMonth() + 1;
      }

      var firstDay = new Date(year, month - 1, 1); //想要的月的第一天(下面称为本月)
      var firstDayWeekDay = firstDay.getDay(); //本月第一天是星期几
      if (firstDayWeekDay === 0) firstDayWeekDay = 7; //(星期天是0)在设置为7

      year = firstDay.getFullYear();
      month = firstDay.getMonth() + 1;

      var lastDayOfLastMonth = new Date(year, month - 1, 0);//上个月的最后一天
      var lastDateOfLastMonth = lastDayOfLastMonth.getDate();//上个月最后一天是几号

      var preMonthDayCount = firstDayWeekDay - 1;//显示上一个月的几天

      var lastDay = new Date(year, month, 0);//本月的最后一天
      var lastDate = lastDay.getDate();//本月的最后一天是星期几

      for (var i = 0; i < 7 * 6; i++) {
        var date = i + 1 - preMonthDayCount;
        var showDate = date;
        var thisMonth = month;
        var isMark = false;         // 签到标记

        if (date <= 0) {
          thisMonth = month - 1;
          showDate = lastDateOfLastMonth + date;
        }else if(date > lastDate){
          thisMonth = month + 1;
          showDate = showDate - lastDate;
        }

        if(markData.indexOf(date) !== -1) {
          isMark = true;
        }
        if (thisMonth === 0) thisMonth = 12;
        if (thisMonth === 13) thisMonth = 1;

        ret.push({
          year: year,
          month: thisMonth,
          date: date,
          showDate: showDate,
          mark: isMark
        });
      }

      return {
        year: year,
        month: month,
        days: ret
      };
    },
    // 今日签到，更新数据并渲染
    update: function() {
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var date = d.getDate();

      month = month < 10 ? '0' + month : '' + month;

      this.totalMarkData[year + month].push(date);
      this.setMonthData(year, month);
      this.render();
    }
  }

  window.Calendar = {
    show: function (selector, data) {
      if (!document.querySelector(selector)) return;
      
      return new Calendar(selector, data);
    }
  }
})(window, document);