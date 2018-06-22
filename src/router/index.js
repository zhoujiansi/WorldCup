import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import Login from '@/view/Login'
import Teacher from '@/view/Teacher'
import WorldCup from '@/view/WorldCup/WorldCup'
import Result from '@/view/Result'
import Schedule from '@/view/Schedule'
import Rule from '@/view/Rule'
import Accept from '@/view/Accept'
import Exchange from '@/view/Exchange'
import Counts from '@/view/Counts'
/*const Home = () => import('@/view/Home')
const Result = () => import('@/view/Result')*/

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Teacher',
      name: 'Teacher',
      component: Teacher
    },
    {
      path: '/Result',
      name: 'Result',
      component: Result
    },
    {
      path: '/Schedule',
      name: 'Schedule',
      component: Schedule
    },
    {
      path: '/Rule',
      name: 'Rule',
      component: Rule
    },
    {
      path: '/Accept',
      name: 'Accept',
      component: Accept
    },
    {
      path: '/Exchange',
      name: 'Exchange',
      component: Exchange
    },
    {
      path: '/Counts',
      name: 'Counts',
      component: Counts
    },
    {
      path: '/WorldCup',
      name: 'WorldCup',
      component: WorldCup
    }
  ]
})
