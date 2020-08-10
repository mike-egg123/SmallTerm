// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button} from 'element-ui'
import {Link} from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';

Vue.component(Button.name,Button);
Vue.component(Link.name,Link)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
