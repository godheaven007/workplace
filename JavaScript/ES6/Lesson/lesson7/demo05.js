{
	let symbol = Symbol("symbol");

	let symbol2 = Symbol.for("symbol");
	let symbol3 = Symbol.for("symbol");

	console.log(symbol2 === symbol3);
	// Symbol.for() 搜索以该参数作为名称的Symbol值,若存在则返回该symbol值，
	// 若不存在就新建并返回一个以该字符串为名称的 Symbol 值
}

// Symbol.for()与Symbol()区别
{
	// Symbol.for("cat")调用n次，只产生一个Symbol
	// Symbol("cat")调用n次，产生n个Symbol
}

// Symbol.keyFor()
{
	let s1 = Symbol.for("foo");
	console.log(Symbol.keyFor(s1));	// "foo"

	let s2 = Symbol("foo");
	console.log(Symbol.keyFor(s2));	// undefined
}