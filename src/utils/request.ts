/**
 * 基于Promise封装的网络请求库
 */
import RequestSuccessCallbackResult = WechatMiniprogram.RequestSuccessCallbackResult;

export enum Method {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT'
}

/*
 * 默认header
 */
const defaultHeader = {};

/**
 * 接口请求基类方法 返回值带http状态码
 * @param method 请求方法 required
 * @param url 请求路径 required
 * @param data 请求参数
 * @param header 请求头
 * @returns {Promise}
 */
export function requestWithStatus(method: Method, url: string, data?: Record<string, any>, header = defaultHeader): Promise<RequestSuccessCallbackResult> {
  return new Promise((resolve, reject) => {
    const requestTask = wx.request({
      url,
      method,
      data,
      header,
      success: (res) => {
        resolve(res);
      },
      fail: (error) => {
        reject(error);
      }
    });
  });
}

export function request<T>(method: Method, url: string, data?: Record<string, any>, header?: Record<string, any>): Promise<T> {
  return requestWithStatus(method, url, data, header).then((res) => {
    if (Math.floor(res.statusCode / 100) === 2) {
      return res.data as T;
    }
    throw new Error(JSON.stringify(res));
  });
}

export const get = (url: string, data?: Record<string, any>, headers?: Record<string, string>) => request(Method.Get, url, data, headers);

export const post = (url: string, data: Record<string, any>, headers?: Record<string, string>) => request(Method.Post, url, data, headers);

export const put = (url: string, data?: Record<string, any>, headers?: Record<string, string>) => request(Method.Put, url, data, headers);