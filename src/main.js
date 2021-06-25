import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import bootstrap from 'bootstrap' // eslint-disable-line

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

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  })
})

// localize('zh_TW', TW);

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})
// ----------------------------------------------------

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then(res => {
      if (res.data.success) {
        // 如果為登入中，就可以進入頁面
        next()
      } else {
        // 如果尚未登入，就轉跳到登入頁面
        next({ path: '/login' })
      }
    })
  } else {
    // 如果要前往的頁面不需要驗證，就直接前往
    next()
  }
})
