
// ES5
{
	function test(a, b, c){
		console.log(a, b, c);
	}

	let arr = [1,2,3];
	// 如何将数组传入并输出?
}

// ES6
{
	function test(a, b, c){
		console.log(a, b, c);
	}

	let arr = [4, 5, 6];
	test(...arr);
}

// 求最大值
{
	let arr = [1, 2, 3, 4, 5];
	// ES5
	let result = Math.max.apply(null, arr);
	console.log("最大值：" + result);

	// ES6
	let result2 = Math.max(...arr);
	console.log("最大值：" + result2);
}

// 将一个数组添加到另外一个数组的尾部
{
	let arr1 = [1, 2, 3];
	let arr2 = [4, 5, 6];
	Array.prototype.push.apply(arr1, arr2);
	console.log("数组为：" + arr1);

	arr1.push(...arr2);
	console.log("数组为：" + arr1);
}

// 数组拷贝
{
	// ES5
	let a1 = [1, 2];
	let a2 = a1.concat();

	a2[0] = 2;
	console.log(a1, a2);

	// 写法一
	let a3 = [...a1];
	// 写法二
	let [...a4] = a1;
	console.log(a3, a4);
}

// 数组合并
{
	var arr1 = ['a', 'b'];
	var arr2 = ['c'];
	var arr3 = ['d', 'e'];

	// ES5
	let result = arr1.concat(arr2, arr3);
	console.log("ES5数组合并：" + result);

	// ES6
	let result2 = [...arr1, ...arr2, ...arr3]
	console.log("ES6数组合并：" + result2);
}

