"use strict";

// 取代立即执行函数表达式
var arr = [];
for(var i = 0; i < 5; i++){
	arr[i] = function(){
		return i;
	}
}
console.log(arr[3]());  // 答案? Why? 

// 延伸
// ES5中如何做才能输出正确答案？
// ES6是如何做的？