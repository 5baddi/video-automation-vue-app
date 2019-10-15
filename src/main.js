require('bootstrap/dist/css/bootstrap.min.css')

import Vue from 'vue'
import Bootstrap from 'bootstrap'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#va-app')
