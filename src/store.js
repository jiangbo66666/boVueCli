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


function coslog(a=0){
  if(a==1){
    axios.interceptors.response.use(function (response) {
      console.log(response)
      return response;
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    });
  }
}

coslog(1)

