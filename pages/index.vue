<template>
  <section class="container">
    <ul class="feedContainer">
      <li class="item" v-for="(item, index) in artlist" :key="index">
        <a :href="`/article/${item._id}`">
          <div class="content">
            <div class="info-box">
              <h3 class="title-row">
                <span :class="source[item.source].code" class="article-source">
                  {{item.source | sourceFormat}}</span>{{item.title}}
              </h3>
              <div class="content-row">
                {{ item.content | text(200)}}
              </div>
              <div class="art-opt">
                <p>{{item.type | typeFormat}} &nbsp;<span class="iconfont icon-time-circle"></span>{{ item.create_at | dateFormat('yyyy.MM.dd')}}&nbsp;</p>
                <div class="meta">
                  <div class="meta-item">{{item.likes}} 人喜欢</div>
                  <div class="meta-item">{{item.views}} 次阅读</div>
                  <div class="meta-item">{{item.comments}} 条评论</div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
    <div class="pagination" v-if="artlist.length">
      <button v-if="pagination.pages !== current_page" class="loadmore" @click="loadmore">Continue</button>
      <div v-else>No More!</div>
    </div>
  </section>
</template>

<script>
import { ARTICLE_SOURCE, FN_CATEGORYS } from '~/utils/constant'

export default {
  fetch ({ store }) {
    return store.dispatch('getArticleList')
  },

  data () {
    return {
      current_page: 1,
      source: ARTICLE_SOURCE
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
    async loadmore() {
      if(this.current_page === this.pagination.pages) return;
      await this.$store.dispatch('getArticleList', {
          page: this.current_page +=1
      })
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
  /*min-height: 100vh;*/
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

.article-source {
  display: inline-block;
  width: 36px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
  opacity: .5;
  transition: opacity .3s ease;
  font-size: .8rem;
  margin-right: .5rem;
  &.original {
    color: var(--primary-color);
    background-color: var(--primary-color-light)
  }
  &.reprint {
    color: #f56a00;
    background-color: rgba(245,106,0,.2)
  }
  &.hybrid {
    color: #108ee9;
    background-color: rgba(16,142,233,.2)
  }
  &.translate {
    color: #00a2ae;
    background-color: rgba(0,162,174,.2)
  }
}
.title-row {
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: .5rem;
  font-weight: 700;
  color: #666;

}
.content-row {
  line-height: 1.8rem;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.art-opt {
  margin: 24px 0 0 0;
  display: flex;
  align-items: center;
  color: rgba(0,0,0,0.43);
  justify-content: space-between;
  .iconfont {
    font-size: 14px;
    margin-right: 2px;
  }
}

.meta {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: nowrap;
  color: rgba(0,0,0,0.43);
  font-size: .8rem;
  .meta-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    &:first-child {
      &:before {
        content: "";
        border: none;
      }
    }
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
    font-size: 12px;
  }
}

</style>
