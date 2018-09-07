import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Sidebar from '@/components/Sidebar'
import Main from '@/components/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/router1',
      components: {
        sidebar: Sidebar
      }
    },
    {
      path: '/router2',
      components: {
        sidebar: Sidebar,
        main: Main
      }
    }
  ]
})
