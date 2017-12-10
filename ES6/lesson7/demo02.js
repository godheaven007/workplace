{
	let obj = {
		name: "aa阿三"
	}

	Object.defineProperty(obj, "name", {
		value: "bb阿四"
	})

	console.log(obj);
}

// 利用Symbol，保证属性的唯一性
{
	let name = Symbol();
	let obj = {
		[name]: "aaa"
	}

	Object.defineProperty(obj, name, {
		value: "bbb"
	})
	// 特别注意！！！
	// obj.name = obj['name'] ，这里的name是字符串
	// obj[name]				这里的name是Symbol
	console.log(obj.name);
}