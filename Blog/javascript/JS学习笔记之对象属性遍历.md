## 属性类型
JS中，对象的属性包括两类：`自身属性(实例属性)`以及`继承属性(原型属性)`。在这两类属性中，又有`可枚举属性`和`不可枚举属性`之分。

```
// 自身属性
var obj = {
  name: '小明',
  age: 10
};

// 继承属性
var obj2 = Object.create(obj);
obj2.name    // 小明

// 不可枚举属性
var obj3 = {};
Object.defineProperty(obj3, 'name', {
  enumerable: false, // 默认为false
  value: '不可枚举'
})
```
## 遍历对象属性方法
对于对象属性的遍历，JS提供了以下几种方法：
- `Object.keys()`
- `Object.getOwnPropertyNames()`
- `for ... in`

本文讨论的就是基于上述几种对象属性遍历的区别。

## 各遍历方法区别
话不多说，先弄点伪代码测试一下，如下：
```
function Person(name) {
  this.name = name;
}
Person.prototype.sex = 'male';
Person.prototype.introduce = function() {
  console.log(this.name + ': ' + this.sex);
};
// 定义一个不可枚举的原型对象属性
Object.defineProperty(Person.prototype, 'money', {
  value: 1000
});
var student = new Person('小明');
// 定义一个不可枚举的实例属性
Object.defineProperty(student, 'age', {
  value: 10
});
```
上面代码模拟了一个简单的原型链，如果看的不清楚，可以看下面的原型链图：![对象属性遍历原型.png](https://upload-images.jianshu.io/upload_images/6142251-29c0c16b26e300cb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


现在，开始测试各个方法的结果：
1. Object.keys(student)：`['name']`
2. Object.getOwnPropertyNames(student): `['name', 'age']`
3. for(var key in student): `name, sex, introduce`

根据原型图跟上面的结果，可以得出以下总结：

1. `Object.keys()`: 获取的是**可枚举的实例属性**
2. `Object.getOwnPropertyNames()`: 获取的是**所有实例属性**(枚举+不可枚举)
3. `for ... in`: 获取的是`实例和原型链上`的**可枚举属性**










