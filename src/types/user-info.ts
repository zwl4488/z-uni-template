export interface UserInfo {
  appId: string;
  cookie: string;
  openId: number;
  user: {
    id: number;
    phone: string;
    trial: boolean; // 是否游客
  },
  profile: {
    avatarUrl: string;
    gender: Generator;
    id: number;
    nickname: string;
  }
  wxSessionCookie: string;
}
