// 用法
// {
// 	function test(...arg){
// 		// 这里arg是数组
// 		console.log(arg);
// 	}

// 	test(1,2,3);
// }

// 引申：给定参数(6,13,2),如何升序排序
// ES5如何做？ES6？
{
	function sort(...rest) {
		console.log(rest);
	}

	sort(6, 13, 2);
}