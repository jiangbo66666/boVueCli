import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    username: localStorage.getItem('username') || ''
  },
  mutations:{
    getname(state,name){
      state.username = name
    }
  }
})