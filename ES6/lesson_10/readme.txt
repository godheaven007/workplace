面向对象
1、ES5
	① 原型链(__proto__、prototype)(对象字面量、new、Object.create())
	② 继承
2、ES6
	① 类的定义
	① super 指向当前对象的原型对象
	  注意!!! super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错
	② 继承


总结：
相同点：
	① 使用new命令
	② Animal.prototype.constructor == Animal
不同点：
	① ES6定义的属性不可枚举、ES5可以
	② ES5可以不用new，当做普通函数使用;ES6 必须使用new
	③ 继承机制不同
	  ES5：实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面
	  ES6：实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this
