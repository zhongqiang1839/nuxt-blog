<template>
	<section class="container">
		<div class="fe-tags">
			<h1 class="fe-tags__title">4 Categories in total</h1>
			<div class="fe-tags__container">
				<div :class="['fe-tags__item', {'fe-tags__item--active': current_type === index}]" v-for="(item, index) in categorys" @click="searchByCate(item.value, item.label)" :key="item.value">
					#{{item.label}}
				</div>
			</div>
		</div>
		<article-list :art-list="artlist"></article-list>
	</section>
</template>

<script>
import { ARTICLE_SOURCE, FN_CATEGORYS } from "~/utils/constant";
import articleList from "~/components/article-list";
export default {
  name: "my-articles",
  head() {
    return { title: `标签 | 分类` };
  },
  data() {
    return {
      categorys: FN_CATEGORYS,
      current_type: ""
    };
  },
  computed: {
    tagslist() {
      return this.$store.state.article.tags;
    },
    artlist() {
      return this.$store.state.article.art.list;
    }
  },
  methods: {
    searchByCate(type, name) {
      this.current_type = type;
      window.history.pushState(null, null, `/category/${name}`);
      this.$store.dispatch("getArticleList", { type: type });
    }
  },
  mounted() {},
	components: {
		articleList
	}
};
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
    padding: 0.2em 1em 0.1em;
    border-radius: 3px;
    line-height: 2;
    background-color: var(--box-back-color);
    transition: background-color 0.1s ease-in;
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
