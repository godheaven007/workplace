/**
* author: xusf
* createDate: 2017-11-6
* description: 弹幕效果
*/

;(function($, win){

	var Common = {
		canvas: '',					// canvas元素
		context: '',				// 绘画上下文
		canvasWidth: '',			// canvas宽度
		canvasHeight: '',			// canvas高度
		storeList: {},				// 存储各个弹幕信息

		// canvas初始化
		init: function(data, callback){
			this.context = this.canvas.getContext('2d');
			this.canvasWidth = this.canvas.width;
			this.canvasHeight = this.canvas.height;

			data.forEach(function(option, index){
				Common.storeList[index] = new Barrage(option, index);
			});

			if(callback && Object.prototype.toString.call(callback) == '[object Function]'){
				callback();
			}
		},

		draw: function(){
			for (var index in this.storeList) {
				var barrage = this.storeList[index];
				// 位置变化
				barrage.x -= barrage.moveX;
				if (barrage.x < -1 * this.canvasWidth * 1.5) {
					// 移动到画布外部时候从左侧开始继续位移
					barrage.x = (1 + index * 0.1 / Math.random()) * this.canvasWidth;
					barrage.y = (barrage.params.range[0] + (barrage.params.range[1] - barrage.params.range[0]) * Math.random()) * this.canvasHeight;
					if (barrage.y < barrage.fontSize) {
						barrage.y = barrage.fontSize;
					} else if (barrage.y > this.canvasHeight - barrage.fontSize) {
						barrage.y = this.canvasHeight - barrage.fontSize;
					}
					barrage.moveX = 1 + Math.random() * 3;
				}
				this.storeList[index].draw();
			}
		},



		// 画布渲染
		render: function () {
			// 清除画布
			Common.context.clearRect(0, 0, Common.canvasWidth, Common.canvasHeight);
			
			// 绘制画布上所有的圆圈圈
			Common.draw();

			// 继续渲染
			win.requestAnimationFrame(Common.render);
		}
	};

	var Barrage = function(option, index){

		// 设置默认参数
		this.default = {
			value: '',				// 弹幕内容
			color: 'red',			// 弹幕默认字体颜色
			fontSize: 16,			// 弹幕默认字体大小
			range: [0.2, 0.6]		// 显示区域
		};

		// 参数覆盖（这里采用深拷贝）
		this.settings = $.extend(true, {}, this.default, option);

		// 随机x坐标也就是横坐标，对于y纵坐标，以及变化量moveX
		this.x = (1 + index * 0.1 / Math.random()) * Common.canvasWidth;
		this.y = this.settings.range[0] * Common.canvasHeight + (this.settings.range[1] - this.settings.range[0]) * Common.canvasHeight * Math.random() + 36;

		if (this.y < this.settings.fontSize) {
			this.y = this.settings.fontSize;
		} else if (this.y > Comment.canvasHeight - this.settings.fontSize) {
			this.y = Comment.canvasHeight - this.settings.fontSize;
		}
		this.moveX = 1 + Math.random() * 3;
		this.params = option;
		
		this.draw = function () {
			var params = this.params;

			Common.context.font = this.settings.fontSize + 'px "microsoft yahei", sans-serif';
			Common.context.fillStyle = this.settings.color;
			Common.context.fillText(params.value, this.x, this.y);
		};
	};

	$.fn.barrage = function(data){
		if(!data.length || Object.prototype.toString.call(data) !== '[object Array]') {
			return;	
		}
		Common.canvas = $(this)[0];
		Common.init(data,Common.render);

		return this;
	}

})(jQuery, window);