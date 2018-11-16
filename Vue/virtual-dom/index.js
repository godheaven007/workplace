/**
	虚拟dom学习
	数据diff
*/

// 关联数据结构
// let nodesData = {
// 	tag: 'div',
// 	children: [
// 		{
// 			tag: 'p',
// 			children: [
// 				tag: 'span',
// 				children: [
// 					tag: '#text',
// 					text: '虚拟dom'
// 				]
// 			]
// 		}，
// 		{
// 			tag: 'span',
// 			children: [
// 				{
// 					tag: '#text',
// 					text: '测试'
// 				}
// 			]
// 		}
// 	]
// };
class VNode {
	constructor(tag, children, text) {
		this.tag = tag;
		this.children = children;
		this.text = text;
	}
	render() {
		if(this.tag === '#text') {
			return document.createTextNode(this.text);
		}
		let el = document.createElement(this.tag);
		this.children.forEach((vChild) => {
			el.appendChild(vChild.render());
		});
		return el;
	}
}

function v(tag, children, text) {
	if(typeof children === 'string') {
		text = children;
		children = [];
	}
	return new VNode(tag, children, text);
}

function patchElement(parent, newVNode, oldVNode, index = 0) {
	if(!oldVNode) {
		parent.appendChild(newVNode.render());
	} else if(!newVNode) {
		parent.removeChild(parent.childNodes[index]);
	} else if(newVNode.tag !== oldVNode.tag || newVNode.text !== oldVNode.text) {
		console.log(newVNode.render(),222);
		console.log(parent.childNodes[index],333);
		console.log( parent.childNodes,444)
		// parent.replaceChild(newVNode.render(), parent.childNodes[index]);
	} else {
		for(let i = 0; i < newVNode.children.length || i < oldVNode.children.length; i++) {
			patchElement(parent.childNodes[index], newVNode.children[i], oldVNode.children[i], i)
		}
	}
}

// let vNode1 = v('div', [
// 		v('p', [
// 			v('span', [v('#text', '虚拟dom')])
// 		]),
// 		v('span', [
// 			v('#text', '测试') ]
// 		)
// 	]);

// let vNode2 = v('div', [
// 		v('p', [
// 			v('span', [v('#text', '虚拟dom')])
// 		]),
// 		v('span', [
// 			v('#text', '测试') ],
// 		),
// 		v('span', [
// 			v('#text', '测试222') ],
// 		)
// 	]);


let vNode1 = v('div', []);
let vNode2 = v('p', []);

// console.log(vNodes);
// console.log(vNode2.render());

let root = document.querySelector('#root');
patchElement(root, vNode1);

// 替换标签
// patchElement(root, vNode2, vNode1);





