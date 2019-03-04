<template>
  <header v-fix class="app-header">
    <div class="inner">
      <div class="avator"><img alt src="/images/logo_1538904715568.png" /> <nuxt-link to="/">&nbspJason.me</nuxt-link></div>
      <div class="menu-view">
        <!--<div class="tab-item"><nuxt-link to="/archive">归档</nuxt-link></div>-->
        <!--<div class="tab-item"><nuxt-link to="/about">关于</nuxt-link></div>-->
        <!--<div class="tab-item"><nuxt-link to="/guest">留言墙</nuxt-link></div>-->
        <!--<div class="tab-item"><nuxt-link to="/write">写文章</nuxt-link></div>-->
        <input type="text" placeholder="Search..." v-model="keyword" v-on:keyup.enter="searchByKeyword">
        <div class="search"></div>
      </div>
    </div>
  </header>
</template>

<script>

import _ from '~/utils/underscore'

export default {
  name: 'fn-header',
  data () {
    return {
      keyword: ''
    }
  },

  computed: {
  },

  watch: {
  },

  // methods: {
  //   searchByKeyword() {
  //     this.router.push(`/tag/${this.keyword}\`);
  //   }
  // },
  
  methods: {
    searchByKeyword() {
      this.$router.push(`/keyword/${this.keyword}`);
    }
  },
  
  
  directives: {
    fix: {
      inserted (el) {
        let beforeScrollTop = document.documentElement.scrollTop ||
                window.pageYOffset ||
                window.scrollY ||
                document.body.scrollTop;
        window.addEventListener('scroll', _.throttle(() => {
          let afterScrollTop = document.documentElement.scrollTop ||
                  window.pageYOffset ||
                  window.scrollY ||
                  document.body.scrollTop;
          let delta = afterScrollTop - beforeScrollTop;
          if (delta === 0 ) return false;
          delta > 0
                  ? el.classList.add('fixed')
                  : el.classList.remove('fixed');
          setTimeout(() => {
            beforeScrollTop = afterScrollTop
          }, 0)
        }, 200))
      },
      unbind () {
        window.onscroll = null
      }
    }
  },

  mounted () {

  }
  
}
</script>

<style lang="less" scoped>

  .app-header {
    position: relative;
    z-index: 100;
    overflow: hidden;
    background: #FFFFFF;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
    background-clip: content-box;
    margin: 0 auto;
  }

  .inner {
    position: relative;
    height: 52px;
    max-width: 960px;
    padding: 0 16px;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    .navbar-blank {
      position: absolute;
      top: 0;
      left: 0;
      width: 60%;
      height: 100%;
      opacity: 0;
      -webkit-animation: logo-blink-data-v 8s ease-in 1s infinite;
      animation: logo-blink-data 8s ease-in 1s infinite;
    }
    .menu-view {
      margin-left: 20px;
      display: flex;
      color: #666;
      .tab-item {
        margin: 0 10px;
      }
    }
  }

  .avator {
    font-family: Damion,Neue;
    font-size: 38px;
    display: flex;
    align-items: center;
    color: rgba(0,0,0,0.65);
    img {
      height: 36px;
      opacity: .8;
    }
  }


  /*@import url("https://fonts.googleapis.com/css?family=Inconsolata:700");*/

  .menu-view .search {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    /*left: 0;*/
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: all 1s;
    z-index: 4;
  }
  .menu-view .search:hover {
    cursor: pointer;
  }
  .menu-view .search::before {
    content: "";
    position: absolute;
    margin: auto;
    top: 12px;
    right: 0;
    bottom: 0;
    left: 10px;
    width: 8px;
    height: 2px;
    background: #666;
    transform: rotate(45deg);
    transition: all .5s;
  }
  .menu-view .search::after {
    content: "";
    position: absolute;
    margin: auto;
    top: -5px;
    right: 0;
    bottom: 0;
    left: -5px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid #666;
    transition: all .5s;
  }
  .menu-view input {
    /*font-family: 'Inconsolata', monospace;*/
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    /*left: 0;*/
    width: 50px;
    height: 50px;
    outline: none;
    border: none;
    color: #666;
    padding: 0 80px 0 20px;
    transition: all 1s;
    opacity: 0;
    z-index: 5;
    font-weight: bolder;
    letter-spacing: 0.1em;
  }
  .menu-view input:hover {
    cursor: pointer;
  }
  .menu-view input:focus {
    width: 250px;
    opacity: 1;
    cursor: text;
  }
  .menu-view input:focus ~ .search {
    right: 0;
    z-index: 6;
  }
  .menu-view input::placeholder {
    color: #999;
    opacity: 0.5;
    font-weight: bolder;
  }
</style>
