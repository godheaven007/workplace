{
	function test(key, obj){
		return (key in obj) && (!obj.hasOwnProperty(key));
	}

	class Animal {
		constructor(name, age) {
			this.name = name;
			this.age = age;
			this.sex = "male";
			this.say2 = function(){}
		}

		say() {
			console.log(this.name, this.age, this.sex);
		}

		static say(){
			console.log("静态方法!");
		}
	}

	// 类的数据类型就是函数，类本身就指向构造函数
	// console.log(typeof Animal);
	// console.log(Animal.prototype.constructor == Animal);

	let cat = new Animal("cat2", 12);

	for(var key in cat) {
		if(test(key, cat)) {
			console.log("原型属性: " + key);
		} else {
			console.log("实例属性: " + key);
		}
	}

	console.log(Animal.prototype);

	// cat.say();
	// Animal.say();
}