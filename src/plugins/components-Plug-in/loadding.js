import MyLoading from '../../common/loadding.vue';
import Vue from 'vue';

// let MessageConstructor = Vue.extend(require('../../common/loadding.vue'));
let MessageConstructor = Vue.extend(MyLoading);
let instance;
const loadding=function(options) {
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }
  instance = new MessageConstructor({
    data: options
  });
  instance.vm = instance.$mount();
  instance.vm.fullscreenLoading = true;
  document.body.appendChild(instance.vm.$el);
  console.log(instance)
  return instance.vm;
};

export default loadding;
