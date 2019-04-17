<template>
  <div class="waifu">
      <div class="waifu-tips"></div>
      <canvas id="live2d" class="live2d"></canvas>
      <div class="waifu-tool">
          <span class="fui-home"></span>
          <span class="fui-chat"></span>
          <span class="fui-eye"></span>
          <span class="fui-user"></span>
          <span class="fui-photo"></span>
          <span class="fui-info-circle"></span>
          <span class="fui-cross"></span>
      </div>
  </div>
</template>
<script>

  import {FN_MESSAGE} from '~/utils/constant'
  // import * as initModel from '~/plugins/live2d/waifu-tips'

  export default {
    name: 'fn-live2d',
    data() {
      return {
      }
    },
    methods: {
      handleMove() {

      }
    },
    mounted() {
      /* 可直接修改部分参数 */
      live2d_settings['waifuFontSize'] = '1rem';       // 提示框字体
      live2d_settings['waifuToolFont'] = '1rem';       // 工具栏字体
      /* 在 initModel 前添加 */
      initModel("/js/live2d/waifu-tips.json")
    }
  }
</script>

<style lang="less" scoped>


</style>
