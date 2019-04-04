<template>
  <div>
    <div :class="['menu-group', showMenu ? 'menu-group--active' : '']">
      <span class="iconfont icon-up" @click="scrollToTop"></span>
      <span class="iconfont icon-down" @click="scrollToBottom"></span>
      <span class="iconfont icon-sidebar" v-if="showSidebar" @click.stop="showTab"></span>
      <span class="iconfont icon-toc" v-if="false" @click=""></span>
    </div>
    <div class="control" @click.stop='showMenu = !showMenu'>
      <svg class="control-svg">
        <defs>
          <filter id="dp">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>
        <circle filter="url(#dp)" fill="rgba(0,0,0,.3)" cx="50%" cy="52%" r="44%"></circle>
        <circle :class="['control-cover']" cx="50%" cy="50%" r="44%"></circle>
        <circle class="control-stroke theme-stroke" :stroke-dasharray="3.1415926 * (progress || 0) + '% 314.15926%'" cx="50%" cy="50%"
                r="48%"></circle>
        <text class="control-progress" v-if="progress" x="50%" y="0" dy="50%">{{progress || ''}}<tspan dx="1">%</tspan></text>
        <g class="control-dot" v-if="!progress">
          <!-- total: .4rem * 2rem -->
          <circle :cx="showMenu ? '-11.2px' : 0" :cy="showMenu ? 0 : '-11.2px'" r="2.8px"></circle>
          <circle r="2.8px"></circle>
          <circle :cx="showMenu ? '11.2px' : 0" :cy="showMenu ? 0 : '11.2px'" r="2.8px"></circle>
        </g>
      </svg>
    </div>
  </div>
</template>
<script>

import { scrollToTop, scrollToBottom, __, easings } from "../utils/scroll";
let BezierEasing = require('bezier-easing');

export default {
  name: 'fn-menuGroup',
  data () {
    return {
      progress: '',
      showMenu: false,
      showSidebar: false
    }
  },
  computed: {
    theme() {
      return this.$store.state.options.theme
    },
  },
  methods: {
    showTab() {
      this.$store.commit('options/SET_SIDE_BAR');
    },
    scrollToTop() {
      this.scroll(1);
    },
    scrollToBottom() {
      this.scroll(2);
    },
    scroll(type = 1) {
      let duration = 500;
      let options = { offset: 0 };
      options.easing = easings['ease'];
      let page = __.$('html, body');
      let events = [
        'scroll',
        'mousedown',
        'wheel',
        'DOMMouseScroll',
        'mousewheel',
        'keyup',
        'touchmove'
      ];
      let abort = false;
      let abortFn = function () {
        abort = true
      };
      __.on(page, events, abortFn);
  
      let diff;
      let initialY = document.getElementsByClassName('fe-container__article-list')[0].scrollHeight;
      if(type === 1) {
        diff = -initialY;
      } else {
        diff = initialY;
      }
      
      let easing = BezierEasing.apply(BezierEasing, options.easing);
      let start;
      let done = function () {
        __.off(page, events, abortFn);
        if (abort && options.onCancel) options.onCancel();
        if (!abort && options.onDone) options.onDone()
      };
      if (!diff) return;
      window.requestAnimationFrame(function step (timestamp) {
        if (abort) return done();
        if (!start) start = timestamp;
        let time = timestamp - start;
        let progress = Math.min(time / duration, 1);
        progress = easing(progress);
        if(type === 1) {
          document.getElementsByClassName('fe-container__feed')[0].scrollTo(0, initialY + diff * progress);
        } else {
          // self.progress = progress.toFixed(2) * 100;
          document.getElementsByClassName('fe-container__feed')[0].scrollTo(0, diff * progress);
        }
        if (time < duration) {
          window.requestAnimationFrame(step)
        } else {
          done()
        }
      })
    },
    
    toggle() {
      this.showMenu = !this.showMenu;
    },
  
    open() {
      this.showMenu = true;
    },
  
    close() {
      this.showMenu = false;
    },
  },
  // 滚动条在Y轴上的滚动距离
  getScrollTop () {
    let scrollTop = 0;
    let bodyScrollTop = 0;
    let documentScrollTop = 0;
    if (document.body) {
      bodyScrollTop = document.body.scrollTop
    }
    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop
  },
  mounted () {
    this.showSidebar = !(window.innerWidth > 975);
    window.onresize = () => {
      this.showSidebar = !(window.innerWidth > 975);
      if(window.innerWidth < 975) {
        this.$store.commit('options/SET_SIDE_BAR', false);
      }
    };
    window.onscroll = () => {
    
    }
  }
}
</script>

<style lang="less" scoped>
  
  @fab-offset: 140%;
  @fab-size: 4rem;
  @fab-sub-size: 2.8rem;
  @color-white: #fff;
  @font-label: 'PingFang SC', 'Microsoft JhengHei', 'Microsoft YaHei', sans-serif;
  
  .sub-transform(@deg, @level) {
    @v: @level * -@fab-offset;
    transform: translate3d(@v * cos(@deg), @v * sin(@deg), 0);
  }
  
  .fab {
    position: fixed;
    right: 1rem;
    bottom: 3.5rem - @fab-size / 2;
    z-index: 1;
    color: @color-white;
    text-align: center;
  }
  // svg
  .control-svg {
    z-index: -1;
    display: block;
    width: @fab-size;
    height: @fab-size;
  }
  .control {
    width: @fab-size;
    height: @fab-size;
    cursor: pointer;
  }
  // g
  .control-dot {
    transform: translate3d(@fab-size / 2, @fab-size / 2, 0);
    circle {
      transition: all .15s cubic-bezier(0, 0, .382, 1.618);
    
      fill: @color-white;
    }
  }
  // text
  .control-progress {
    font-size: 1.2rem;
    font-family: @font-label;
    line-height: 1;
    transform: translateY(.382em);
    
    fill: @color-white;
    text-anchor: middle;
    tspan {
      font-size: .75rem;
      font-family: inherit;
    }
  }
  // circle
  .control-stroke {
    opacity: .9;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    
    stroke-width: 1px;
    fill: none;
  }
  // circle
  .control-cover {
    opacity: .8;
    fill: var(--theme-color);
    transition: .4s ease-in fill;
  }
  .menu-group span {
    position: absolute;
    z-index: -1;
    width: @fab-sub-size;
    height: @fab-sub-size;
    border-radius: 50%;
    background-color: rgba(0,0,0,.8);
    box-shadow: 0 2px 4px 1px rgba(0, 0, 0, .2);
    font-size: 1.5rem;
    line-height: @fab-sub-size;
    opacity: 0;
    cursor: pointer;
    transition: .4s cubic-bezier(0, 0, .382, 1.618);
    transition-property: transform, opacity;
    
    &::before {
      font-size: inherit;
    }
    &:nth-child(3n-2) {
      top: 0;
      right: 0;
    }
    &:nth-child(3n-1) {
      top: 0;
      left: 0;
    }
    &:nth-child(3n) {
      bottom: 0;
      left: 0;
    }
  }
  .menu-group--active span {
    opacity: 1;
    &:nth-child(1) {
      .sub-transform(90deg, 1);
    }
    &:nth-child(2) {
      .sub-transform(45deg, 1);
    }
    &:nth-child(3) {
      .sub-transform(0, 1);
    }
    &:nth-child(4) {
      .sub-transform(90deg, 2);
    }
  }
</style>
