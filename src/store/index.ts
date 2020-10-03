/**
 * @file 简易vuex，用来同步组件、页面之间通用数据的通信
 * @author michaelZ
 */
import Vue from 'vue';

import { UserInfo } from '@/types';

// 全局数据中心，利用Vue.observable使其具有响应式特性，触发数据的流动
export const store = Vue.observable({
  isLogin: false,
  userInfo: {} as UserInfo
});

// 更改store里的数据，且只能从这里改
export const mutations = {
  // 更新登录状态
  updateLoginStatus(status: boolean) {
    store.isLogin = status;
  },
  // 更新用户信息
  updateUserInfo(userInfo: UserInfo) {
    store.userInfo = userInfo;
  }
};

Vue.prototype.$$store = store;
Vue.prototype.$$mutations = mutations;
