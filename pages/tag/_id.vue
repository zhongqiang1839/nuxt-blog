<template>
  <section class="container">
    <ul class="feedContainer">
      <li class="item" v-for="item in artlist" :key="item._id">
        <a :href="`/article/${item._id}`">
          <div class="content">
            <div class="info-box">
              <div class="title-row">
                {{item.title}}
              </div>
              <div class="content-row">
                {{item.description}}
              </div>
              <div class="meta-row">
                <span>{{item.likes}} 人喜欢</span>
                <span class="hr"></span>
                <span>{{item.views}} 次阅读</span>
                <span class="hr"></span>
                <span>{{item.comments}} 条评论</span>
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
    <div v-if="pagination.pagination === current_page" @click="loadMore">加载更多</div>
  </section>
</template>

<script>
export default {
  name: 'article',

  fetch ({ store, params }) {
    return store.dispatch('getArticleList', params)
  },

  head () {
    return { title: `标签 | 分类` }
  },
  data () {
    return {
      current_page: 1,
    }
  },

  computed: {
    artlist () {
      return this.$store.state.article.art.list
    },
    pagination () {
      return this.$store.state.article.art.pagination
    },
  },

  methods: {
    hide () {
      this.showDialog = false
    },

  },

  mounted () {
  }
}
</script>

<style lang="less" >
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
    align-items: center;
    margin-top: .5rem;
    height: 1rem;
    line-height: 1rem;
    font-size: .85rem;
    color: #666;
    .hr {
      display: inline-block;
      width: 2px;
      height: 2px;
      background: #aab2bd;
      margin: 4px .6rem;
    }
  }

</style>
