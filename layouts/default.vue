<template>
  <div :class="['fe-container', {'fe-container--open': showSidebar}]">
    <!--<my-background></my-background>-->
    <!--<my-header></my-header>-->
    <nav class="fe-sidebar">
      <div class="fe-sidebar__con">
        <section>
          <header class="fe-sidebar__header">
            <div class="fe-sidebar__avatar">
              <nuxt-link to="/" class="fe-sidebar__link">
                <img src="/images/avatar/555.jpg"
                     class="fe-sidebar__avatar-img fe-sidebar__avatar-img--black"  alt="">
              </nuxt-link>
            </div>
            <h1 class="fe-sidebar__name">
              <a href="" class="fe-sidebar__name-link">
                小强哥
              </a>
            </h1>
            <p class="fe-sidebar__comments">
              The whole problem with the world is that fools and fanatics are always so certain of themselves, but wiser people so full of doubts.
            </p>
          </header>
          <div class="fe-sidebar__count">
            <nuxt-link to="/category" class="fe-sidebar__item">
              <span>4</span>
              <span>cate</span>
            </nuxt-link>
            <nuxt-link to="/tag" class="fe-sidebar__item">
              <span>{{tagsLength}}</span>
              <span>tags</span>
            </nuxt-link>
            <a href="https://gitee.com/zhongqiang1839/nuxt-blog" target="_blank" class="fe-sidebar__item fe-sidebar__gitee">
              <span>2</span>
              <!--<CountTo :start-val="0" :end-val="233" :duration='2000' separator="," class="count"></CountTo>-->
              <span>Star</span>
            </a>
          </div>
          <nav class="fe-sidebar__nav">
            <nuxt-link to="/" class="fe-sidebar__nav-item fe-sidebar__index">
              首页
            </nuxt-link>
            <nuxt-link to="/about" class="fe-sidebar__nav-item fe-sidebar__about">
              关于
            </nuxt-link>
          </nav>
          <div class="fe-sidebar__theme">
            <div class="fe-sidebar__item-list">
              <a style="background:#ff76ab linear-gradient(to bottom,#ff76ab 0%,#ff5640 100%);width: 6rem;" title="#f44336" data-a="#f44336" data-b="#f44336" @click="changeTheme(19)"></a>
              <a style="background:#607d8b linear-gradient(to bottom,#607d8b 0%,#26323b 100%);width: 6rem;" title="#f44336" data-a="#f44336" data-b="#f44336" @click="changeTheme(0)"></a>
              <a style="background:#f44336" title="#f44336" data-a="#f44336" data-b="#f44336" @click="changeTheme(1)"></a>
              <a style="background:#e91e63" title="#e91e63" data-a="#e91e63" data-b="#e91e63" @click="changeTheme(2)"></a>
              <a style="background:#9c27b0" title="#9c27b0" data-a="#9c27b0" data-b="#9c27b0" @click="changeTheme(3)"></a>
              <a style="background:#673ab7" title="#673ab7" data-a="#673ab7" data-b="#673ab7" @click="changeTheme(4)"></a>
              <a style="background:#3f51b5" title="#3f51b5" data-a="#3f51b5" data-b="#3f51b5" @click="changeTheme(5)"></a>
              <a style="background:#2196f3" title="#2196f3" data-a="#2196f3" data-b="#2196f3" @click="changeTheme(6)"></a>
              <a style="background:#03a9f4" title="#03a9f4" data-a="#03a9f4" data-b="#03a9f4" @click="changeTheme(7)"></a>
              <a style="background:#00bcd4" title="#00bcd4" data-a="#00bcd4" data-b="#00bcd4" @click="changeTheme(8)"></a>
              <a style="background:#009688" title="#009688" data-a="#009688" data-b="#009688" @click="changeTheme(9)"></a>
              <a style="background:#4caf50" title="#4caf50" data-a="#4caf50" data-b="#4caf50" @click="changeTheme(10)"></a>
              <a style="background:#8bc34a" title="#8bc34a" data-a="#8bc34a" data-b="#8bc34a" @click="changeTheme(11)"></a>
              <a style="background:#ffc107" title="#ffc107" data-a="#ffc107" data-b="#ffc107" @click="changeTheme(12)"></a>
              <a style="background:#ff9800" title="#ff9800" data-a="#ff9800" data-b="#ff9800" @click="changeTheme(13)"></a>
              <a style="background:#ff5722" title="#ff5722" data-a="#ff5722" data-b="#ff5722" @click="changeTheme(14)"></a>
              <a style="background:#795548" title="#795548" data-a="#795548" data-b="#795548" @click="changeTheme(15)"></a>
              <a style="background:#9e9e9e" title="#9e9e9e" data-a="#9e9e9e" data-b="#9e9e9e" @click="changeTheme(16)"></a>
              <a style="background:#607d8b" title="#607d8b" data-a="#607d8b" data-b="#607d8b" @click="changeTheme(17)"></a>
              <a style="background:#2a2b33" title="#2a2b33" data-a="#2a2b33" data-b="#2a2b33" @click="changeTheme(18)"></a>
            </div>
          </div>
          <!--<my-footer></my-footer>-->
        </section>
        <my-footer></my-footer>
      </div>
    </nav>
    <div class="fe-container__layout">
      <div style="height: 100vh;">
        <div class="fe-container__feed">
          <eevee></eevee>
          <main class="fe-container__article-list">
            <nuxt />
          </main>
          <div class="fe-container__mask" v-if="showSidebar" @click="closeTab"></div>
        </div>
      </div>
      <!--<aside class="welcome__side view">-->
      <!--<my-aside></my-aside>-->
      <!--</aside>-->
    </div>
    <div class="fe-menu-group">
      <my-menu-group></my-menu-group>
    </div>
  </div>
