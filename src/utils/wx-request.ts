import { StorageType, UserInfo } from '@/types';

import { login } from '@/api/login';
import { endLoading, startLoading } from './loading';
import { Method, request as _request } from './request';

/**
 * 自动携带cookie的request
 * @param url
 * @param method
 * @param data
 * @param showLoading
 * @param header
 * @returns {Promise<any>}
 */
function loadingRequest<T>(method: Method, url: string, data?: Record<string, any>, { showLoading = false, ...header } = {}): Promise<T> {
  return new Promise((resolve, reject) => {
    startLoading(showLoading);

    const { cookie } = (wx.getStorageSync(StorageType.UserInfo) as UserInfo) || { cookie: undefined };

    console.log('request headers:', url, cookie ? { cookie, ...header } : header);

    _request<T>(method, url, data, cookie ? { cookie, ...header } : header)
      .then(resolve)
      .catch(reject)
      .finally(() => {
        endLoading(showLoading);
      });
  });
}

/**
 * 登陆状态失效后，重新登陆再调用
 * @param currentRequest
 * @returns {Promise<any>}
 */
export function loginRetryRequest<T>(currentRequest: () => Promise<T>): Promise<T> {
  return new Promise<T>(((resolve, reject) => {
    currentRequest().then(resolve).catch((err) => {
      if(JSON.parse(err.message).status === 403) {
        login().then(currentRequest).then(resolve).catch(reject);
      } else {
        reject(err);
      }
    });
  }));
}

export const wxRequest = {
  request: loadingRequest,
  get<T>(url: string, data?: Record<string, any>, headers?: Record<string, any>) {
    return loadingRequest<T>(Method.Get, url, data, headers);
  },
  post<T>(url: string, data?: Record<string, any>, headers?: Record<string, any>) {
    return loadingRequest<T>(Method.Post, url, data, headers);
  },
  put<T>(url: string, data?: Record<string, any>, headers?: Record<string, any>) {
    return loadingRequest<T>(Method.Put, url, data, headers);
  }
}
