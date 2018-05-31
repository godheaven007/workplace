// 属性、方法简写
{
	let name = 'myName';
	let age = 22;
	let obj = {
		[name]: '阿三',
		age,
		['say']() {
			console.log(this.myName, this.age);
		}
	};
	obj.say();
}
// 注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]。
{
	let objA = {name: "a"};
	let objB = {name: "b"};

	let obj = {
		[objA]: "aaa",
		[objB]: "bbb"
	}
	console.log(obj);
}

// 函数返回值
{
	function test(name, age){
		return {name, age};
	}

	let obj = test("asan", 22);
	console.log(obj);
}