import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/components/Root'
import Home from '@/components/Home'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Root,
      alias: ['/root', '/root2']
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      alias: '/xusf'
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      alias: ['/aaa', '/bbb', '/ccc']
    }
  ]
})
