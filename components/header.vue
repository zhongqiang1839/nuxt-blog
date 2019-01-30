<template>
  <header class="app-header">
    <div class="inner">
      <div class="avator"><img src="/images/logo_1538904715568.png"> <nuxt-link to="/">&nbsp;Jason.me</nuxt-link></div>
      <div class="meun-view">
        <!--<div class="tab-item"><nuxt-link to="/archive">归档</nuxt-link></div>-->
        <div class="tab-item"><nuxt-link to="/about">关于</nuxt-link></div>
        <!--<div class="tab-item"><nuxt-link to="/guest">留言墙</nuxt-link></div>-->
        <div class="tab-item"><nuxt-link to="/write">写文章</nuxt-link></div>
      </div>
    </div>
  </header>
</template>

<script>


export default {
  name: 'fn-header',
  data () {
    return {
    }
  },

  computed: {
  },

  watch: {
  },

  methods: {
  },

  directives: {
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
    .meun-view {
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

  .category {

  }

</style>
