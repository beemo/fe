import Vue from 'vue'
import Router from 'vue-router'
import List from '@/pages/List'
import Home from '@/pages/Home'
import Create from '@/pages/Create'
import Login from '@/pages/LogIn'
import Logout from '@/pages/LogOut'
import SignUp from '@/pages/SignUp'
import Edit from '@/pages/Edit'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit
    }
  ]
})
