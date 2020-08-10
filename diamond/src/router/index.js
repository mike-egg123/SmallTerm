import Vue from 'vue'
import VueRouter from 'vue-router'
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
    ]
})