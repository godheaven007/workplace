/**
 *	不存在变量提升
 */
// ES5
// {
// 	console.log(num);
// 	var num = 1;	
// }

// ES6
// {
// 	console.log(num);
// 	let num = 1;	
// }

/**
 *	不允许重复申明
 */

 // ES5
// {
// 	var num = 100;
// 	var num = 200;
// 	console.log(num);
// }

// ES6
// {
// 	let num = 111;
// 	let num = 222;
// 	console.log(num);
// }

// 不能在函数内部重新声明参数
// {
// 	function test(num){
// 		let num = 1;
// 	}
// 	test();
// }

/**
 *	循环体外部是一个作用域，循环体内部是一个单独的作用域
 */

 // {
 // 	for(let i = 1; i < 3; i++) {
 // 		let i = 4;
 // 		console.log(i)
 // 	}
 // }
