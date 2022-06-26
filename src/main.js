
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import '@/styles/icon.less'
// import 'postcss-pxtorem'
Vue.config.productionTip = false
Vue.use(vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
