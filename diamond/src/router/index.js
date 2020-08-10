import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login/login'
import Register from '../pages/register/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/',
      redirect:'/register'
    }
  ]
})
