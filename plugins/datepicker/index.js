/**
* author: xusf
* createDate: 2017-10-16
* description: 日历组件
*/


;(function($){

	var Calendar = function(year, month){
		this.monthData = this.getMonthData(year, month);
		this.eventHandle();
	};


	Calendar.prototype = {
		
		// 返回某一个月的数据
		getMonthData: function(_year, _month){
			var ret = [];
			if(!_year || !_month){
				var date = new Date();
				_year = date.getFullYear();
				_month = date.getMonth + 1;
			}

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
				} else if(showDate > lastDayOfLastMonth){
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
			for(var i = 0; i < monthData.length; i++){
				// tr标签开始
				if(i % 7 === 0) _html += '<tr>';
				var allowFlag = !monthData[i].allow ? 'notAllowed' : 'allow';
				_html += '<td class="'+ allowFlag +'">'+ monthData[i].showDate +'</td>'

				// tr标签结束
				if(i % 7 === 6) _html += '</tr>';
			}
			
			_html += '</tbody>' +
				'</table>' +
			'</div>';

			return _html;
		},

		// 渲染页面
		build: function($target){
			var html = this.getTemplate();
			$target.html(html);
		},

		// 事件绑定
		eventHandle: function(){

			var _this = this;
			// 采用事件委托机制
			$(document).on('click','.ui-datepicker-wrapper', function(e){
				var domNode = e.target;
				if(domNode.tagName.toLowerCase() == 'td'){
					if(domNode.className === 'notAllowed'){
						return;
					} else if(domNode.className === 'allow'){
						var date = _this.monthData.year + "年" + _this.monthData.month + '月' + $(domNode).text() + '日';
						alert(date);
						return;
					}
				} else if(domNode.className.indexOf('ui-datepicker-btn-next') > 0){
					// 下一月
					_this.monthData.month++;
				} else if(domNode.className.indexOf('ui-datepicker-btn-prev') > 0){
					// 上一月
					_this.monthData.month--;
				}
				
				_this.monthData = _this.getMonthData(_this.monthData.year, _this.monthData.month);
				$(e.currentTarget).html(_this.getTemplate());
			})
		}
	};

	// jQuery插件形式
	$.fn.datepicker = function(year, month){
		var calendar = new Calendar(year, month);
		calendar.build(this);

		// 保留jQUery的链式调用
		return this;
	}

	// 将Calendar暴露给外面
	// window.Calendar = Calendar;

})(jQuery);