</template>

<script>
  import myHeader from '~/components/header'
  import myFooter from '~/components/footer'
  import myAside from '~/components/myAside'
  import userInfo from '~/components/user'
  import myBackground from '~/components/backgrond'
  import eevee from '~/components/eevee'
  import myMenuGroup from '~/components/menu-group'
  import {simpleWord } from '~/utils/config'

  
  export default {
    data() {
      return {
      
      }
    },
    computed: {
      showSidebar() {
        return this.$store.state.options.showSidebar
      },
      mobileLayout () {
        return this.$store.state.options.mobileLayout
      },
      tagsLength () {
        return this.$store.state.article.tags.length;
      },
      auth () {
        return this.$store.state.options.authenticated.join('');
      },
    },
    methods: {
      closeTab() {
        this.$store.commit('options/SET_SIDE_BAR');
      },
      changeTheme(type = 0) {
        let body = document.getElementsByTagName("body")[0];
        localStorage.setItem('theme', `theme${type}`);
        body.setAttribute("class", `theme${type}`);
        this.$store.commit('options/SET_USER_AUTH', type);
        if(this.auth === simpleWord) {
          this.$router.push("/write")
        }
      }
    },
    mounted() {
      let body = document.getElementsByTagName("body")[0];
      let theme = localStorage.getItem('theme');
      body.setAttribute("class", theme || `theme0`)
    },
    components: {
      myHeader,
      myFooter,
      myAside,
      myBackground,
      userInfo,
      eevee,
      myMenuGroup
    },
  }
</script>

