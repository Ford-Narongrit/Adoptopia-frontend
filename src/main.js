import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import css
import './assets/css/tailwind.css'

//import FontAwesomeIcon
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//import sweetalert2
import 'sweetalert2/dist/sweetalert2.min.css';

//import Axios
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.baseURL = process.env.VUE_APP_APIURL || 'http://127.0.0.1:8000/api'
Vue.use(VueAxios, axios)

library.add(fas)
library.add(fab)
library.add(far)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
