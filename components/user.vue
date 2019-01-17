<template>
  <section class="user-view">
    <header>
    </header>
  </section>
</template>

<script>
  export default {
    name: 'fn-user',
    computed: {
      tagslist () {
        // return this.$store.state.article.tags
      },
    },
  }
</script>

<style lang="less" scoped>

  .user-view {
    padding: 0 16px;
    background-color: hsla(0,0%,100%,0.8);
    box-shadow: 0 0 14px 2px #ebebeb;
    border-radius: 2px;
    margin-bottom: 20px;
    header {
      width: 100%;
      margin: 0 auto;
      img {
        text-align: center;
        display: block;
        border-radius: 300px;
        padding: 10px;
        width: 100px;
        height: 100px;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
        background: #88acdb;
        display: -webkit-box;
        text-align: center;
      }
    }

  }


  .mario::after {
    position: absolute;
    top: -4px;
    left: -6px;
    content: "";
    background: 0 0;
    width: 6px;
    height: 6px;
    color: #f81c2f;
    box-shadow: 30px 6px, 36px 6px, 42px 6px, 48px 6px, 54px 6px, 24px 12px, 30px 12px, 36px 12px, 42px 12px, 48px 12px, 54px 12px, 60px 12px, 66px 12px, 72px 12px, 24px 18px #65352b, 30px 18px #65352b, 36px 18px #65352b, 42px 18px #ffbb8e, 48px 18px #ffbb8e, 54px 18px #000, 60px 18px #ffbb8e, 18px 24px #65352b, 24px 24px #ffbb8e, 30px 24px #65352b, 36px 24px #ffbb8e, 42px 24px #ffbb8e, 48px 24px #ffbb8e, 54px 24px #000, 60px 24px #ffbb8e, 66px 24px #ffbb8e, 72px 24px #ffbb8e, 18px 30px #65352b, 24px 30px #ffbb8e, 30px 30px #65352b, 36px 30px #65352b, 42px 30px #ffbb8e, 48px 30px #ffbb8e, 54px 30px #ffbb8e, 60px 30px #000, 66px 30px #ffbb8e, 72px 30px #ffbb8e, 78px 30px #ffbb8e, 18px 36px #65352b, 24px 36px #65352b, 30px 36px #ffbb8e, 36px 36px #ffbb8e, 42px 36px #ffbb8e, 48px 36px #ffbb8e, 54px 36px #000, 60px 36px #000, 66px 36px #000, 72px 36px #000, 30px 42px #ffbb8e, 36px 42px #ffbb8e, 42px 42px #ffbb8e, 48px 42px #ffbb8e, 54px 42px #ffbb8e, 60px 42px #ffbb8e, 66px 42px #ffbb8e, 30px 48px, 36px 48px #1560ad, 42px 48px, 48px 48px, 54px 48px #1560ad, 18px 54px, 24px 54px, 30px 54px, 36px 54px #1560ad, 42px 54px, 48px 54px, 54px 54px #1560ad, 60px 54px, 66px 54px, 72px 54px, 12px 60px, 18px 60px, 24px 60px, 30px 60px, 36px 60px #1560ad, 42px 60px #1560ad, 48px 60px #1560ad, 54px 60px #1560ad, 60px 60px, 66px 60px, 72px 60px, 78px 60px, 12px 66px #aeaeac, 18px 66px #aeaeac, 24px 66px, 30px 66px #1560ad, 36px 66px #fef102, 42px 66px #1560ad, 48px 66px #1560ad, 54px 66px #fef102, 60px 66px #1560ad, 66px 66px, 72px 66px #aeaeac, 78px 66px #aeaeac, 12px 72px #aeaeac, 18px 72px #aeaeac, 24px 72px #aeaeac, 30px 72px #1560ad, 36px 72px #1560ad, 42px 72px #1560ad, 48px 72px #1560ad, 54px 72px #1560ad, 60px 72px #1560ad, 66px 72px #aeaeac, 72px 72px #aeaeac, 78px 72px #aeaeac, 12px 78px #aeaeac, 18px 78px #aeaeac, 24px 78px #1560ad, 30px 78px #1560ad, 36px 78px #1560ad, 42px 78px #1560ad, 48px 78px #1560ad, 54px 78px #1560ad, 60px 78px #1560ad, 66px 78px #1560ad, 72px 78px #aeaeac, 78px 78px #aeaeac, 24px 84px #1560ad, 30px 84px #1560ad, 36px 84px #1560ad, 54px 84px #1560ad, 60px 84px #1560ad, 66px 84px #1560ad, 18px 90px #65352b, 24px 90px #65352b, 30px 90px #65352b, 60px 90px #65352b, 66px 90px #65352b, 72px 90px #65352b, 12px 96px #65352b, 18px 96px #65352b, 24px 96px #65352b, 30px 96px #65352b, 60px 96px #65352b, 66px 96px #65352b, 72px 96px #65352b, 78px 96px #65352b;
  }
</style>
