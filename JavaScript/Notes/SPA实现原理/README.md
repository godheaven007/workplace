## SPA实现原理

### History 实现（存在兼容性问题，需高版本浏览器支持）
	`pushState(replaceState) + onpopstate监听事件`
	```
		dom.addEventListener('click', ()=> {
			history.pushState({name: data}, null, '/a.html')
		});
		window.addEventListener('popstate', (e)=>{
			console.log(e.state);
			// TODO...做一些你想做的事情
		})
	```

### Hash实现
	`location.hash + hashChange事件`

	```
		dom.addEventListener('click', ()=> {
			location.hash = '#top';
		});
		window.addEventListener('hashChange', (e)=>{
			console.log({
				href: location.href,
				hash: location.hash
			});
			// TODO...做一些你想做的事情
		})
	```