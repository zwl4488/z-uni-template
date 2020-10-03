<template>
  <view class="index-wrap">
    <view class="main-content">
      <logo />
      <h3>基于uni-app的微信小程序开发模板</h3>
      <ol>
        <li>基于vue + ts</li>
        <li>基础的base、login等mixin</li>
        <li>轻型、双向绑定特性的数据中心</li>
        <li>网络请求模块</li>
        <li>基础登陆逻辑</li>
      </ol>
    </view>
  </view>
</template>

<script lang="ts">
/**
 * 首页
 * @author michealZ
 */
import { Component, Mixins } from 'vue-property-decorator';

import { login, getWxCode } from '@/api/login';
import { UserInfo, StorageType } from '@/types';
import { baseMixin, loginMixin } from '@/mixins';

import Logo from '@/components/Logo/index.vue';

// 不能这么引入组件😑
// 编译出来的json文件路径会按照声明的路径来，就找不到了
// import { Logo } from '@/components';

@Component({
  components: {
    Logo
  }
})
export default class extends Mixins(baseMixin, loginMixin) {
  private UserInfo = {} as UserInfo;

  async onLoad(param: any | {}) {
    console.log('index page onload, param:', param);
  }

  private async mounted() {
    console.log('index mounted');

    await this.autoLogin();
  }
};
</script>

<style lang='stylus' scoped>
.main-content
  width 100%
  padding 0 30rpx 30rpx
  box-sizing border-box
  line-height 2

  ._h3
    font-size 32rpx
    font-weight bold
</style>
