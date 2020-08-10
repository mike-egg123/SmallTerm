import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import {Button} from 'element-ui'
import {Link} from 'element-ui'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.component(Button.name,Button);
Vue.component(Link.name,Link)

new Vue({
  el: '#app',
  render: h => h(App),
  router
}).$mount('#app')
