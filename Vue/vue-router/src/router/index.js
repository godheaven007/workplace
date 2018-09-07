import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home'
// import About from '@/components/About'
// import Color from '@/components/Color'
import Home2 from '@/components/Home2'
import About2 from '@/components/About2'
import Color2 from '@/components/Color2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home/:name',
      name: 'home',
      // 字符串重定向
      redirect: '/home-copy/:name'
    },
    {
      path: '/about',
      // 命名路由重定向
      redirect: {
        name: 'about2'
      }
    },
    {
      path: '/color',
      // 回调函数重定向
      redirect: to => {
        return to.path + '-copy'
      }
    },
    {
      path: '/home-copy/:name',
      component: Home2
    },
    {
      path: '/about-copy',
      name: 'about2',
      component: About2
    },
    {
      path: '/color-copy',
      component: Color2
    }
  ]
})
