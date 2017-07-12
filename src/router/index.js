import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require("@/components/home")
    },
    {
      path: '/login',
      name: 'login',
      component: require("@/components/login")
    }
  ]
})
