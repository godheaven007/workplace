// 交换变量
{
	let x = 5, y = 10;
	[x, y] = [y, x];
	console.log(x, y);
}

// 函数返回多个值
{
	function test() {
		let x = 5, y = 7;
		// 传统做法
		// return [];
		// return {};

		return [x, y];
	}

	let [num1, num2] = test();
	console.log(num1, num2);
}

// 提取json数据
{
	let jsonData = {
		"name": "阿三",
		"age": 22
	};

	let {name, age} = jsonData;
	console.log(name, age);
}