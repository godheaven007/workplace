## flex-flow
参考**flexFlow.html**

## flex-basis、auto（根据自身内容撑开）、width、min-width/min-height、max-width/max-height优先级
1. flex-basis与width， 不管width为多少，取flex-basis的值
2. flex-basis与auto，取二者中较大的值(auto内容超过父容器时，超出部分无法被shrink)
3. flex-basis与min-width，取二者中较大的值(注意：auto会失效，其内容不会撑开该元素，同时min-width超过父容器时，超出部分不会被shrink)
4. flex-basis与max-width，取二者中较小的值


## flex-grow、flex-shrink计算问题
1. flex-grow
	将剩余空间，按比例分配给各个项目。
2. flex-shrink
	与flex-grow计算方式不一样。先得到权重总和（各自的flex-shrink * flex-basis之和），然后将各自的`flex-shrink * flex-basis` / `权重总和` * `超出空间`，即为该元素所需要的收缩空间
以上，具体可以参考[flex-grow/flex-shrink计算](http://www.cnblogs.com/dehuachenyunfei/p/6527601.html)

## flex:1 与 flex:auto的区别
	`flex:auto`: 相对项目，基于Flex项目内包含的内容的大小而计算。
	`flex:1`:绝对项目，现在宽度不会基于内容大小而计算，而是基于指定的 flex 属性值来计算。
	参考**flex.html**

## max-width/min-width、min-width/min-height对flex-grow与flex-shrink计算的影响
	[参考文章](http://www.w3cplus.com/css3/flexbox-layout-and-calculation.html)
