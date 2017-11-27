/**
* ES5中只有全局作用域和函数作用域
* ES6中为啥要引入块级作用域?
**/

// 循环变量泄露为全局变量

for(var i = 0; i < 10; i++) {

}

console.log(i);	// 结果?


// 变量覆盖

var temp = 1;
function fun() {
	console.log(temp);
	if(1) {
		var temp = 2;
	}
	console.log(temp);
}

fun();		// 结果? Why?



