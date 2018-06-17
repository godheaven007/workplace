## flex-grow 与flex-shrink如何计算

[参考文章](http://www.cnblogs.com/dehuachenyunfei/p/6527601.html)

注意！`flex-shrink`需要**加权求和**后，重新计算各个部分所占的百分比，然后将剩余空间乘以各自所占的百分比(而不是简单的将各自的`flex-shrink`相加后，求各自所占百分比)
