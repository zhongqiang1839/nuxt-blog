<template>
  <section class="container">

  </section>
</template>

<script>

export default {

  layout: 'index',

  fetch ({ store }) {
  },

  data () {
    return {
      current_page: 1,
    }
  },

  computed: {
  },
  methods: {
    loadMore() {

    }
  },

  mounted() {
  },

  components: {
  }
}
</script>

<style lang="less" scoped>

.container {
  min-height: 100vh;
}

.feedContainer {
  width: 100%;
  background-color: #fff;
  li {
    border-bottom: 1px solid rgba(178,186,194,.15);
    background-color: #fff;
  }
}

.content {
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;
}

.info-box {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.title-row {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  margin-bottom: .5rem;
  font-size: 1.2rem;
  font-weight: 700;
}
.content-row {
  line-height: 1.8rem;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.meta-row {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-top: .8rem;
  height: 1rem;
  line-height: 1rem;
  font-size: .85rem;
  color: #666;
  span {
    margin-right: 1rem;
    &:first-child {
      margin-right: 2rem!important;
    }
    .iconfont {
      margin-right: .5rem;
    }
  }
}

</style>
