
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from 'vant'
import 'vant/lib/index.less'
import 'amfe-flexible'
import '@/styles/icon.less'
import '@/styles/theme.less'
import '@/styles/reset.less'
import '@/styles/index.less'
import MyIcon from '@/components/MyIcon.vue'
Vue.config.productionTip = false
Vue.use(vant)
// 全局组件
Vue.component('MyIcon', MyIcon)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
