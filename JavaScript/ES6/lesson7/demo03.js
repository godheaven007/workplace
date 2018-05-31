{
	function test(fruit){
		let type = 0;
		switch(fruit) {
			case 'apple': type = 0; break;
			case 'orange': type = 1; break;
			case 'pear': type = 2; break;
			default: type = 0;
		}
		return type;
	}

	test('apple');

	// 字符串apple在代码中强耦合，改一处需要改多处
}

// ES5
{
	const Fruit = {
		apple: 'apple',
		orange: 'orange',
		pear: 'pear'
	}

	function test(fruit){
		let type = 0;
		switch(fruit) {
			case Fruit.apple: type = 0; break;
			case Fruit.orange: type = 1; break;
			case Fruit.pear: type = 2; break;
			default: type = 0;
		}
		return type;
	}

	test(Fruit.apple);
}

// ES6
{
	const Fruit = {
		apple: Symbol(),
		orange: Symbol(),
		pear: Symbol()
	}

	function test(fruit){
		let type = 0;
		switch(fruit) {
			case Fruit.apple: type = 0; break;
			case Fruit.orange: type = 1; break;
			case Fruit.pear: type = 2; break;
			default: type = 0;
		}
		return type;
	}

	test(Fruit.apple);
}
