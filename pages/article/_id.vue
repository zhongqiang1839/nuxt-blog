<template>
  <div class="article-page" >
    <section class="container">
      <div class="article-widget">
        <div class="card article-detail">
          <h2 class="title">{{artItem.title}}</h2>
          <div class="meta">
            <div class="meta-item">{{artItem.likes}} 人喜欢</div>
            <div class="meta-item">{{artItem.views}} 次阅读</div>
            <div class="meta-item">{{artItem.comments}} 条评论</div>
          </div>
          <div class="content markdown-body" v-html="articleContent"></div>

          <div class="copyright">
            <p>
              <span>文本标题:</span>
              <a href="">{{artItem.title}}</a>
            </p>
            <p>
              <span>版权信息:</span>
              <a href=""> "署名-非商用-自由转载" 转载请保留原文链接。</a>
            </p>
          </div>

        </div>
      </div>
      <div class="comment">
        <my-comments :post-id="artItem.id" v-if="artItem.title"></my-comments>
      </div>
    </section>
  </div>
</template>

<script>

import markdown from '~/plugins/marked'
import myComments from '~/components/comments'

export default {
  name: 'fn-article',

  transition: 'fade',

  scrollToTop: true,

  fetch ({ store, params }) {
    return store.dispatch('getArtDetail', params)
  },

  head () {
    return { title: this.$store.state.article.details.title }
  },

  data () {
    return {
    }
  },

  computed: {
    artItem () {
      return this.$store.state.article.details
    },
    articleContent () {
      return markdown(this.artItem.content, false, true).html
    },
  },

  methods: {
    hide () {
      this.showDialog = false
    },

  },

  mounted () {
  },

  components: {
    myComments
  }
}
</script>

<style lang="less" >

.article-page {
  position: relative;
  width: 100%;
}
.article-widget {
  width: 100%;
}
.card {
  position: relative;
  margin-bottom: 16px;
  padding: 0 16px;
  background-color: hsla(0,0%,100%,0.8);;
  box-shadow: 0 0 14px 2px #ebebeb;
  border-radius: 2px;
}

.article-detail {
  padding: 16px;
  overflow: hidden;
  .title {
    margin: 16px 0;
    font-size: 20px;
    text-align: center;
    color: rgba(0, 0, 0, 0.65);
  }
  .meta {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    margin: 12px 0 16px;
    color: rgba(0,0,0,0.43);
    font-size: 12px;
    .meta-item {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: nowrap;
      position: relative;
      margin-right: 12px;
      &:before {
        content: "";
        width: 2px;
        height: 2px;
        margin-right: 4px;
        border: 1px solid  rgba(0,0,0,0.43);
        border-radius: 1px;
      }
    }
  }

  .copyright {
    width: 85%;
    max-width: 45em;
    margin: 0 auto;
    padding: 0.5em 1.8em;
    margin-top: 60px;
    font-size: 0.93em;
    line-height: 1.6em;
    word-break: break-word;
    border: 1px solid #ddd;
    box-shadow: 0 2px 2px rgba(0,0,0,0.05), 0 15px 100px 0 rgba(0,0,75,0.125);
    -webkit-transition-delay: 0.2s;
    -moz-transition-delay: 0.2s;
    transition-delay: 0.2s;
    border-radius: 6px;
    span {
      margin-right: 1em;
      color: #5d686f;
    }
    a {
      text-decoration: none;
      outline-width: 0;
      color: #4094c7;
      outline: none;
    }
  }
}



</style>
