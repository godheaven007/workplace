"use strict";

// const GREEN = Symbol();
// const ORANGE = Symbol();

// function getColor(color){
// 	switch(color){
// 		case GREEN: return 'green color'; break;
// 		case ORANGE: return 'orange color'; break;
// 	}
// }

// console.log(getColor(GREEN));

let mySymbol = Symbol("a");

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';
console.log(a[mySymbol])