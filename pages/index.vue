<template>
  <section class="fe-article">
    <ul class="fe-article__container">
      <li class="fe-article__item" v-for="(item, index) in artlist" :key="index">
        <a :href="`/article/${item._id}`">
          <div class="fe-article__item-content">
            <div class="fe-article__info">
              <h3 class="fe-article__title">
                {{item.title}}
              </h3>
              <div class="fe-article__desc">
                {{ item.description}}
              </div>
              <p class="fe-article__tag">
                <span :class="['iconfont', item.typeClass]"></span>&nbsp;{{item.typeName}}
              </p>
              <div class="fe-article__opt">
                <p>
                  <span class="iconfont icon-calendar"></span>{{ item.create_at }}
                </p>
                <div class="fe-article__meta">
                  <div class="fe-article__meta-item">{{item.likes}} 人喜欢</div>
                  <div class="fe-article__meta-item">{{item.views}} 次阅读 &nbsp;</div>
                  <span :class="item.sourceClass" class="article-source">
                    {{item.sourceName}}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </a>
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
    background-color: #fff;
  }
  &__item {
    border-bottom: 1px solid rgba(178,186,194,.15);
    background-color: #fff;
    &-content {
      display: flex;
      align-items: center;
      padding: 1.5rem 2rem;
    }
  }
  &__info {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
  }
  &__title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: .5rem;
    font-weight: 700;
    color: #666;
  }
  &__desc {
    line-height: 1.8rem;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
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
  margin-right: .5rem;
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

@media (max-width: 450px) {
  .fe-article__meta {
    /*display: none;*/
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
