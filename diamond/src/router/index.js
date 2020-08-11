import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Person from '../pages/Person/Person'
import Welcome from "../pages/Welcome";
import PersonInfo from '../pages/PersonInfo/PersonInfo'
import Editor from '../pages/Editor/Editor'

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
      path: '/person',
      component: Person
    },
    {
      path:'/',
      redirect:'/welcome'
    },
    {
      path:'/welcome',
      name:'Welcome',
      component:Welcome
    },
    {
      path:'/personInfo',
      component:PersonInfo
    },
    {
      path:'/editor',
      component: Editor
    },
  ]
})
