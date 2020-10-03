export default function toast(
  param: {
    title: string,
    icon?: 'none' | 'success' | 'loading' | undefined,
    duration?: number
  }) {
    wx.showToast({
      title: param.title,
      icon: param.icon || 'none',
      duration: param.duration || 2000
  });
}