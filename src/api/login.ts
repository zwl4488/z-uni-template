import { config } from '@/config';
import { ErrorUserNotLogin, setStoreSync, StorageType, UserInfo } from '@/types';
import { wxRequest } from '@/utils/wx-request';

const baseUrl = `${config.host}`;

// 用户登录凭证（有效期五分钟），使用 code 换取 openid 和 session_key 等信息
export function getWxCode(): Promise<string> {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        console.log('wechat login', res);
        resolve(res.code);
      },
      fail: reject,
    });
  });
}

/**
 * 登录
 * @returns
 */
export function login(isReLogin = false): Promise<UserInfo> {
  const UserInfo = wx.getStorageSync(StorageType.UserInfo) as UserInfo;

  // 本地有用户信息 && 非重登陆
  if (UserInfo && !isReLogin) {
    return Promise.resolve(UserInfo);
  } else {
    // 拿code后获取用户信息
    return getWxCode()
      .then(code => wxRequest.post<Partial<UserInfo>>(
        `${baseUrl}/your/api/login?appId=${config.appId}&code=${code}`
      ))
      .then(UserInfo => {
        // 有效用户
        if (UserInfo.user && UserInfo.user.id) {
          setStoreSync(StorageType.UserInfo, UserInfo as UserInfo);
          return Promise.resolve(UserInfo as UserInfo);
        }
        return Promise.reject(ErrorUserNotLogin);
      });
  }
}
