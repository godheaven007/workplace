在日常开发中，我们经常能够碰到以下工作场景：
1.  - 对提交按钮进行变态的点击压力测试
     - 输入框内容的实时校验（譬如验证用户名是否已存在）
    
2. - 图片滚动加载`scroll`操作
    - 窗口放大缩小`resize`操作
    - 对某一区域进行`mousemove`操作

上述`频繁触发事件的操作`,如果我们不采取任何操作，势必会造成极差的用户体验。譬如，对提交按钮连续点击发起请求，会给服务器带来压力；窗口放大缩小，会连续触发浏览器的`resize`函数，如果涉及到大量的`dom操作`，势必又会引起页面的`回流与重绘`，有可能会让页面变得卡顿等等。
如果我们不想频繁的触发某一事件，这时候就可以考虑用`函数防抖、函数节流`了。

## 函数防抖(debounce)
原理：在规定的时间`t`内,如果连续触发某一事件，则不会调用事件回调函数；连续触发某一事件，`t`时间内，`不再`触发该事件，则执行事件回调函数。
我们以连续点击提交按钮为例：
- 正常操作：
```
<button id="submit">提交</button>
<script>
	function doAjax() {
		console.log("Todo ajax...");
	}
	var btn = document.querySelector("#submit");
	btn.addEventListener("click", doAjax);
</script>
```

