<template>
  <section class="container">
    <div class="fe-tags">
      <h1 class="fe-tags__title">4 Categories in total</h1>
      <div class="fe-tags__container">
        <a :class="['fe-tags__item', {'fe-tags__item--active': type == index}]" v-for="(item, index) in categorys" :href="'/category/' + item.value" :key="item.value">
          #{{item.label}}
        </a>
      </div>
    </div>
    <ul class="fe-article__container">
      <li class="fe-article__item" v-for="(item, index) in artlist" :key="index">
        <a class="fe-article__item-link" :href="`/article/${item._id}`">
          <span class="fe-article__item-time">{{item.create_at}}</span>
          <span class="fe-article__item-title"> {{item.title}}</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
import { ARTICLE_SOURCE, FN_CATEGORYS } from '~/utils/constant'
export default {
  name: 'my-articles',

  fetch ({ store, params }) {
    return store.dispatch('getArticleList', params)
  },

  head () {
    return { title: `标签 | 分类` }
  },
  data () {
    return {
      categorys: FN_CATEGORYS
    }
  },
  computed: {
    tagslist () {
      return this.$store.state.article.tags;
    },
    artlist () {
      return this.$store.state.article.art.list;
    },
    type() {
      return this.$route.params.type;
    }
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
  .fe-article {
    &__container {
      margin-top: 1rem;
      display: block;
      border-radius: 6px;
      padding: 2.15rem;
      background-color: #fff;
    }
    &__item {
      list-style-type: none;
      &-link {
        position: relative;
        display: block;
        margin-left: 1.5rem;
        padding: .5rem 0;
        line-height: 2rem;
        transition: margin-left .4s;
        &:before {
          position: absolute;
          top: 1.5rem;
          left: -1rem;
          content: "-";
          opacity: .5;
          -webkit-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          transform: translateY(-50%);
        }
        &:hover {
          margin-left: 1rem;
        }
      }
      &-time {
        float: left;
        padding-right: .5rem;
        white-space: nowrap;
        letter-spacing: 1px;
        font-size: .85rem;
        font-family: Montserrat,PingFang SC,Microsoft JhengHei,sans-serif;
        opacity: .5;
      }
      &-title {
        display: table-cell;
        padding-top: .1rem;
        font-size: 1.15rem;
      }
    }
  }
  
  .fe-tags {
    display: block;
    border-radius: 6px;
    padding: 2.15rem;
    background-color: #fff;
    margin-bottom: 1.3rem;
    &__title {
      margin: 0 0 1.5rem;
      font-size: 1.8rem;
    }
    &__container {
      width: 100%;
      background-color: #fff;
      font-size: 1.2rem;
    }
    &__item {
      display: inline-block;
      margin: 0 1rem 1rem 0;
      padding: .2em 1em .1em;
      border-radius: 3px;
      line-height: 2;
      background-color: var(--copyright-color);
      transition: background-color .1s ease-in;
      &:hover {
        color: #fff;
        background-color: var(--theme-color);
      }
      &--active {
        color: #fff;
        background-color: var(--theme-color);
      }
    }
  }
  
</style>
