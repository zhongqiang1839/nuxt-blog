<template>
  <section class="container">
    <div class="fe-tags">
      <h1 class="fe-tags__title">9 tags in total</h1>
      <div class="fe-tags__container">
        <div :class="['fe-tags__item', {'fe-tags__item--active': current_name === item.name }]" v-for="(item, index) in tagslist" @click="searchByTags(item._id, item.name)" :key="item._id">
          #{{item.name}}
        </div>
      </div>
    </div>
    <article-list :art-list="artlist"></article-list>
  </section>
</template>

<script>
import { ARTICLE_SOURCE, FN_CATEGORYS } from '~/utils/constant'
import articleList from '~/components/article-list'
export default {
  name: 'my-articles',

  fetch ({ store, params }) {
    if( store.state.article.tags.find(item => item.name === params.name)) {
      return store.dispatch('getArticleList', { id:  store.state.article.tags.find(item => item.name === params.name)._id })
    }
  },

  head () {
    return { title: `标签 | 分类` }
  },
  data () {
    return {
      current_page: 1,
      source: ARTICLE_SOURCE,
      current_name: ''
    }
  },
  computed: {
    tagslist () {
      return this.$store.state.article.tags;
    },
    artlist () {
      return this.$store.state.article.art.list;
    },
    name() {
      return this.$route.params.name;
    }
  },
  methods: {
    searchByTags (id, name) {
      this.current_name = name;
      window.history.pushState(null, null, `/tag/${name}`);
      this.$store.dispatch('getArticleList', { id: id })
    },
  },
  mounted () {
    this.current_name = this.name
  },
  components: {
    articleList
  }
}
</script>

<style lang="less" scoped>


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
    }
    &__item {
      display: inline-block;
      margin: 0 1rem 1rem 0;
      padding: .2em 1em .1em;
      border-radius: 3px;
      line-height: 2;
      background-color: var(--box-back-color);
      /*transition: background-color .15s;*/
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
