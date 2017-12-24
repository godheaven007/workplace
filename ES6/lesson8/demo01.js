// 基本用法
{

	let set = new Set(["1", 1, 2, 2]);
	console.log(set, [...set]);

	// 注意：ES5中 NaN === NaN  false
	// 但是在Set数据结构中，被认为是相等的
	set.add(NaN);
	set.add(NaN);
	console.log(set);

	// 引用类型永远不相等
	set.add({});
	set.add({});
	set.add([]);
	set.add([]);
	console.log(set);
}

// 基本方法(add、delete、has、clear)
{
	let set = new Set();
	set.add(1);
	set.add(2);
	set.add(3);
	console.log(set);

	if(set.has(2)){
		set.delete(2);
	}
	console.log(set);

	set.clear();
	console.log(set);
}

// 应用：数组去重
{
	function dedupe(array) {
		// 将Set结构转换为数组
		return Array.from(new Set(array));
	}

	dedupe([1, 1, 2, 3]) // [1, 2, 3]
}

// 遍历keys()，values()，entries()
{

	let set = new Set(['red', 'green', 'blue']);

	for (let item of set.keys()) {
	  console.log(item);
	}

	// Set数据结构只有键值没有键名 keys() == values()
}


