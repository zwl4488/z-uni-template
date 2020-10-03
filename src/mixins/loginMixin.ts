/**
 * 登陆相关mixin
 * @author michaelZ
 */
import { Component, Vue } from 'vue-property-decorator';

import { UserInfo, StorageType } from "@/types";
import { login } from "@/api/login";

@Component
export default class loginMixin extends Vue {
  get isLogin() {
    return this.$$store.isLogin;
  }

  // 自动登录流程
  autoLogin(): Promise<void> {
    console.log('开始自动登录...');

    const userInfo = wx.getStorageSync(StorageType.UserInfo) as UserInfo;

    // 未登录过
    if (!userInfo) {
      return login()
        .then((res: UserInfo) => {
          console.log("首屏自动登录", res);

          this.$$mutations.updateLoginStatus(true);
        })
        .catch(() => {
          console.log("自动登录错误");

          this.$$mutations.updateLoginStatus(false);
        });
    } else {
      this.$$mutations.updateLoginStatus(true);

      return Promise.resolve();
    }
  }

  getLoginStatus() {
    console.log(this.isLogin);
  }
}
