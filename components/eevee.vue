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
  // import initModel from '~/plugins/live2d/waifu-tips'

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
      initModel()
    }
  }
</script>

<style lang="less" scoped>

    .waifu {
        position: absolute;
        bottom: 0;
        z-index: 1;
        font-size: 0;
        -webkit-transform: translateY(3px);
        transform: translateY(3px);
    }
    .waifu:hover {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
    .waifu-tips {
        opacity: 0;
        margin: -20px -20px 0 2px;
        padding: 5px 10px;
        border: 1px solid rgba(224, 186, 140, 0.62);
        border-radius: 12px;
        color: var(--theme-color);
        background-color: var(--box-back-color);
        box-shadow: 0 3px 15px 2px rgba(191, 158, 118, 0.2);
        text-overflow: ellipsis;
        overflow: hidden;
        position: absolute;
        animation-delay: 5s;
        animation-duration: 50s;
        animation-iteration-count: infinite;
        animation-name: shake;
        animation-timing-function: ease-in-out;
    }
    .waifu-tool {
        display: none;
        color: #aaa;
        top: 50px;
        right: 10px;
        position: absolute;
    }
    .waifu:hover .waifu-tool {
        display: block;
    }
    .waifu-tool span {
        display: block;
        cursor: pointer;
        color: #5b6c7d;
        transition: 0.2s;
    }
    .waifu-tool span:hover {
        color: #34495e;
    }
    .waifu #live2d {
        position: relative;
    }
    @keyframes shake {
        2% {
            transform: translate(0.5px, -1.5px) rotate(-0.5deg);
        }
        4% {
            transform: translate(0.5px, 1.5px) rotate(1.5deg);
        }
        6% {
            transform: translate(1.5px, 1.5px) rotate(1.5deg);
        }
        8% {
            transform: translate(2.5px, 1.5px) rotate(0.5deg);
        }
        10% {
            transform: translate(0.5px, 2.5px) rotate(0.5deg);
        }
        12% {
            transform: translate(1.5px, 1.5px) rotate(0.5deg);
        }
        14% {
            transform: translate(0.5px, 0.5px) rotate(0.5deg);
        }
        16% {
            transform: translate(-1.5px, -0.5px) rotate(1.5deg);
        }
        18% {
            transform: translate(0.5px, 0.5px) rotate(1.5deg);
        }
        20% {
            transform: translate(2.5px, 2.5px) rotate(1.5deg);
        }
        22% {
            transform: translate(0.5px, -1.5px) rotate(1.5deg);
        }
        24% {
            transform: translate(-1.5px, 1.5px) rotate(-0.5deg);
        }
        26% {
            transform: translate(1.5px, 0.5px) rotate(1.5deg);
        }
        28% {
            transform: translate(-0.5px, -0.5px) rotate(-0.5deg);
        }
        30% {
            transform: translate(1.5px, -0.5px) rotate(-0.5deg);
        }
        32% {
            transform: translate(2.5px, -1.5px) rotate(1.5deg);
        }
        34% {
            transform: translate(2.5px, 2.5px) rotate(-0.5deg);
        }
        36% {
            transform: translate(0.5px, -1.5px) rotate(0.5deg);
        }
        38% {
            transform: translate(2.5px, -0.5px) rotate(-0.5deg);
        }
        40% {
            transform: translate(-0.5px, 2.5px) rotate(0.5deg);
        }
        42% {
            transform: translate(-1.5px, 2.5px) rotate(0.5deg);
        }
        44% {
            transform: translate(-1.5px, 1.5px) rotate(0.5deg);
        }
        46% {
            transform: translate(1.5px, -0.5px) rotate(-0.5deg);
        }
        48% {
            transform: translate(2.5px, -0.5px) rotate(0.5deg);
        }
        50% {
            transform: translate(-1.5px, 1.5px) rotate(0.5deg);
        }
        52% {
            transform: translate(-0.5px, 1.5px) rotate(0.5deg);
        }
        54% {
            transform: translate(-1.5px, 1.5px) rotate(0.5deg);
        }
        56% {
            transform: translate(0.5px, 2.5px) rotate(1.5deg);
        }
        58% {
            transform: translate(2.5px, 2.5px) rotate(0.5deg);
        }
        60% {
            transform: translate(2.5px, -1.5px) rotate(1.5deg);
        }
        62% {
            transform: translate(-1.5px, 0.5px) rotate(1.5deg);
        }
        64% {
            transform: translate(-1.5px, 1.5px) rotate(1.5deg);
        }
        66% {
            transform: translate(0.5px, 2.5px) rotate(1.5deg);
        }
        68% {
            transform: translate(2.5px, -1.5px) rotate(1.5deg);
        }
        70% {
            transform: translate(2.5px, 2.5px) rotate(0.5deg);
        }
        72% {
            transform: translate(-0.5px, -1.5px) rotate(1.5deg);
        }
        74% {
            transform: translate(-1.5px, 2.5px) rotate(1.5deg);
        }
        76% {
            transform: translate(-1.5px, 2.5px) rotate(1.5deg);
        }
        78% {
            transform: translate(-1.5px, 2.5px) rotate(0.5deg);
        }
        80% {
            transform: translate(-1.5px, 0.5px) rotate(-0.5deg);
        }
        82% {
            transform: translate(-1.5px, 0.5px) rotate(-0.5deg);
        }
        84% {
            transform: translate(-0.5px, 0.5px) rotate(1.5deg);
        }
        86% {
            transform: translate(2.5px, 1.5px) rotate(0.5deg);
        }
        88% {
            transform: translate(-1.5px, 0.5px) rotate(1.5deg);
        }
        90% {
            transform: translate(-1.5px, -0.5px) rotate(-0.5deg);
        }
        92% {
            transform: translate(-1.5px, -1.5px) rotate(1.5deg);
        }
        94% {
            transform: translate(0.5px, 0.5px) rotate(-0.5deg);
        }
        96% {
            transform: translate(2.5px, -0.5px) rotate(-0.5deg);
        }
        98% {
            transform: translate(-1.5px, -1.5px) rotate(-0.5deg);
        }
        0%,
        100% {
            transform: translate(0, 0) rotate(0);
        }
    }
</style>
