// 基本用法
{
	// ES5
	// function test(x) {
	// 	if(typeof x === 'undefined') {
	// 		x = 1;
	// 	}
	// 	console.log(x);
	// }

	// ES6
	function test(x = 1) {
		console.log(x);
	}

	test();
}

// 函数参数默认值与解构赋值默认值结合使用
{
	function test({name="阿三", age=22} = {}) {
		console.log(name, age);
	}

	test();
}

// 引申(下面二者的区别)
{
	// 写法一(设置对象解构赋值默认值)
	function m1({x = 0, y = 0} = {}) {
		console.log(x,y);
	}

	// 写法二(未设置对象解构赋值默认值)
	function m2({x, y} = { x: 0, y: 0 }) {
		console.log(x,y);
	}

	// 函数没有参数的情况
	m1();
	m2();

	// x 和 y 都有值的情况
	m1({x: 3, y: 8});
	m2({x: 3, y: 8});

	// x 有值，y 无值的情况
	m1({x: 3});
	m2({x: 3});

	// x 和 y 都无值的情况
	m1({});
	m2({});

	m1({z: 3});
	m2({z: 3});
}

// 注意！！！
{
	function test(x = 1, y = 2){
		console.log(x, y);
	}
	test(undefined, null);
}