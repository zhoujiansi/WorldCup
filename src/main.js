// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import 'whatwg-fetch'
import { Swipe, SwipeItem } from 'vue-swipe'  // 加这里

Vue.config.productionTip = false

Vue.component('swipe', Swipe)  // 加这里
Vue.component('swipe-item', SwipeItem) // 加这里
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
