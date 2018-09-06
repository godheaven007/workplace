import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import About1 from '@/components/About1'
import About2 from '@/components/About2'
import DefaultContent from '@/components/DefaultContent'

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
      component: About,
      children: [
        {
          // 访问/about时，提供默认的组件供展示(或者写成path: '/'也是可以的)
          path: '',
          name: 'DefaultContent',
          component: DefaultContent
        },
        {
          // 注意！这里不要画蛇添足写成 path: '/about1'
          path: 'about1',
          name: 'about1',
          component: About1
        },
        {
          path: 'about2',
          name: 'about2',
          component: About2
        }
      ]
    }
  ]
})
