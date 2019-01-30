<template>
  <div class="article-page" >
    <section class="container">
      <div class="action-widget">
        <div class="affix is-fixed" style="">
          <div class="read-tool">
            <div class="tool-meta">
              <a title="点赞" @click="postLikeArticle" class="tool-item like liked" :badge="artItem.likes">
                <i class="iconfont icon-like"></i>
              </a>
              <a title="文章评论" class="tool-item comment" :comment="artItem.comments">
                <i class="iconfont icon-comment"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="article-widget">
        <div class="card article-detail">
          <span class="source article-source">{{source[artItem.source].label}}</span>
          <h2 class="title">{{artItem.title}}</h2>
          <div class="meta">
            <p>{{ artItem.create_at | dateFormat('yyyy.MM.dd hh:mm')}}&nbsp;</p>
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
import { ARTICLE_SOURCE } from '~/utils/constant'

export default {
  name: 'fn-article',

  transition: 'fade',

  scrollToTop: true,

  layout: 'index',

  fetch ({ store, params }) {
    return store.dispatch('getArtDetail', params)
  },

  head () {
    return { title: this.$store.state.article.details.title }
  },

  data () {
    return {
        source: ARTICLE_SOURCE
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
    async postLikeArticle() {
        let res = await this.$store.dispatch('postLikeArticle', this.artItem)
        if(res.code === 200) {
            // alert('文章写入成功');
        } else {
            // alert('文章写入失败')
        }
    }

  },

  mounted () {
  },

  components: {
    myComments
  }
}
</script>

<style lang="less" scoped>

.article-page {
  position: relative;
  width: 100%;
}
.article-widget {
  width: 100%;
  .source {
    position: absolute;
    top: -8px;
    left: -28px;
    display: block;
    width: 80px;
    height: 42px;
    line-height: 58px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    text-align: center;
    font-size: 12px;
  }
  .article-source {
    color: #302e31;
    background-color: rgba(48,46,49,0.2);
  }
}



.card {
  position: relative;
  margin-bottom: 16px;
  padding: 0 16px;
  background-color: hsla(0,0%,100%,0.8);;
  box-shadow: 0 0 14px 2px #ebebeb;
  border-radius: 2px;
  min-height: 500px;
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


.action-widget {
  position: absolute;
  top: 0;
  left: -52px;
  width: 36px;
  margin-right: 16px;
  z-index: 999;
}

.affix.is-fixed{
  position: fixed;
  margin-left: -2rem;
  top: 10rem;
  width: 36px;
  z-index: 100;
}

.read-tool {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  .tool-meta {
    margin-bottom: 8px;
    padding-bottom: 8px;
    .tool-item {
      background-color: #fff;
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.04);
      cursor: pointer;
      display: block;
      line-height: 3rem;
      text-align: center;
      margin-bottom: 20px;
      position: relative;
      .iconfont {
        font-size: 22px;
        font-weight: 300;
      }
      &.like {
        &.liked {
          .iconfont {
            color: #74ca46;
          }
          &:after {
            color: #fff;
            background-color: #74ca46;
          }
        }
        &:after {
          content: attr(badge);
          position: absolute;
          top: 0;
          left: 75%;
          padding: .1rem .4rem;
          font-size: 1rem;
          text-align: center;
          line-height: 1;
          white-space: nowrap;
          color: #fff;
          background-color: #b2bac2;
          border-radius: .7rem;
          transform-origin: left top;
          transform: scale(.75);
        }
      }
      &.comment {
        &:after {
          content: attr(comment);
          position: absolute;
          top: 0;
          left: 75%;
          padding: .1rem .4rem;
          font-size: 1rem;
          text-align: center;
          line-height: 1;
          white-space: nowrap;
          color: #fff;
          background-color: #b2bac2;
          border-radius: .7rem;
          transform-origin: left top;
          transform: scale(.75);
        }
      }

    }

  }
}


</style>
