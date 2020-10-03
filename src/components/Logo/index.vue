<template>
  <view class="logo-wrap">
    <image
      src="../../static/logo.png"
      mode="widthFix"
    />
  </view>
</template>

<script lang="ts">
/**
 * @file logo组件
 * @author michaelZ
 */
import { Vue, Component, Prop, Watch, Mixins } from 'vue-property-decorator';

@Component({})
export default class extends Vue {

};
</script>

<style lang="stylus" scoped>
.logo-wrap
  size(200rpx, 200rpx)
  margin 100rpx auto

  image
    size(100%, 100%)
</style>
