import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    searchHistory: []
  },
  getters: {
  },
  mutations: {
    // 存储身份标识是同步任务
    getUserToken (state, payload) {
      state.user = payload
      // window.localStorage.setItem('user', JSON.stringify(state.user))
    },
    setSearchHistory (state, payload) {
      let arr = state.searchHistory
      arr.unshift(payload)
      arr = [...new Set(arr)]
      state.searchHistory = arr
    },
    removeHistory (state, index) {
      // console.log(payload)
      // const index = state.searchHistory.indexOf(payload)
      state.searchHistory.splice(index, 1)
    },
    delHistory (state) {
      state.searchHistory = []
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
