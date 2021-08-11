import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'

import './bus'
import Currency from './filters/Currency'
import TimeChange from './filters/TimeChange'

// ----------------------------------------------------
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  configure
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/zh_TW.json'

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  })
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true

Vue.component('Loading', Loading)
Vue.filter('Currency', Currency)
Vue.filter('TimeChange', TimeChange)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// ----------------------------------------------------

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then(res => {
      if (res.data.success) {
        next()
      } else {
        next({ path: '/login' })
      }
    })
  } else {
    next()
  }
})
