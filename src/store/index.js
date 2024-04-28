import { loginApi } from '@/api/login'
import { getToken, setToken } from '@/utils/auth'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: getToken() || ''
  },
  mutations: {
    setToken(state) {
      setToken(state.token)
    }
  },
  getters: {

  },
  actions: {
    async login({ commit, state }, userInfo) {
      // const obj = { name: '123', age: 18 }
      // const { name, age } = obj
      const result = await loginApi(userInfo)
      console.log(result);
      state.token = result.data.data.token
      commit('setToken')
    }
  }
})

export default store