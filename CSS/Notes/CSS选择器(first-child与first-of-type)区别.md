## `first-child` VS `first-of-type`区别(其他last-child、nth-child、last-of-type、nth-of-type效果类似)

### first-child
`first-child`表示父元素的**第一个子元素**是否能够命中该元素，若能命中,则有效;若无法命中，则无效。
例1：
```html
  <div class="wrap">
    <h1 class="child">element1</h1>
    <h2 class="child">element2</div>
    <div class="inner">
      <div class="child">element3</div>
    </div>
    <h2 class="child">element4</div>
  </div>
```
```css
.child:first-child{
  color: red;
}
```
`element1`与`element3`被命中。

例2：
```html
  <div class="wrap">
  <div class="test">test</div>
    <h1 class="child">element1</h1>
    <h2 class="child">element2</div>
    <div class="inner">
      <div class="child">element3</div>
    </div>
    <h2 class="child">element4</div>
  </div>
```
```css
.child:first-child{
  color: red;
}
```
只命中`element3`。因为父元素的第一个子元素是`test`，不是`child`，无法命中。倘若要命中`element1`，则需写成`.nth-child(2)`。


### first-of-type
命中同类型的元素(与其在父元素中的位置无关)
```html
  <div class="wrap">
    <div class="test">aaa</div>
    <h1 class="child">element1</h1>
    <h2 class="child">element2</h2>
    <div class="inner">
      <div class="child">element3</div>
    </div>
    <h2 class="child">element4</h2>
  </div>
```
```css
.child:first-of-type {
  color: red;
}
```
`element1`、`element2`、`element3`被命中。
- `element1`被命中，命中同类型第一个`h1`元素，不受`test`影响
- `element4` **没有被命中**, 因为该元素是同类型`h2`元素中的第二个


## CSS的优先级计算方法
1. 行内样式 `<p style="color:red;">test</p>` => a(1000)
2. ID选择器 => b(100)
3. 类(`class="active"`)、属性(`input[type=text]`)、伪类选择器 (`:first-child`等) => c(10)
4. 标签选择器`p`、伪元素选择器 `:after :before :first-line : first-letter ::selection ::placeholder` => d(1)

例如：`a:2  b:1  c:0  d:4`   =>` 1000 * 2 + 100 * 1 + 0 * 10 + 4 * 1`  得到计算结果，然后进行比较大小


