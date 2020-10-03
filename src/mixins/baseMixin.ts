/**
 * 基础mixin
 * @author michaelZ
 */
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class baseMixin extends Vue {
  // 状态栏高度
  statusBarHeight: string = wx.getSystemInfoSync().statusBarHeight + 'px';

  // 全局分享配置
  onShareAppMessage() {
    return {
      title: 'title',
      path: `/index/index?from=${this.$$store.userInfo.openId}`,
      imageUrl: 'imageUrl'
    };
  }
}
