import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import Login from './views/Login.vue'
import home from './views/home.vue'

Vue.use(ElementUI)

Vue.use(VueRouter)

var router = new VueRouter({
  routes:[
    {path:'/Login',component:Login},
    {name:home,path:'/',component:home}
  ]
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
