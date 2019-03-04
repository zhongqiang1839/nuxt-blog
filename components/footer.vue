<template>
  <footer>
    <eevee></eevee>
    <!--<div class="container-wrapper">-->
      <!--<div class="friends">-->
        <!--<a href="">小星星</a>-->
        <!--<span class="hr"></span>-->
        <!--<a href="">小星星</a>-->
        <!--<span class="hr"></span>-->
        <!--<a href="">小星星</a>-->
        <!--<span class="hr"></span>-->
        <!--<a href="">小星星</a>-->
      <!--</div>-->
    <!--</div>-->
    <div class="container-wrapper">
      <div class="mune">
        &copy 2018 - JASON'S BLOG, POWER BY NUXT & KOA2
      </div>
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

  footer {
    margin-top: 1rem;
    padding: 1rem 0;
    background: #fff;
    border-top: 1px solid #eee;
    color: #666;
    .container-wrapper {
      display: flex;
      justify-content: center;
      margin: 0 auto;
      .friends {
        padding: .5rem 0;
      }
      .mune {
        padding: .5rem 1rem;
        color: #ccc;
      }
    }
  }

  .hr {
    display: inline-block;
    width: 2px;
    height: 2px;
    background: #aab2bd;
    margin: 4px .6rem;
  }

  .avator {

  }

  .category {

  }

</style>
