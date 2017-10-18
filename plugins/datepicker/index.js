/**
* author: xusf
* createDate: 2017-10-16
* description: 日历组件
*/


;(function($){

	// 用来保存选中的日期
	var data = {};

	var Calendar = function(ele, options, date){

		// dom元素设定
		this.$ele = ele;
		this.$input = ele.find('input');
		this.$wrapper = ele.find('.ui-datepicker-wrapper');

		// 设置默认参数
		this.default = {
			year: date.getFullYear(),	// 默认当年
			month: date.getMonth() + 1,	// 默认当月
			day: date.getDate(),		// 默认当日
			yearActive: null,			// 选中的年
			monthActive: null,			// 选中的月
			dayActive: null,			// 选中的日
			callback: function(){
				
			}			
		};

		// 参数覆盖（这里采用深拷贝）
		this.settings = $.extend(true, {}, this.default, options);
		
		this.monthData = this.getMonthData(this.settings.year, this.settings.month);

		this.eventHandle();
	};

	Calendar.prototype = {
		// 初始化操作
		init: function(){

		},

		// 返回某一个月的数据
		getMonthData: function(_year, _month){
			var ret = [];

			// 获取当月的第一天
			var firstDate = new Date(_year, _month - 1, 1);
			_year = firstDate.getFullYear();
			_month = firstDate.getMonth() + 1;

			// 获取当前第一天为星期几（是否需要显示上月数据）
			var firstDayWeekDay = firstDate.getDay();

			// 若为周日，则置为7
			!firstDayWeekDay && (firstDayWeekDay = 7);

			// 获取上个月的最后一天
			var lastDateOfLastMonth = new Date(_year, _month - 1, 0);
			var lastDayOfLastMonth = lastDateOfLastMonth.getDate();

			// 上个月显示的剩余天数
			var preMonthDayRemain = firstDayWeekDay - 1;

			// 当月最后一天
			var lastDateOfCurMonth = new Date(_year, _month, 0);
			var lastDayOfCurMonth = lastDateOfCurMonth.getDate();


			// 每个月最多为6周，按极端情况42天算
			for(var i = 0, j = 6 * 7; i < j; i++){
				var date = i + 1 - preMonthDayRemain,
					showDate = date,
					thisMonth = _month,
					allow = 0;				// 只有当前月的数据可以访问
				if(showDate <= 0){
					// 上一个月
					thisMonth = _month - 1;
					showDate = lastDayOfLastMonth + date;
				} else if(showDate > lastDayOfCurMonth){
					// 下一个月
					thisMonth = _month + 1;
					showDate = showDate - lastDayOfCurMonth;
				} else {
					allow = 1;
				}	

				if (thisMonth === 0) thisMonth = 12;
				if(thisMonth === 13) thisMonth = 1;

				ret.push({
					thisMonth: thisMonth,		// 当前月
					date: date,					// 
					showDate: showDate,			// 显示正常日期
					allow: allow
				});
			}

			return {
				year: _year,
				month: _month,
				data: ret
			};
		},

		// 获取html模板,这里可以用ES6的模板字符串或其他模板引擎
		getTemplate: function(){
			var _html = '<div class="ui-datepicker-header">' +
							'<a href="#" class="ui-datepicker-btn ui-datepicker-btn-prev">&lt;</a>' +
							'<a href="#" class="ui-datepicker-btn ui-datepicker-btn-next">&gt;</a>' +
							'<span class="ui-datepicker-current-month">'+ this.monthData.year + '年' + this.monthData.month + '月' +'</span>' +
						'</div>' +
						'<div class="ui-datepicker-body">' +
							'<table>' +
								'<thead>' +
									'<tr>' +
										'<th>一</th>' +
										'<th>二</th>' +
										'<th>三</th>' +
										'<th>四</th>' +
										'<th>五</th>' +
										'<th>六</th>' +
										'<th>日</th>' +
									'</tr>	' +
								'</thead>' +
								'<tbody>';

			var monthData = this.monthData.data;

			for(var i = 0, j = monthData.length; i < j; i++){
				// tr标签开始
				if(i % 7 === 0) _html += '<tr>';
				var classNames = !monthData[i].allow ? 'notAllowed' : 'allow';

				// 增加当天选中日期样式
				if((this.settings.year == this.monthData.year) && (this.settings.month == this.monthData.month)
					&& (this.settings.day == monthData[i].showDate)){
					classNames += ' today';
				}
				
				// 增加选中样式
				if((this.settings.yearActive == this.monthData.year) && (this.settings.monthActive == monthData[i].thisMonth)
					&& (this.settings.dayActive == monthData[i].showDate)){
					classNames += ' active';
				}

				_html += '<td class="'+ classNames +'">'+ monthData[i].showDate +'</td>'

				// tr标签结束
				if(i % 7 === 6) _html += '</tr>';
			}
			
			_html += 	'</tbody>' +
					'</table>' +
				'</div>';

			return _html;
		},

		// 渲染页面
		build: function(){
			var html = this.getTemplate();
			this.$wrapper.html(html);
		},

		// 事件绑定
		eventHandle: function(){

			var _this = this;
				$input = this.$ele.find('input');

			// 单元格点击
			$(document).on('click','.ui-datepicker-wrapper td', function(e){
				e.stopPropagation();

				if($(this).hasClass('notAllowed')){
					return;
				} else if($(this).hasClass('allow')){

					// 重置单元格选中样式
					_this.$wrapper.find('.allow').removeClass('active');

					var date = _this.monthData.year + "年" + _this.monthData.month + '月' + $(this).text() + '日';

					_this.settings.yearActive = _this.monthData.year;
					_this.settings.monthActive = _this.monthData.month;
					_this.settings.dayActive = $(this).text();

					if(!$(this).hasClass('active')){
						$(this).addClass('active');
					} else {
						$(this).removeClass('active');
					}

					_this.$input.val(date);
					_this.$wrapper.removeClass('active');
					_this.settings.callback();
				}
			});

			// 月份切换
			$(document).on('click', '.ui-datepicker-wrapper .ui-datepicker-btn', function(e){
				e.stopPropagation();

				if($(this).hasClass('ui-datepicker-btn-next')){
					// 下一月
					_this.monthData.month++;
				} else if($(this).hasClass('ui-datepicker-btn-prev')){
					// 上一月
					_this.monthData.month--;
				}
				_this.monthData = _this.getMonthData(_this.monthData.year, _this.monthData.month);
				
				_this.$wrapper.html(_this.getTemplate());
			});

			// 输入框点击
			$(document).on('click', '.datapickerInput', function(e){
				e.stopPropagation();
				// 日历组件
				var $next = $(this).next();
				if(!$next.hasClass('active')){
					$next.addClass('active');
				} else {
					$next.removeClass('active');
				}
			});

			// 点击空白处,消失
			$(document).on('click', 'html,body', function(){
				$('.ui-datepicker-wrapper').removeClass('active');
			});
		}
	};

	// jQuery插件形式
	$.fn.datepicker = function(options){
		var calendar = new Calendar(this, options, new Date());
		calendar.build(this);
		
		// 保留jQUery的链式调用
		return this;
	}

	// 将Calendar暴露给外面
	// window.Calendar = Calendar;

})(jQuery);