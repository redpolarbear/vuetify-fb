import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Profile from '@/components/User/Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
