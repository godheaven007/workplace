本文主要讲解一下`var`与`let`在使用上的一些区别。

## 变量申明提升
`var`允许变量申明提前;但`let`不允许（即`let必须申明之后才能使用`）
```
console.log(num);
var num = 10;
// 输出结果: undefined

console.log(num2);
let num2 = 20;
// 报错
```

## 块级作用域
在ES6之前，只有函数存在块级作用域一说(外部无法`直接`访问函数内部的变量)。在ES6中，由`{}`号包裹的区域就形成了一个块级作用域，`let`申明的变量，只在当前`{}`号内有效。
```
for(var i = 0; i < 5; i++) {
}
console.log(i);
// 输出结果为：5

for(let j = 0; j < 5; j++) {
}
console.log(j);
// 报错
```

## 变量重新申明
`var`允许重新定义某个变量;`在同一个块级作用域内,let不允许重新申明！`
```
var num = 10;
var num = 20;
console.log(num);
// 输出结果：20

// 同一块级作用域
{
  var num2 = 30;
  let num2;
  // 报错，提示num2已经被申明
}

// 不同块级作用域
{
  let result = 1;
  {
    let result = 2;
  }
  console.log(result);
}
```

## 暂时性死区
网上很多资料对其解释的比较绕，其实压根就不需要太在意这些概念。
秉持一个原则：`let必须先申明再使用！` `let必须先申明再使用！` `let必须先申明再使用！`重要的事情说三遍！！！就可以避免该问题。
```
let color = 'red';
function getColor() {
  color = 'green';
  let color;
  return color;
}
getColor();
// 报错，虽然不同块级作用域，可以重新申明变量，但是不允许在未申明之前直接使用
```
## window对象
另外一个小的细节点，那就是`window`对象。
```
var a = 1;
window.a // 输出结果为：1

let b = 2;
window.b  // 输出结果：undefined
```


## const(具有let一样的特性)
`const`申明变量时，需要注意2点：
1. `申明后必须直接初始化`，不能留在以后赋值，否则报错;
2. `const申明的变量并不是固定不变的`
针对第二点，单独说明如下：
```
const MAX = 100;
MAX = 200;
// 报错，普通变量用const申明后，无法再修改

const Student = {
  name: '小红'
};
Student.name = '小明';  // 可以修改
Student = {};                  // 报错
```
根据上面两个例子可知：`const`申明的变量,如果是普通变量，确实无法再修改；但如果是引用类型的变量(数组、对象),则可以修改。也就是说，`const申明的变量是不变的，指的是变量所指向的内存地址的不变`。