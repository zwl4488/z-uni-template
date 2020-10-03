import { UserInfo } from './user-info';

export enum StorageType {
  UserInfo = 'USER_LOGIN_INFO'
}

export type StorageDataType = UserInfo | any;

export function setStoreSync(key: StorageType, data: StorageDataType): void {
  wx.setStorageSync(key, data);
}
