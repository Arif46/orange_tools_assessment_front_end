import Vue from 'vue'
import App from './App.vue'
import './utils/fliter'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins'
import i18n from './i18n'

Vue.config.productionTip = false

const vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

window.vm = vm
