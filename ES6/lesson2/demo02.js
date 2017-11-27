// 基本用法(先匹配后赋值)
{
	let {name: name, age: age} = {name: "阿三", age: 22}
	console.log(name, age);

	// 简写
	// let {name, age} = {name: "阿三2", age: 22}
	// console.log(name, age);
}

// 嵌套赋值
{
	let obj = {
	  p: [
	    'Hello',
	    { y: 'World' }
	  ]
	};

	let { /*p:p1,*/ p: [x, { y }] } = obj;
	console.log(/*p1,*/x, y);
}

// 指定默认值
{
	let {x = 1} = {};
	let {y: y2 = 3} = {y:5};
	console.log(x, y2);
}

// undefined null
{
	let {name = "阿斯", age = 11} = {name: undefined, age:null};
	console.log(name, age);
}

// 数组的对象结构
{
	let arr = [1, 2, 3];
	let {0: first, [arr.length -1] : last} = arr;
	console.log(first, last);
}

// 结构方法
{
	let animal = {
		say: function(){
			console.log(1111);
		}
	}

	let {say} = animal;
	say();
}
