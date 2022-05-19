import { createStore } from 'vuex'
import lottery from './module/lottery'

export default createStore({
  state: {
    isLoading: true
  },
  getters: {
  },
  mutations: {
    setLoading(state, b){
      state.isLoading = b
    }
  },
  actions: {
  },
  modules: {
    lottery
  }
})
