// 字符串解构赋值
{
	let [a,b,c,d,e] = "hello";
	console.log(a,b,c,d,e);
}

{
	let {length: aa} = "hello";
	console.log(aa);
}
{
	let {name} = 123;
	console.log(name);
}


// 函数参数解构赋值基本用法
{
	function test([num1, num2]) {
		console.log(num1, num2);
	}

	test([4, 5]);
}

// 使用默认值
{
	function test([num1 = 3, num2 = 4]) {
		console.log(num1, num2)
	}

	test([]);
}