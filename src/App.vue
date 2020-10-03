<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  onLaunch() {
    console.log('App Launch');

    console.log(wx.getSystemInfoSync());
  },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  }
});
</script>
