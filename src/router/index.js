import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: function (resolve) {
        require(['components/login'], resolve);
      }
    },
    {
      path: '/home',
      component: function (resolve) {
        require(['components/home'], resolve);
      },
      children: [
        // 个人中心
        {
          path: '/',
          component: function (resolve) {
            require(['components/home/homePage'], resolve);
          }
        }, {
          path: '/users',
          name: '用户详情',
          component: function (resolve) {
            require(['components/user/userDetails'], resolve);
          }
        }, {
          path: '/collection',
          name: '我的收藏',
          component: function (resolve) {
            require(['components/user/collection'], resolve);
          }
        }, {
          path: '/messageBoard',
          name: '留言板',
          component: function (resolve) {
            require(['components/user/messageBoard'], resolve);
          }
        }, {
          path: '/theme',
          name: '个人主题',
          component: function (resolve) {
            require(['components/user/theme'], resolve);
          }
        }, {
          path: '/liveTelecast',
          name: '直播',
          component: function (resolve) {
            require(['components/user/liveTelecast'], resolve);
          }
        }, {
          path: '/friends',
          name: '朋友圈',
          component: function (resolve) {
            require(['components/user/friends'], resolve);
          }
        },
        // CMS
        {
          path: '/adPosition',
          name: '广告位管理',
          component: function (resolve) {
            require(['components/cms/adPosition'], resolve);
          }
        }, {
          path: '/advert',
          name: '广告管理',
          component: function (resolve) {
            require(['components/cms/advert'], resolve);
          }
        }, {
          path: '/menu',
          name: '导航菜单',
          component: function (resolve) {
            require(['components/cms/menu'], resolve);
          }
        }, {
          path: '/cMenu',
          name: '分类导航菜单',
          component: function (resolve) {
            require(['components/cms/cMenu'], resolve);
          }
        }, {
          path: '/help',
          name: '帮助中心',
          component: function (resolve) {
            require(['components/cms/help'], resolve);
          }
        }
      ]
    }
  ]
})
