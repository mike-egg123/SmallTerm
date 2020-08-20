import Vue from 'vue'
import VueRouter from 'vue-router'
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
import Edit from '../pages/editpages/Edit'
import Notice from '../pages/Notice/Notice'
import SearchResult from '../pages/workplace/SearchResult'
import OtherPersonInfo from '../pages/OtherPersonInfo/OtherPersonInfo'
import Jump from '../pages/Jump/Jump.vue'


Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new VueRouter({
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
      path: '/otherPersonInfo',
      component: OtherPersonInfo
    },
    {
      path:'/edit/:articleid',
      component:Edit
    },
    {
      path:'/notice',
      component:Notice
    },
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
          path: 'searchresult',
          name: 'SearchResult',
          component: SearchResult
        },
        {
          path: 'team',
          name: 'Team',
          component: Team,
          children:[
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
          path:'/',
          redirect:'recent'
        }
      ]
    },
    {
      path:'/:articleid',
      component:Jump,
    },
    {
      path:'/',
      redirect:'/welcome'
    },   
  ]
})
