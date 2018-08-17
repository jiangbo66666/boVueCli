import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Login from './views/Login.vue'
import home from './views/home.vue'
import wel from './views/welcome/welcome.vue'
import './styles/index.scss'

Vue.use(ElementUI)

Vue.use(VueRouter)

var router = new VueRouter({
  routes:[
    {path:'/Login',component:Login},
    {name:home,path:'/',component:home,redirect:'/wel',children:[
      {path:'wel',component:wel}
    ]}
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('mytoken')
  if(token){
    if(to.path == '/login'){
      next({path:'/'})
    }else{
      next()
    }
  }else{
    // next({path:'/login'})
    if(to.path!=='/login'){
    next({path:'/login'})
    }else{
      next()
    }
   
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
