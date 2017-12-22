{
	class Father {
		constructor(firstName) {
			this.firstName = firstName;
		}
		static say(){
			console.log(1111);
		}
	}

	class Son extends Father {
		constructor(firstName) {
			// 这里必须用super，因为子类没有this
			// this.lastName = firstName;
			super(firstName);
		}
	}	


	let son = new Son("Michael");
	// 注意！这里区别于ES5
	console.log(Object.getPrototypeOf(Son) == Father);
	console.log(Object.getPrototypeOf(son) == Son.prototype);
	// Son.say();
}


// {
// 	class Foo {
// 		name = "aaa";
// 	}

// 	Foo.name = "aaa";
// 	let fo = new Foo();
// 	console.log(Foo.name, fo.name);
// }