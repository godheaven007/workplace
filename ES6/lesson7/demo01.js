// 基本用法
{
	let num = Symbol();
	console.log(typeof num);
}

// Symbol函数参数
{
	let s1 = Symbol("one");
	let s2 = Symbol("one");

	// s1 === s2 ?

	// Symbol的唯一性
	console.log(s1 === s2);
}