![demo01.gif](https://upload-images.jianshu.io/upload_images/6142251-de44305c0390d2dd.gif?imageMogr2/auto-orient/strip)

在短时间内，我们对提交按钮连续点击，可以看到连续的请求被发起，我想这个时候后端的同事应该会泪流满面吧。

- 使用防抖
```
<button id="submit">提交</button>
<script>
	function doAjax() {
		console.log("Todo ajax...");
	}

	function debounce(fn, delay) {
		var timer = null;
		return function() {
			timer && clearTimeout(timer);
			var context = this,			// 将执行环境指向当前dom
				arg = arguments;		// 事件e
			timer = setTimeout(function() {
				fn.call(context, arg);
			},delay);
		}
	}

	var btn = document.querySelector("#submit");
	btn.addEventListener("click", debounce(doAjax, 1000));
</script>
```
![demo02.gif](https://upload-images.jianshu.io/upload_images/6142251-3edd7ef66b763bf2.gif?imageMogr2/auto-orient/strip)

我们可以观察到，连续点击提交按钮，并没有执行请求；隔了1s后，执行请求（也就是在这1s内，没有点击提交按钮），这样就很好的解决了我们的烦恼。

- 防抖之立即执行
上述的防抖函数，已经可以解决我们大部分场景下的问题，但有一个需要注意的点：点击该提交按钮，需要等一段时间后，才会调用函数。而我们工作当中的另外一种需求为：`点击后立即执行，在接下来的连续触发中，不执行事件回调函数`。

```
<button id="submit">提交</button>
<script>
	function doAjax() {
		console.log("Todo ajax...");
	}

	function debounce(fn, delay, isImmediate) {
		var timer = null;
		return function() {
			timer && clearTimeout(timer);
			var context = this,			// 将执行环境指向当前dom
				arg = arguments;		// 事件e

			if(isImmediate) {
				!timer && fn.call(context, arg);	// timer为null（即没有被执行过，或被重置）
				// 立即执行，后续连续点击不起作用
				timer = setTimeout(function() {
					timer = null;
				}, delay);
				
			} else {
				timer = setTimeout(function() {
					fn.call(context, arg);
				},delay);
			}
		}
	}

	var btn = document.querySelector("#submit");
	btn.addEventListener("click", debounce(doAjax, 1000, true));
</script>
```
![demo03.gif](https://upload-images.jianshu.io/upload_images/6142251-cf3a3c87104961a1.gif?imageMogr2/auto-orient/strip)

从上图我们可以观察到：第一次点击，请求被执行，后续连续的点击操作都不被执行；等过了1s后，再次点击，请求被执行。

## 函数节流(throttle)
原理：连续触发某一事件，会固定每隔一段时间执行一次事件回调函数(区别于防抖的连续触发，不执行事件回调函数)
这里，我们以`mousemove`事件举例：
- 正常操作
```
<div id="box"></div>
<script>
	var box = document.getElementById("box");
	var count = 1;
	function doAction() {
		box.innerText = count++;
	}
	box.addEventListener("mousemove", doAction);
</script>
```
![demo04.gif](https://upload-images.jianshu.io/upload_images/6142251-d5151b278097024b.gif?imageMogr2/auto-orient/strip)
可以看到，我们的小鼠标，轻轻一划，连续触发了不知道多少次`mousemove`事件，如果这里涉及到复杂的ajax操作，那又要悲剧了，ε(┬┬﹏┬┬)3！

- 节流之时间戳实现
```
<div id="box"></div>
<script>
	var box = document.getElementById("box");
	var count = 1;
	function doAction() {
		box.innerText = count++;
	}
	function throttle(fn, delay) {
		var start = new Date();
		return function() {
			var context = this,			// 将执行环境指向当前dom
				arg = arguments;		// 事件e
			var current = new Date();

			if(current - start >= delay) {
				fn.call(context, arg);
				start = current;
			}
		}
	}


	box.addEventListener("mousemove", throttle(doAction, 1000));
```

![demo05.gif](https://upload-images.jianshu.io/upload_images/6142251-46d2b7745cc3dede.gif?imageMogr2/auto-orient/strip)

由上图我们可以观察到：在蓝色块内，连续触发`mousemove`事件，数字以恒定速率（这里是1s）出现。


- 节流之定时器实现
```
<div id="box"></div>
<script>
	var box = document.getElementById("box");
	var count = 1;
	function doAction() {
		box.innerText = count++;
	}
	function throttle(fn, delay) {
		var timer = null;
		return function() {
			var context = this,			// 将执行环境指向当前dom
				arg = arguments;		// 事件e
			if(!timer) {
				timer = setTimeout(function() {
					timer = null;
					fn.call(context, arg);
				},delay);
			}
		}
	}

	box.addEventListener("mousemove", throttle(doAction, 1000));
```

![demo06.gif](https://upload-images.jianshu.io/upload_images/6142251-ab9ba6ea8513991c.gif?imageMogr2/auto-orient/strip)
观察上图，在蓝色块内，连续触发`mousemove`事件，数字以恒定速率出现。

二者区别如下：
- 时间戳版会在开始时立即执行一次，最后时间间隔内不再执行；（注册事件函数的时候，会执行一次，拿到初始时间，等你`mousemove`的时候，时间间隔肯定远大于你的`delay`时间，或者你不等待，直接触发`mousemove`事件）
- 定时器版开始时不执行，最后时间间隔内再执行一次。

## 总结
### 防抖与节流的区别
**函数防抖**好比是公交车停靠在站台后，乘客源源不断地上车，但司机只会等所有乘客上车之后，才发车。
  **函数节流**好比是你每天都会喝水，但是你不会一喝水就上厕所，而是每隔一段时间就去上厕所。

### 应用场景区别
> 函数节流不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数，而函数防抖只是在最后一次事件后才触发一次函数。 比如在页面的无限加载场景下，我们需要用户在滚动页面时，每隔一段时间发一次 Ajax 请求，而不是在用户停下滚动页面操作时才去请求数据。这样的场景，就适合用节流技术来实现。


> 参考文献
[司徒正美-函数防抖与函数节流](https://zhuanlan.zhihu.com/p/38313717)
[虾扯蛋之函数防抖和节流](https://juejin.im/post/5b45fa596fb9a04fad3a0268#comment) 
[前端麻辣烫-JS函数节流与防抖](https://mp.weixin.qq.com/s/Vkshf-nEDwo2ODUJhxgzVA)
