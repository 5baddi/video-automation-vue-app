require('bootstrap/dist/css/bootstrap.min.css')

import Vue from 'vue'
import Bootstrap from 'bootstrap'
import Axios from 'axios'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$http = Axios

window.$ = require('jquery')
window.jQuery = require('jquery')

new Vue({
  render: h => h(App),
}).$mount('#va-app')