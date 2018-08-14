// {
// 	const NUM = 1;
// 	NUM = 2;
// }

// 针对引用类型的const
// {
// 	const obj = {};
// 	obj.name = "test";
// 	console.log(obj);
// }

// {
// 	const arr = [];
// 	arr[0] = 1;
// 	console.log(arr);
// }

// 综上：const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动

// 如何彻底冻结引用类型对象？(Object.freeze())

{
	// let num = 111;
	// if(1){
	// 	num = 222;
	// 	let num = 3;
	// }
}