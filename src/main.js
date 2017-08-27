import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import 'common/stylus/index.styl'
import fastclick from 'fastclick'
import router from './router'
fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
   el: '#app',
   router,
   template: '<app/>',
   components: {
      App
   }
})
