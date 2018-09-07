import Vue from 'vue'
import Router from 'vue-router'
import Student from '@/components/Student'
import Teacher from '@/components/Teacher'
import Parent from '@/components/Parent'
import Nav from '@/components/Nav'
import Classes from '@/components/Classes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/setting',
      component: Nav,
      children: [
        {
          path: 'student',
          name: 'student',
          components: {
            default: Classes,
            foo: Student
          }
        },
        {
          path: 'teacher',
          name: 'teacher',
          components: {
            default: Classes,
            foo: Teacher
          }
        },
        {
          path: 'parent',
          name: 'parent',
          component: Parent
        }
      ]
    }
  ]}
)
