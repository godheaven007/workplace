import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Concat from '@/components/Concat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
      // 路由独享的守卫
      // beforeEnter: (from, to, next) => {
      //   next({name: 'concat', params: {name: '徐淑峰'}})
      // }
    },
    {
      path: '/concat',
      name: 'concat',
      component: Concat
    }
  ]
})
