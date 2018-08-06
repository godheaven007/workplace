ES5中，有`number`，`string`，`boolean`，`undefined`，`null`这5种基本类型数据，外加`object`引用类型数据（包括`对象`，`数组`，`函数`）。

## 强制转换
### Number：可以将任意类型数据转换成`number`类型。
`基本类型转换为number类型`

|转换类型| 结果(number)|备注|
|---|---|---|
100|100| |
'100'|100||
'  '|0| `空字符和空格都被转成0` |
'100abc'| NaN|`区别于parseInt('100abc')=100,Number更严格`|
true| 1| |
false| 0 | |
null | 0| `区别于undefined，需特别注意` |
undefined | NaN | |
----------------

`引用类型转换为number类型`,转换规则如下：
1. 调用对象自身的`valueOf`方法。如果返回原始类型的值，则直接对该值使用`Number`函数，不再进行后续步骤;
2. 如果`valueOf`方法返回的还是对象，则改为调用对象自身的`toString`方法。如果`toString`方法返回原始类型的值，则对该值使用`Number`函数，不再进行后续步骤。
3. 如果`toString`方法返回的是对象，就报错。
(**`这里，valueOf方法优先于toString调用`**,示例如下)
```
var obj = {
    valueOf: function() {
        return 111;
    },
    toString: function() {
        return 222;
    }
}
Number(obj);  // 111
```

|转换类型| 结果(number)|备注|
|---|---|---|
[]| 0| `[].toString() == ''`|
[1]| 1| `[1].toString() =='1'`|
[1,2,3]| NaN | `[1,2,3].toString() == '1,2,3'`|
function(){}| NaN | `function(){}.toString() == 'function(){}'` |
{}| NaN| `{}.toString() == '[object Object]'`|




### String()：可以将任意类型的值转化成`string`类型。
`基本类型转换为string类型`

|转换类型| 结果(string)|备注|
|---|---|---|
100|'100'| |
'100'|'100'||
true| 'true'| |
false| 'false' | |
null | 'null'|  |
undefined | 'undefined' | |

`引用类型转换为string类型`,转换规则如下：
1. 先调用对象自身的toString方法。如果返回原始类型的值，则对该值使用String函数，不再进行以下步骤。
2. 如果toString方法返回的是对象，再调用原对象的valueOf方法。如果valueOf方法返回原始类型的值，则对该值使用String函数，不再进行以下步骤。
3. 如果valueOf方法返回的是对象，就报错。
(**`这里，toString方法优先于valueOf调用`**,示例如下)
```
var obj = {
    valueOf: function() {
        return 111;
    },
    toString: function() {
        return 222;
    }
}
String(obj);  // 222
```
----
|转换类型| 结果(string)|备注|
|---|---|---|
[]| `''`| |
[1]| `'1'`| |
[1,2,3]| `'1,2,3'` | |
function(){}| `'function(){}'` |  |
{}| `'[object Object]'`| |

### Boolean()：可以将任意类型的值转为`boolean`类型。

|转换类型| 结果(boolean)|备注|
|---|---|---|
undefined | `false`| |
null | `false`| |
+0 | `false`| |
-0 | `false`| |
NaN | `false`| |
''| `false`| |
' '| `true`| `空格区别于空字符串`|
其他| `true`| |


### a==b判断
将等式两边都往`number`上靠(undefined == null，比较特殊)

|转换类型| 结果|备注
|---|---|---|
|"" == 0 |`true` | `Number("") == 0`
|" " == 0 | `true`|`Number(" ") == 0`|
|"" == true| `false`|`Number("") == 0, Number(true) == 1`|
| "" == false|`true` |`Number("") == 0, Number(false) == 0`|
|" " == true | `false`|`Number(" ") == 0, Number(true) == 1`|
|!" " == true | `false`| `Number(!" ") == 0, Number(true) == 1`|
|!" " == false |`true` | `Number(!" ") == 0, Number(false) == 0`|
| "hello" == true|`false` |`Number("hello") == NaN, Number(true) == 1`|
|"hello" == false | `false`|`Number("hello") == NaN, Number(false) == 0`|
|"0" == true | `false`| `Number("0") == 0, Number(true) == 1`|
|"0" == false | `true`|`Number("0") == 0, Number(false) == 0`|
|"00" == false |`true` |`Number("00") == 0, Number(false) == 0`|
|"0.00" == false |`true` |`Number("0.00") == 0, Number(false) == 0`|
|undefined == null |`true `| **比较特殊**|
| {} == true | `false`| `Number({}) ==NaN, Number(false) == 0`|
| [] == true| `false`| `Number([]) == 0, Number(true) ==1`|
| [] == false| `true`| `Number([]) == 0, Number(false) ==0`|
| var obj = { a: 0, valueOf: function(){return 1}}| -|-|
|obj == "[object Object]"|`false`| `Number(obj) == 1,Number("[object Object]" == NaN)`
|obj == 1|`true`|`Number(obj) == 1`|
|obj == true|`true`| `Number(obj) == 1, Number(true) == 1`|

### if(xxx)
按照`Boolean()`强制转换规则转换

## 自动转换
坚持一条原则：`预期什么类型，就往该类型上靠`。
1. 自动转`string`类型
```
'5' + 1 // '51'
'5' + true // "5true"
'5' + false // "5false"
'5' + {} // "5[object Object]"
'5' + [] // "5"
'5' + function (){} // "5function (){}"
'5' + undefined // "5undefined"
'5' + null // "5null"
```
2. 自动转 `number`类型
```
'5' - '2' // 3
'5' * '2' // 10
true - 1  // 0
false - 1 // -1
'1' - 1   // 0
'5' * []    // 0
false / '5' // 0
'abc' - 1   // NaN
null + 1 // 1
undefined + 1 // NaN
```
3. 自动转`boolean`类型
参考前面`Boolean()`强制转换

4. 特殊情况
>但是，在我进行测试的时候，发现了几个特殊的例子，{}+1、{}+[] 这两个例子在控制台打印出的结果为 1 和 ""，很奇怪是吧？我搜了搜资料发现，不同浏览器对其的解析不同，它会将前面一个 {} 当成代码块，于是上面的式子就变成了 +1 和 +[]，所以得出了上面的结果。
作者：小烜同学
链接：https://juejin.im/post/5a9bd5cf51882555784d675b
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

针对上面这种例外，我们可以通过`()`运算符解决。
`{} + 1` = `+1` = `1`(浏览器将`{}`解析成代码块)
`({}) + 1` = `[object Object]1`
`[] + {}` = `[object Object]`
`{} +[]` = `+[]` = `0`(浏览器将`{}`解析成代码块)
`({}) + []` = `[object Object]`



> 参考文献
[阮一峰-数据类型转换](http://javascript.ruanyifeng.com/grammar/conversion.html)
[前端小生面试之看不懂的 **[ ]+{ }**](https://juejin.im/post/5a9bd5cf51882555784d675b)