<style lang="less" scoped>
  
  .fe-container {
    position: relative;
    display: block;
    height: 100%;
    transition: .4s ease-in background-color;
    &--open {
      height: 100vh!important;
      .fe-sidebar {
        opacity: 1;
      }
      .fe-container__layout {
        @media (max-width: 359px) {
          transform: translate3d(256px, 0px, 0px) scale3d(.86, .86, 1)!important;
        }
        @media all and (min-width: 359px) and (max-width: 656px){
          transform: translate3d(302px, 0px, 0px) scale3d(.86, .86, 1)!important;
        }
        @media all and (min-width: 656px) and (max-width: 975px){
          transform: translate3d(302px, 0px, 0px)!important;
        }
      }
      .fe-container__feed {
        border-radius: .85rem!important;
        overflow: hidden;
        transition: border-radius .4s;
      }
    }
    
    &__layout {
      transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1);
      padding-left: 20rem;
      height: 100%;
      -webkit-transform-origin: 0 42%;
      -ms-transform-origin: 0 42%;
      transform-origin: 0 42%;
      transition: .4s transform;
    }
    &__feed {
      height: 100%;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
    
    &__mask {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      height: 100%;
    }
    
    &__article-list {
      position: relative;
      display: block;
      overflow: hidden;
      margin: 2rem auto;
      max-width: 660px;
      border-radius: 6px;
    }
    
  }
  
  .fe-menu-group {
    position: fixed;
    right: 1rem;
    bottom: 1.5rem;
    z-index: 1;
    color: #fff;
    text-align: center;
  }
  
  .fe-sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    border-right: 1px solid rgba(0,0,0,.1);
    z-index: 1;
    transition: .4s opacity;
    &__con {
      position: relative;
      overflow-x: visible;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      margin-right: -1rem;
      padding-right: 1rem;
      height: 100%;
      width: 20rem;
      box-sizing: content-box;
    }
    &__header {
      margin: 1rem 1rem .5rem;
      padding: 2.6rem 2rem 1rem;
      border-radius: 6px;
      background-color: #fff;
      text-align: center;
    }
    &__link {
      &:hover {
        .fe-sidebar__avatar-img {
          animation: btnGroups 1s linear;
        }
      }
    }
    &__avatar {
      overflow: hidden;
      &-img {
        display: inline-block;
        padding: 2px;
        width: 8rem;
        height: 8rem;
        border: 1px solid;
        border-radius: 50%;
        &--black {
          border-color: rgba(96,125,139,.4);
        }
      }
    }
    &__name {
      font-size: 1.428rem;
      margin: .5rem 0 0;
      font-weight: normal;
      &-link {
        display: block;
        letter-spacing: 0;
        line-height: 2.4;
        white-space: nowrap;
        transition: color .15s;
      }
    }
    &__comments {
      line-height: 1.5;
      opacity: .618;
      sup {
        color: var(--theme-color)
      }
    }
    
    &__count {
      display: flex;
      overflow: hidden;
      -ms-flex-pack: distribute;
      justify-content: space-around;
      margin: 0 1rem;
      padding: 0 1rem;
      border-radius: 6px;
      background-color: #fff;
      text-align: center;
      white-space: nowrap;
      user-select: none;
    }
    &__nav {
      padding: 2rem 0 4rem;
      user-select: none;
      &-item {
        position: relative;
        display: block;
        padding-left: 3.6rem;
        text-align: left;
        height: 3rem;
        text-transform: capitalize;
        line-height: 3rem;
        &:hover,&:focus,&:active {
          font-size: 1.2rem;
        }
        &:active:before, &:hover:before,&:focus:before{
          transform: scaleX(1);
        }
        &:before {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          opacity: .3;
          background: linear-gradient(90deg,var(--theme-color),transparent);
          content: "";
          transition: transform .4s;
          transform: scaleX(0);
          transform-origin: 0 50%;
        }
      }
    }
    &__item {
      position: relative;
      display: inline-block;
      padding: 1.25rem 0;
      min-width: 24%;
      border-radius: 6px;
      &:after, &:active:before, &:focus:before, &:hover:before, &:before, &:active:after, &:focus:after, &:hover:after, &:active, &:focus, &:hover {
        transform: scaleY(1);
      }
      &:after {
        position: absolute;
        top: .5rem;
        right: 0;
        bottom: .5rem;
        left: 0;
        margin: auto;
        width: 62%;
        height: auto;
        border-radius: 6px;
        background-color: hsla(0,0%,100%,.1)!important;
        content: "";
        -webkit-transition: -webkit-transform .4s;
        transition: -webkit-transform .4s;
        transition: transform .4s;
        transition: transform .4s,-webkit-transform .4s;
        -webkit-transform: scaleY(0);
        -ms-transform: scaleY(0);
        transform: scaleY(0);
        -webkit-transform-origin: bottom center;
        -ms-transform-origin: bottom center;
        transform-origin: bottom center;
      }
      span {
        position: relative;
        display: block;
        padding: 0 .5rem;
        &:first-child {
          padding-bottom: .5rem;
          font-size: 1.4rem;
        }
      }
    }
    &__item-list {
      text-align: center;
      padding: 0 0 3rem;
      width: 12rem;
      margin: auto;
      font-size: 0;
      a {
        width: 2rem;
        height: 1rem;
        display: inline-block;
        transition: transform .15s;
        -webkit-transition: -webkit-transform .15s;
        &:nth-child(1) {
          border-radius: 6px 0 0 0
        }
        &:nth-child(2) {
          border-radius: 0 6px 0 0
        }
        &:nth-child(15) {
          border-radius: 0 0 0 6px
        }
        &:nth-child(20) {
          border-radius: 0 0 6px 0
        }
        &.current, &:hover {
          -webkit-transform: scale(1.1);
          -ms-transform: scale(1.1);
          transform: scale(1.1);
          box-shadow: 1px 1px 2px rgba(0, 0, 0, .3)
        }
      }
    }
    &__theme {
      position: relative;
    }
    
  }
  
  @media (max-width: 975px) {
    .fe-sidebar {
      opacity: 0;
      z-index: 0;
    }
    .fe-container__layout {
      padding: 0;
    }
    
  }
  @media (max-width: 656px) {
    .fe-sidebar {
      border: none;
      color: hsla(0,0%,100%,.8);
      -webkit-box-sizing: content-box;
      box-sizing: content-box;
      &__avatar-img {
        border-color: hsla(0,0%,100%,.618)!important;
      }
      &__con {
        margin-right: 0;
        padding-right: 1.6rem;
      }
      &__comments {
        sup {
          color: #fff;
        }
      }
      &__item {
        &:after {
          top: .5rem;
          right: 0;
          bottom: .5rem;
          left: 0;
          width: auto;
          height: auto;
          border-radius: 6px;
          background-color: hsla(0,0%,100%,.1)!important;
        }
      }
      &__nav {
        &-item {
          &:before {
            opacity: 1;
            background: linear-gradient(90deg, hsla(0,0%,100%,.3),transparent)!important;
          }
        }
      }
      &__header {
        border: none;
        background: none;
      }
      &__count {
        border: none;
        background: none;
      }
    }
    
    .fe-container {
      background: var(--sidebar-bg);
      height: auto;
      &__layout {
        &:before {
          position: absolute;
          top: 1.6rem;
          bottom: 1.6rem;
          left: -1.6rem;
          width: 100%;
          border-radius: .85rem;
          background-color: hsla(0,0%,100%,.2);
          content: "";
        }
      }
      &__feed {
        margin: 0;
        background-color: #f3f6f7;
      }
      &__article-list {
        margin: 0;
        border-radius: 0;
      }
    }
  }
  
  @keyframes btnGroups {
    0% {
      transform: scale(1.2, 0.8);
    }
    1% {
      transform: scale(1.18, 0.82);
    }
    2% {
      transform: scale(1.16, 0.84);
    }
    3% {
      transform: scale(1.13, 0.87);
    }
    4% {
      transform: scale(1.1, 0.9);
    }
    5% {
      transform: scale(1.07, 0.93);
    }
    6% {
      transform: scale(1.04, 0.96);
    }
    7% {
      transform: scale(1.01, 0.99);
    }
    8% {
      transform: scale(0.99, 1.01);
    }
    9% {
      transform: scale(0.97, 1.03);
    }
    10% {
      transform: scale(0.95, 1.05);
    }
    11% {
      transform: scale(0.94, 1.06);
    }
    12% {
      transform: scale(0.93, 1.07);
    }
    13% {
      transform: scale(0.93, 1.07);
    }
    14% {
      transform: scale(0.93, 1.07);
    }
    15% {
      transform: scale(0.93, 1.07);
    }
    16% {
      transform: scale(0.94, 1.06);
    }
    17% {
      transform: scale(0.94, 1.06);
    }
    18% {
      transform: scale(0.95, 1.05);
    }
    19% {
      transform: scale(0.96, 1.04);
    }
    20% {
      transform: scale(0.98, 1.02);
    }
    21% {
      transform: scale(0.99, 1.01);
    }
    22% {
      transform: scale(1, 1);
    }
    23% {
      transform: scale(1, 1);
    }
    24% {
      transform: scale(1.01, 0.99);
    }
    25% {
      transform: scale(1.02, 0.98);
    }
    26% {
      transform: scale(1.02, 0.98);
    }
    27% {
      transform: scale(1.02, 0.98);
    }
    28% {
      transform: scale(1.03, 0.97);
    }
    29% {
      transform: scale(1.03, 0.97);
    }
    30% {
      transform: scale(1.02, 0.98);
    }
    31% {
      transform: scale(1.02, 0.98);
    }
    32% {
      transform: scale(1.02, 0.98);
    }
    33% {
      transform: scale(1.02, 0.98);
    }
    34% {
      transform: scale(1.01, 0.99);
    }
    35% {
      transform: scale(1.01, 0.99);
    }
    36% {
      transform: scale(1.01, 0.99);
    }
    37% {
      transform: scale(1, 1);
    }
    38% {
      transform: scale(1, 1);
    }
    39% {
      transform: scale(1, 1);
    }
    40% {
      transform: scale(0.99, 1.01);
    }
    41% {
      transform: scale(0.99, 1.01);
    }
    42% {
      transform: scale(0.99, 1.01);
    }
    43% {
      transform: scale(0.99, 1.01);
    }
    44% {
      transform: scale(0.99, 1.01);
    }
    45% {
      transform: scale(0.99, 1.01);
    }
    46% {
      transform: scale(0.99, 1.01);
    }
    47% {
      transform: scale(0.99, 1.01);
    }
    48% {
      transform: scale(0.99, 1.01);
    }
    49% {
      transform: scale(1, 1);
    }
  }


</style>
