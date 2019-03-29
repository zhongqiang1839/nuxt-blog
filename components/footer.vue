<template>
  <footer class="meta-footer">
    <div class="meta-footer__chat">
      <a href="mailto: zhongqiang1839@163.com" target="_blank" class="meta-footer__chat-item iconfont icon-email"></a>
      <a href="https://github.com/zhongqiang1839" target="_blank" class="meta-footer__chat-item iconfont icon-github-fill"></a>
      <a target="_blank" class="meta-footer__chat-item iconfont icon-QQ" href="http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes" title="联系我"></a>
    </div>
    <div class="meta-footer__info">
      <span>@</span>"2019" <span style="color: red;">❤</span>
      <a href="/">Jason Feng</a>
    </div>
    <div class="meta-footer__word">
      <span>Power by <a href="https://zh.nuxtjs.org/" target="_blank">Nuxt</a></span>
    </div>
  </footer>
</template>

<script>

import eevee from '~/components/eevee';

export default {
  name: 'fn-header',
  data () {
    return {
    }
  },

  methods: {
  },

  mounted () {

  },
  components: {
      eevee
  }
}
</script>

<style lang="less" scoped>
  .meta-footer {
    padding: 1rem;
    text-align: center;
    line-height: 1.4em;
    &__chat {
      margin-bottom: 1rem;
      padding: 0 1rem;
      user-select: none;
    }
    &__chat-item {
      margin: 0 .4rem;
      font-size: 1.528rem;
      line-height: 1.5;
      display: inline-block;
      transition: color .15s;
    }
    
    &__info {
      margin: .25rem 0;
      font-size: .85rem;
      word-wrap: break-word;
      line-height: 1.8;
      span {
        font-family: Josefin Sans;
        margin-right: 2px;
        vertical-align: -1px;
      }
      a {
        border-bottom: 1px dotted #85889b;
        transition: color .15s,border-color .15s,opacity .15s;
      }
    }
    
    &__word {
      a {
        border-bottom: 1px dotted #85889b;
        transition: color .15s,border-color .15s,opacity .15s;
      }
    }
    
  }
  
  

</style>
