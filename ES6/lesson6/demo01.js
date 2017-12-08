{
	// ES5
	let obj = {
		name: "阿三",
		say: function(){
			console.log(this.name);
		}
	}
	obj.say();

	// ES6
	let name = "阿四";
	let obj2 = {
		name,
		say() {
			console.log(this.name)
		}
	}
	obj2.say();
}

// 函数返回值
{
	function test(name, age){
		return {name, age};
	}

	let obj = test("阿三", 22);
	console.log(obj);
}
