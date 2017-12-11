{
	// for...in、for...of、Object.keys() 、Object.hasOwnPropertyNames()

	function Animal(name, age){
		this.name = name;
		this.age = age;
	}

	// 原型
	Animal.prototype.address = "China";
	Animal.prototype.say = function(){
		console.log("Hello!!!");
	}

	let dog = new Animal("kitty", 22);

	// 定义新的属性
	Object.defineProperty(dog, "eyeColor", {
		value: "blue",
		enumerable: false,
	});

	Object.defineProperty(dog, "hairColor", {
		value: "red",
		enumerable: true
	});

	// for...in 可枚举的实例属性和原型属性
	console.log("for...in遍历：");
	for(let key in dog){
		console.log(key);
	}

	// Object.keys() 可枚举的实例属性
	console.log("Object.keys遍历：");
	console.log(Object.keys(dog));

	// Object.hasOwnPropertyNames 除原型链以外的所有属性(包括不可枚举属性)
	console.log("Object.hasOwnPropertyNames遍历：");
	console.log(Object.getOwnPropertyNames(dog));	

	// for...of  ES6取值
	console.log("for...of遍历：");
	let arr = [3, 4, 5];
	for(let value of arr){
		console.log(value);
	}
}


// Symbol
{
	let age = Symbol("age"),
		address = Symbol("address");
	let obj = {
		[age]: 22,
		[address]: "China",
		name: "阿三"
	}
	console.log(Object.getOwnPropertySymbols(obj));
	// 返回所有属性
	console.log(Reflect.ownKeys(obj));
}