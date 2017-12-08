// ES5
{
	var obj = {};
	obj.name = "阿三";
	obj['age'] = 22;

	console.log(obj);
}

{
	let name = 'name';
	let obj = {
		[name]: '阿三2',
		['say']() {
			console.log(this.name);
		}
	};
	obj.say();
	// 注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]。
}

{
	let objA = {name: "a"};
	let objB = {name: "b"};

	let obj = {
		[objA]: "aaa",
		[objB]: "bbb"
	}
	console.log(obj);
}