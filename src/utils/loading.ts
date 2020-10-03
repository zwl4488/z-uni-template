// 设置状态栏的loading和loading toast
export function startLoading(showLoading: boolean) {
  wx.showNavigationBarLoading({});
  showLoading && wx.showLoading({ title: '加载中...', mask: true });
}

export function endLoading(showLoading: boolean) {
  wx.hideNavigationBarLoading({});
  showLoading && wx.hideLoading({});
}
