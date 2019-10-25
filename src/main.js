require('bootstrap/dist/css/bootstrap.min.css')

import Vue from 'vue'
import Bootstrap from 'bootstrap'
import Axios from 'axios'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false
Vue.prototype.$http = Axios

window.$ = require('jquery')
window.jQuery = require('jquery')

library.add(faSpinner)
Vue.component('font-awesome-icon', FontAwesomeIcon)


new Vue({
  render: h => h(App),
}).$mount('#va-app')