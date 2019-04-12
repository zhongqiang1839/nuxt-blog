<template>
  <section class="fe-tags">
    <h1 class="fe-tags__title">9 tags in total</h1>
    <div class="fe-tags__container">
      <nuxt-link class="fe-tags__item" v-for="(item, index) in tagslist" :to="'/tag/' + item._id" :key="item._id">
        #{{item.name}}
      </nuxt-link>
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
    }
  },
  computed: {
    tagslist () {
      return this.$store.state.article.tags;
    },
  },
  methods: {
  },

  mounted() {
  },

  components: {
  }
}
</script>

<style lang="less" scoped>

.fe-tags {
  display: block;
  border-radius: 6px;
  padding: 2.15rem;
  background-color: #fff;
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
    background-color: var(--copyright-color);
    -webkit-transition: background-color .15s;
    transition: background-color .15s;
    &:hover {
      color: #fff;
      background-color: var(--theme-color);
    }
  }
}

</style>
