// this  指向当前对象
// super 指向当前对象的原型对象
{
	let prototype = {
		name: 'hello2',
		test(){
			console.log(this.name);
		}
	}

	let obj = {
		name: "world",
		test(){
			console.log(this.name);
			super.test();
			// 等价于？
		}
	};

	// 设置原型
	Object.setPrototypeOf(obj, prototype);
	// console.log(obj.__proto__ == prototype);
	obj.test();
}