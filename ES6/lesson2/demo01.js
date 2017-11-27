// 基本用法
{
	let [a, b, c] = [1, 2, 3];
	console.log(a,b,c);	
}

// 解构不成功
{
	let [bar, foo] = [1];
	console.log(bar, foo);
}

// 不完全解构
{
	let [a, [b]] = [1, [2, 3]];
	console.log(a, b);
}

// 指定默认值
{
	let [a = 1, b] = [,3];
	console.log(a,b);

	// 值为undefined、null的情况
	let [c = 3, d = 4] = [undefined, null];
	console.log(c, d);
}

// 报错(不具有Iterator接口)
// {
// 	let [foo] = 1;
// 	let [foo] = false;
// 	let [foo] = NaN;
// 	let [foo] = undefined;
// 	let [foo] = null;
// 	let [foo] = {};
// 	console.log(foo);
// }