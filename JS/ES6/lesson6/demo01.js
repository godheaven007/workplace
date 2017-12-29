// 数据属性
{
	// enumerable、configurable、writable、value
	var obj = {};
	Object.defineProperty(obj, "name", {
		value: "aaa"
	});

	console.log(obj);
}

// 访问器属性
{
	var obj = {
	    name: "aaa",
	    year: "",
	    grade: ""
	};

	Object.defineProperty(obj, "year", {
	    get: function(){

	    },
	    set: function(value){
			this.grade = value - 2012;
	    }
	})
	obj.year = 2020;
	console.log(obj.grade);
}

// 多属性定义
{
	var obj = {};

	Object.defineProperties(obj,{
	   name: {value: "111"},
	   grade: {value: "",writable: true},
	   year: {
			set: function(value){
				this.grade = value - 2000
	        }

	   }
	})
	obj.year = 2018;
	console.log(obj.grade);
}

// 获取属性修饰符
{
	let obj = {};

	Object.defineProperties(obj, {
		name: {
			value: "安安"
		},
	    grade: {value: "",writable: true},
	    year: {
			set: function(value){
				this.grade = value - 2000
	        }

	    }
	});

	let descriptor = Object.getOwnPropertyDescriptor(obj, "year");
	console.log(descriptor.set);

}
