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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
