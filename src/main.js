import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store'
import 'common/stylus/index.styl'
import fastclick from 'fastclick'
import router from './router'
import lazyloader from 'vue-lazyload'
fastclick.attach(document.body)
Vue.use(lazyloader, {
   loading: require('common/image/default.png')
})
/* eslint-disable no-new */
new Vue({
   el: '#app',
   router,
   store,
   template: '<app/>',
   components: {
      App
   }
})
