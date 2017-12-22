{
	// let arr = ['a', 'b', 'c'];
	// let iter = arr[Symbol.iterator]();

	// console.log(iter.next()); // { value: 'a', done: false }
	// console.log(iter.next()); // { value: 'b', done: false }
	// console.log(iter.next()); // { value: 'c', done: false }
	// console.log(iter.next()); // { value: undefined, done: true }


	let mm = Symbol('mm');
	let obj = {
		[mm]: 'name'
	}

	console.log(Object.getOwnPropertySymbols(obj));
	// Symbol对象的遍历
	// console.log(Symbol('name') == Symbol('name'));
}