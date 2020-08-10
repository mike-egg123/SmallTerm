import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Welcome from "../pages/Welcome";

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
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
          path: '/login',
          component: Login
        },
        {
          path: '/register',
          component: Register
        }
    ]
})
