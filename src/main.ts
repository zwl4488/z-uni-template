import Vue from 'vue';
import App from './App.vue';
import './store';

import toast from './utils/toast';

// Promise.finally polyfill
!Promise.prototype.finally && (Promise.prototype.finally = function (callback: (value?: any) => any) {
  const P: any = this.constructor;

  return this.then(
    value => P.resolve(callback(value)),
    err => P.resolve(callback(err)),
  );
});

Vue.config.productionTip = false;

// 定义全局挂载在Vue上的方法
declare module 'vue/types/vue' {
  interface Vue {
      $toast: any,
      $$store: any,
      $$mutations: any
  }
}

Vue.prototype.$toast = toast;

new App().$mount();
