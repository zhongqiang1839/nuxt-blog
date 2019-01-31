<template>
  <section class="container">
    <ul class="feedContainer">
      <li class="item" v-for="item in artlist" :key="item._id">
        <a :href="`/article/${item._id}`">
          <div class="content">
            <div class="info-box">
              <div class="title-row">
                {{item.title}}<i class="icon-cloud-download"></i>
              </div>
              <div class="content-row">
                {{ item.content | text(200)}}
              </div>
              <div class="meta">
                <p>{{ item.create_at | dateFormat('yyyy.MM.dd hh:mm')}}&nbsp;</p>
                <div class="meta-item">{{item.likes}} 人喜欢</div>
                <div class="meta-item">{{item.views}} 次阅读</div>
                <div class="meta-item">{{item.comments}} 条评论</div>
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
    <div class="pagination" v-if="artlist.length">
      <button v-if="pagination.pages !== current_page" class="loadmore">Continue</button>
      <div v-else>No More!</div>
    </div>
    <div class="pagination" v-else>
      <div class="page-not-null">
        <img src="/images/undraw_empty_xct9.png" />
      </div>
      <div>is empty!</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'my-articlelist',

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
    color: #666;
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
  .meta {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: nowrap;
    margin: 24px 0 0 0;
    color: rgba(0,0,0,0.43);
    font-size: 12px;
    .meta-item {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: nowrap;
      position: relative;
      &:before {
        content: "";
        width: 2px;
        height: 2px;
        margin: 0 10px;
        border: 1px solid  rgba(0,0,0,0.43);
        border-radius: 1px;
      }
    }
  }

  .pagination {
    background-color: #fff;
    padding: 6px 32px;
    text-align: center;
    .loadmore {
      padding: 6px 32px;
      background: var(--button-color);
      border-radius: 2px;
      border: 1px solid var(--border-color);
      cursor: pointer;
      transition: all .3s ease;
    }
    div {
      color: #666;
      font-size: 14px;
    }
  }

  .page-not-null {
    img {
      width: 100%;
    }
  }



</style>
