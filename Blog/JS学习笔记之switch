## 使用方法
作用等同于`if-else`语句，通常情况下，我们会给定一个变量值，放至在`switch`中，然后用该值与case中的值进行比较，来判断符合哪一个case。
```javascript
var score = 90;
switch(score) {
    case 90: console.log("优秀"); break;
    case 100: console.log("满分"); break;
    default: console.log("其他")
}
```
## 注意事项
1. 应该在每一个`case`语句后添加`break`,否则会执行到下一条`case`语句
```javascript
var score = 90;
switch(score) {
    case 90: console.log("优秀");
    case 100: console.log("满分"); 
    default: console.log("其他")
}
```
执行结果为：`优秀 满分 其他`

2. **switch**与**case**后面可接条件表达式
```javascript
var score = 90;
switch(2 > 1) {
    case score >= 90: console.log("优秀"); break;
    case score >= 70: console.log("良好"); break;
    case score >= 60; console.log("合格"); break;
    default: console.log("不合格");
}
```
执行结果为：`优秀`
执行流程如下：
- 计算`switch表达式`的值: `true`;
- 计算`case表达式`的值;
- 将二者结果进行比较，若相等，则执行当前`case`语句。

3. **switch**与**case**进行比较的时候，进行的是`全等于(===)`操作
```javascript
var score = '80';
switch(score) {
    case 80: console.log('aaa'); break;
    case '80': console.log('bbb'); break;
}
```
执行结果为:`bbb`