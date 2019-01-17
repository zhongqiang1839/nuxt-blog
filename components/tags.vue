<template>
  <section class="cards-view">
    <div class="card-header">热门标签</div>
    <div class="card-body">
      <div class="tag-list">
        <a class="tag-item"  v-for="item in tagslist" :key="item._id" :href="`/tag/${item._id}`">{{item.name}}</a>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'fn-tags',
    computed: {
      tagslist () {
        return this.$store.state.article.tags
      },
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

  .cards-view {
    position: relative;
    margin-bottom: 16px;
    padding: 0 16px;
    background-color: hsla(0,0%,100%,0.8);
    box-shadow: 0 0 14px 2px #ebebeb;
    border-radius: 2px;
    .card-header {
      padding: 12px 0 6px;
      border-bottom: 1px solid #666;
      font-weight: 700;
    }
  }

  .card-body {
    padding: 16px 0;
  }

  .tag-list {
    overflow: auto;
  }

  .tag-item {
    display: inline-block;
    margin: 0 8px 8px 0;
    padding: 4px 8px;
    border: 1px solid #e6e6e6;
    font-size: 12px;
    border-radius: 4px;
    transition: all .3s ease;
  }
</style>
