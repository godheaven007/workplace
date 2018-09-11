# travel

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 问题列表
- 为什么安装node-sass、sass-loader后，就可以直接使用？

1rem = 375px/10  (10分之一个页面宽度)

1rem = 37.5px

375/2/37.5 = ? rem

- EsLint 好烦人！(分号不写不习惯)

## 技能点
- 目录指定(webpack.base.config中配置)，特别注意的是CSS的写法如下：
  `~Alias/../..`
- padding百分比实现图片宽高比例自适应(占位，图片加载未完毕时，防止下方文字抖动)
- scoped深度选择器(SCSS用 `/deep/`，其他css预处理器用`>>>`)
- 开发环境下，访问同一接口，如何转发至本地模拟数据？(代理)
  ```
    proxyTable: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {
          '^api': 'static/mock'
        }
      }
    },
  ```
- 城市列表组件与右侧字母表组件联动(可以通过bus总线机制实现，这里数据传递较为简单，直接将数据返给根组件，再由根组件分发数据)
- 城市列表与右侧字母表联动效果实现原理
  城市列表：[A, B, C, D, E, F,...];当手指触摸城市列表区域时，如果能获取到该触摸区域在城市列表中所处的位置，就可以实现该功能。
  ---
  如何获取位置？
  (触摸点距离屏幕顶部的距离 - Header部分距离 - 首字母`A`距离其父容器的距离) / 字母的高度，向下取整，即为该触摸点在城市列表中的索引
  ---
  需要注意的细节点
  触摸点有可能在字母`A`的上方或字母`Z`的下方，需考虑在内

## 细节点
- 轮播组件默认没有显示第一页
- 字母表`touchMove`的时候，会频繁触发该事件，需要进行函数节流
- localStorage：若用户采用了隐身模式，直接使用会报错，简易`try...catch`
- 城市列表页是固定的（也就是说只需要请求一次，不需要每次路由进来就请求一次数据）
  利用`keep-alive`缓存组件，下次用的时候直接从内存中取出
- 首页，请求数据需加上`city`字段，且应该判断若当前城市没有变化，则不需要重新发请求，只有城市变化时，才重新发请求
- 图片展示公用组件不要放在`Detail.vue`中，而应该放在对应的`Banner.vue`组件中，减少逻辑操作（否则需通过$emit实现父子组件传值，稍显麻烦）
- `Swiper`若左右滑动异常，是因为dom更新后，`Swiper`未更新，可以通过修改`observe`和`observeParents`解决，具体参考Swiper官网
- 详情页`detail`中头部渐隐渐现实现原理
  向下滚动一小段距离后（譬如10px），`Header`部分开始渐现，在向下滚动距离区间内（譬如10px ~ 100px），通过动态改变其`opacity`值，达到渐隐渐现的效果，计算公式为：`opacity` = distance / 100 > 1 ? 1 : distance / 100`
- 将滚动事件写在`Header`组件内而不是`Detail`组件内，是因为写在`Detail`组件内，还需要向子组件传值，稍显麻烦
- 将滚动事件绑定在`全局window`上，有可能会带来潜在bug，在该项目中，可以在`deactivated`中解除对window的scroll事件的绑定
- 组件中`name属性`的三大作用：`递归组件`, `缓存组件（keep-alive）中的include以及exclude`、`vue-devtool`
- 路由切换，会保持前一页的滚动距离，参考路由`滚动行为`
  ```
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
  ```






## 注意点
- 箭头函数不要乱用，否则会访问不到当前实例
```
// 错误方式
{
  el: '#app',
  methods: {
    test: () => {
      console.log(this)
    }
  }
}

// 正确方式
{
  el: '#app',
  methods: {
    test() {
      console.log(this)
    }
  }
}
```
## 未明白点
- `keep-alive`的使用
- `递归组件`如何使用

## 真机调试
1. `Vue`不支持ip地址访问，原因是`Vue`是通过`webpack-dev-server`启动服务的，默认不支持外部访问；可以通过配置`host`选项，开启外部访问 [参考链接](https://webpack.docschina.org/configuration/dev-server/#devserver-host)

2. 通过修改`package.json`文件中的`script`内容，如下：
`"dev": "webpack-dev-server --inline --host 0.0.0.0 --progress --config build/webpack.dev.conf.js",`
