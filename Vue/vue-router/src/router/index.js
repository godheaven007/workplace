import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/user/:username/sex/:sex',
      name: 'User',
      component: User
    }
  ]
})
