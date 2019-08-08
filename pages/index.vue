<template>
  <section class="fe-article">
    <ul class="fe-article__container">
      <li class="fe-article__item" v-for="(item, index) in artlist" :key="index">
        <nuxt-link class="fe-article__link" :to="`/article/${item._id}`">
          <div class="fe-article__item-content">
            <div class="fe-article__info">
              <div class="fe-article__thumb" v-if="item.thumb">
                <img class="fe-article__thumb-img" :data-title="item.title" :src="item.thumb" alt="">
                <div class="fe-article__thumb-title">
                  <h3 class="">
                    {{item.title}}
                  </h3>
                </div>
              </div>
              <div class="fe-article__wrapper">
                <h3 class="fe-article__title" v-if="!item.thumb">
                  {{item.title}}
                </h3>
                <div v-if="item.description" class="fe-article__desc markdown-body hljs" v-html="marked(item.description)"></div>
                <p class="fe-article__tag">
                  <!--<span :class="['iconfont', item.typeClass]"></span>&nbsp;{{item.typeName}}-->
                </p>
                <div class="fe-article__opt">
                  <p>
                    <span class="iconfont icon-calendar"></span>{{ item.create_at }}
                  </p>
                  <div class="fe-article__meta">
                    <div class="fe-article__meta-item">{{item.likes}} 人喜欢</div>
                    <div class="fe-article__meta-item">{{item.views}} 次阅读 &nbsp;</div>
                    <!--<div class="fe-article__meta-item">{{item.comments}} 评论 &nbsp;</div>-->
                    <span :class="item.sourceClass" class="article-source">
                    {{item.sourceName}}
                  </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nuxt-link>
      </li>
    </ul>
    <div class="fe-pagination" v-if="artlist.length">
      <button v-if="pagination.pages !== current_page" class="fe-pagination__more" @click="loadmore">Continue</button>
      <div v-else class="fe-pagination__empty">No More!</div>
    </div>
  </section>
</template>

<script>
import { ARTICLE_SOURCE, FN_CATEGORYS } from '~/utils/constant'
import markdown from '~/plugins/marked'

export default {
  fetch ({ store }) {
    return store.dispatch('getArticleList')
  },
  data () {
    return {
      banners: ['/images/banner/1.png', '/images/banner/2.png'],
      current_page: 1,
      source: ARTICLE_SOURCE,
      swiperOption: {
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,//默认true
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        effect: 'fade',
        paginationClickable: true,
        speed: 1000,
        loop: true,
        observer: true,
        observeParents: true,
        autoplayDisableOnInteraction: false
      }
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
    marked(content) {
      return markdown(content, null, false).html
    },
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

.fe-article {
  &__container {
    width: 100%;
  }
  &__link {
    &:hover {
      .fe-article__title {
        margin-left: 10px;
      }
      .fe-article__thumb-title h3{
        margin-left: 10px;
      }
    }
  }
  &__item {
    background-color: #fff;
    margin-bottom: 1.2rem;
    list-style-type: none;
    border-radius: .5rem;
    overflow: hidden;
    &:last-child {
      margin-bottom: 0;
    }
    &-content {
      display: flex;
      align-items: center;
    }
  }
  &__info {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
  }
  &__wrapper {
    padding: 1rem 1.2rem;
  }
  &__title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: .5rem;
    font-weight: 700;
    color: #2a2b33;
    transition: all .3s ease;
  }
  &__thumb {
    position: relative;
    display: block;
    width: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    &-img {
      width: 100%;
      height: 100%;
    }
    &-title {
      position: absolute;
      bottom: 0.3rem;
      left: 0;
      height: 4rem;
      width: 100%;
      color: #fff;
      line-height: 4rem;
      padding-left: 1.2rem;
      background-color: rgba(0,0,0, .1);
      h3 {
        transition: all .3s ease;
      }
    }
  }
  &__desc {
    line-height: 1.8rem;
    margin-top: 20px!important;
  }
  &__tag {
    margin: 24px 0 10px 0;
    font-size: 14px;
    color: #999;
    span {
      color: #EA6F5A;
    }
  }
  &__opt {
    display: flex;
    align-items: center;
    color: rgba(0,0,0,0.43);
    justify-content: space-between;
    .iconfont {
      font-size: 14px;
      margin-right: 2px;
    }
  }
  &__meta {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: nowrap;
    color: rgba(0,0,0,0.43);
    font-size: .8rem;
    &-item {
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
}

.article-source {
  display: inline-block;
  width: 36px;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
  opacity: .5;
  transition: opacity .3s ease;
  font-size: .8rem;
  &.original {
    color: #302e31;
    background-color: rgba(48,46,49,0.2)
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

.fe-pagination {
  background-color: #fff;
  padding: 6px 32px;
  text-align: center;
  &__more {
    padding: 6px 32px;
    background: #f2f2f2;
    border-radius: 2px;
    border: 1px solid #e6e6e6;
    cursor: pointer;
    transition: all .3s ease;
  }
  &__empty {
    color: #666;
    font-size: 12px;
  }
}

@media (max-width: 656px) {
  .fe-article__item {
    margin: 1rem;
  }
  .fe-pagination {
    margin: 0 1rem 1rem 1rem;
  }
}

.my-swiper {
  height: 240px;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 10px;
  .swiper-slide {
    text-align: center;
    font-size: 38px;
    font-weight: 700;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .swiper-pagination {
    bottom: 4px;
    right: 10px;
    > .swiper-pagination-bullet {
      background-color: red;
    }
  }
}
</style>
