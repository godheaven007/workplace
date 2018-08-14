{
	let obj = {
		name: "阿三"
	}

	Object.defineProperty(obj, "name", {
		value: "阿四"
	})

	console.log(obj);
}

// 利用Symbol，保证属性的唯一性
{
	let name = Symbol();
	let obj = {
		[name]: "阿三",
		name: "阿四"
	}

	Object.defineProperty(obj, name, {
		value: "阿三2"
	});

	// 特别注意！！！
	// obj.name = obj['name'] ，这里的name是字符串
	// obj[name]				这里的name是Symbol
	console.log(obj[name], obj.name);
}