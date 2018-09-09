import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    add (state) {
      state.count += 1
    },
    reduce (state, count) {
      state.count -= count
    }
  },
  getters: {
    doubleCount: (state) => {
      return state.count + ' ' + state.count
    }
  }
})
