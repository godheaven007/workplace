// 用法
{
	let fun = param => param * 2;

	let num = fun(3);
	console.log(num);
}

// 注意：返回对象需用()括起来

{
	let test = () => ({name: "阿三", age:22});
	console.log(test());
}

// this作用域问题

{
	// ES5(运行时所在作用域)
	/*var name = "阿三";
	function Animal(){
		setTimeout(function(){
			console.log(this.name);
		},1000);
	}

	Animal.call({name:"阿四"});*/

	// ES6(箭头函数：定义时所在作用域)
	let name = "阿三";
	function Animal(){
		setTimeout(() => {
			console.log(this.name);
		},1000);
	}

	Animal.call({name:"阿四"});

}

// 例二 参见index.html

{
	/*let a = 1;
	function test(a, b = a){
		console.log(a,b);
	}

	test();*/
	let x = 1;

	function f(y = x) {
	  let x = 2;
	  console.log(y,x);
	}

	f() // 1
}