<template>
	<section class="container">
		<div class="fe-tags">
			<h1 class="fe-tags__title">9 tags in total</h1>
			<div class="fe-tags__container">
				<div :class="['fe-tags__item', {'fe-tags__item--active': current_name === item.name}]" v-for="(item, index) in tagslist" @click="searchByTags(item._id, item.name)" :key="item._id">
					#{{item.name}}
				</div>
			</div>
		</div>
		<ul class="fe-article__container" v-if="artlist.length">
			<li class="fe-article__item" v-for="(item, index) in artlist" :key="index">
				<a class="fe-article__item-link" :href="`/article/${item._id}`">
					<span class="fe-article__item-time">{{item.create_at}}</span>
					<span class="fe-article__item-title"> {{item.title}}</span>
				</a>
			</li>
		</ul>
		<div class="fe-article__empty" v-else> 暂无更多文章</div>
	</section>
</template>

<script>
	import { ARTICLE_SOURCE, FN_CATEGORYS } from '~/utils/constant'
	export default {
		name: 'my-articles',

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
			}
		},
		methods: {
			searchByTags (id, name) {
				this.current_name = name;
				window.history.pushState(null, null, `/tag/${name}`);
				this.$store.dispatch('getArticleList', { id: id })
			},
		},
		mounted () {}
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
		&__empty {
			background-color: #fff;
			padding: 6px 32px;
			text-align: center;
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
		}
		&__item {
			display: inline-block;
			margin: 0 1rem 1rem 0;
			padding: .2em 1em .1em;
			border-radius: 3px;
			line-height: 2;
			background-color: var(--copyright-color);
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
