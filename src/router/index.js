import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: require("@/components/login")
    }, {
      path: '/home',
      name: '主页',
      component: require("@/components/home"),
      children: [
        // 个人中心
        {
          path: '/',
          component: require("@/components/home/homePage"),
        }, {
          path: '/users',
          name: '用户详情',
          component: require("@/components/user/userDetails"),
        }, {
          path: '/collection',
          name: '我的收藏',
          component: require("@/components/user/collection"),
        }, {
          path: '/messageBoard',
          name: '留言板',
          component: require("@/components/user/messageBoard"),
        }, {
          path: '/theme',
          name: '个人主题',
          component: require("@/components/user/theme"),
        }, {
          path: '/friends',
          name: '朋友圈',
          component: require("@/components/user/friends"),
        },
        // CMS
       {
          path: '/adPosition',
          name: '广告位管理',
          component: require("@/components/cms/adPosition"),
        }, {
          path: '/advert',
          name: '广告管理',
          component: require("@/components/cms/advert"),
        }, {
          path: '/menu',
          name: '导航菜单',
          component: require("@/components/cms/menu"),
        }, {
          path: '/cMenu',
          name: '分类导航菜单',
          component: require("@/components/cms/cMenu"),
        }, {
          path: '/help',
          name: '帮助中心',
          component: require("@/components/cms/help"),
        }
      ]
    }
  ]
})
