// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import {Button,Link,Row,Col} from 'element-ui'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import 'element-ui/lib/theme-chalk/index.css';

// Vue.component(Button.name,Button);
// Vue.component(Link.name,Link)
// Vue.component(Row.name,Row)
// Vue.component(Col.name,Col)
Vue.use(ElementUI);
Vue.config.productionTip=false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
