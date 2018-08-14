// ES5
{
	// function Animal(name, age) {
	// 	this.name = name;
	// 	this.age = age;
	// }

	// Animal.prototype.sex = "male";
	// Animal.prototype.say = function(){
	// 	console.log(this.name, this.age, this.sex);
	// }

	// var cat = new Animal("cat", 5);
	// cat.say();

	// var dog = new Animal("dog", 10);
	// dog.say();
}

// 原型链继承
{
	function test(key, obj){
		return (key in obj) && (!obj.hasOwnProperty(key));
	}

	function Father(firstName) {
		this.firstName = firstName;
	}

	Father.prototype.say = function(){
		console.log("My name is " + this.firstName + " " + this.lastName, ". age:" + this.age);
	}

	function Son(lastName, age) {
		this.lastName = lastName;
		this.age = age;
	}

	Son.prototype = new Father("Michael");

	var son = new Son("Jackson", 22);
	son.say();

	console.log(Object.getPrototypeOf(Son) == Father);
	for(var key in son) {
		if(test(key, son)) {
			console.log("原型属性: " + key);
		} else {
			console.log("实例属性: " + key);
		}
	}

}
