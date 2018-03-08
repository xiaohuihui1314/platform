// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import fetch from './plugins/fetch-Plug-in';
import jsonp from './plugins/jsonp-Plug-in';
import method from './plugins/method-Plug-in';
// 视频播放器
import VueVideoPlayer from 'vue-video-player';
// VueVideoPlayer.config({
//   youtube: true,
//   switcher: true,
//   hls: true
// })
Vue.use(fetch);
Vue.use(jsonp);
Vue.use(method);
Vue.use(iView);
Vue.use(VueVideoPlayer);
Vue.config.productionTip = false;
//全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
Vue.filter('time', function(date) {
  console.log(1)
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  let minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  let s = date.getSeconds();
  s = s < 10 ? ('0' + s) : s;
  return y + '-' + m + '-' + d + '   ' + h + '：' + minute+'：'+s;
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
