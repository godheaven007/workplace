# ES6 Module
## export命令(3种书写方式)
1. ~~方式一(不推荐)~~
``` javascript
	export let firstName = "xu";
	export let lastName = "shufeng";
	export function test() {}
```
2. 方式二(**推荐**)
```javascript
	let firstName = "xu";
	let lastName = "shufeng";
	function test() {}
	export {firstName, lastName, test}
```
3. 方式三(起别名)
```javascript
	let firstName = "xu";
	let lastName = "shufeng";
	function test() {}
	export {firstName as fn, lastName as ln, test}
```
---

## import命令(变量名需与export时的变量名保持一致)
1. 普通
```javascript
	import {firstName, lastName, test} from './import'
```
2. 别名
``` javascript
	import {firstName as fn, lastName as ln, test} from './import'
```
---

## export default命令(导出默认值，`有且只有一个`)
```javascript
	let firstName = "xu";
	let lastName = "shufeng";
	function test() {}
	export default {firstName, lastName, test}

	import obj from './import';
```

---
## export VS export default
区别 | export | export default |
-- | -- |-- |
导入是否存在{} | 是 | 否


## 注意事项
1. export后的变量不能更改！(**对象除外**,不建议修改)