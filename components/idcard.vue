<template>
  <section class="cards-view">

  </section>
</template>

<script>

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
  }
}
</script>

<style lang="less" scoped>

  .cards-view {
    position: relative;
    margin-bottom: 16px;
    padding: 0 16px;
    background-color: hsla(0,0%,100%,0.8);
    box-shadow: 0 0 14px 2px #ebebeb;
    border-radius: 2px;
    .card-header {
      padding: 12px 0 6px;
      border-bottom: 1px solid #eee;
      font-weight: 700;
    }
  }

  .card-body {
    padding: 16px 0;
  }

</style>
