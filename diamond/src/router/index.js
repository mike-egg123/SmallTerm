import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Welcome from "../pages/Welcome";
import PersonInfo from '../pages/PersonInfo/PersonInfo'
import Workplace from '../pages/workplace/Workplace'
import Mydoc from '../pages/workplace/Mydoc'
import Recent from '../pages/workplace/Recent'
import Recycler from '../pages/workplace/Recycler'
import Star from '../pages/workplace/Star'
import Team from '../pages/workplace/Team'
import Teamboth from '../pages/Teampages/Teamboth'
import Created from '../pages/Teampages/Created'
import Joined from '../pages/Teampages/Joined'
import Newdoc from '../pages/workplace/Newdoc'
import Authorization from '../pages/Teampages/Authorization'
import Authorization_no from '../pages/Teampages/Authorization_no'
import Edit from '../pages/editpages/Edit'
import Test from '../pages/Editor/Test'

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
      path:'/welcome',
      name:'Welcome',
      component:Welcome
    },
    {
      path:'/personInfo',
      component:PersonInfo
    },
    {
      path:'/edit/:articleid',
      component:Edit
    },,
    {
      path:'/workplace',
      name:'Workplace',
      component:Workplace,
      children: [
        {
          path: 'mydoc',
          name: 'Mydoc',
          component: Mydoc
        },
        {
          path: 'recent',
          name: 'Recent',
          component: Recent
        },
        {
          path: 'recycler',
          name: 'Recycler',
          component: Recycler
        },
        {
          path: 'star',
          name: 'Star',
          component: Star
        },
        {
          path: 'team',
          name: 'Team',
          component: Team,
          children:[
            {
              path: 'authorization',
              name: 'Authorization',
              component: Authorization
            },
            {
              path: 'authorization_no',
              name: 'Authorization_no',
              component: Authorization_no
            },
            {
              path: 'teamboth',
              name: 'Teamboth',
              component: Teamboth,
            },
            {
              path: 'created',
              name: 'Created',
              component: Created,
            },
            {
              path: 'joined',
              name: 'Joined',
              component: Joined,
            },
            {
              path: '/',
              redirect:'teamboth'
            },
          ]
        },
        {
          path: 'newdoc',
          name: 'Newdoc',
          component: Newdoc,
        },
        {
          path:'',
          redirect:'newdoc'
        }
      ]
    },
    {
      path:'/',
      redirect:'/welcome'
    }
  ]
})
