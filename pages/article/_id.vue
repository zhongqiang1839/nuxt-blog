<template>
	<div class="article-page">
		<section class="container">
			<div class="article-widget">
				<div class="card article-detail">
					<span class="source article-source">{{source[artItem.source].label}}</span>
					<h2 class="title">{{artItem.title}}</h2>
					<div class="meta">
						<p>{{ artItem.formatTime}}&nbsp;</p>
						<div class="meta-item">{{artItem.likes}} 人喜欢</div>
						<div class="meta-item">{{artItem.views}} 次阅读</div>
						<div class="meta-item">{{artItem.comments}} 条评论</div>
					</div>
					<div class="content markdown-body hljs"
					     v-copyright
					     v-viewer.static="{
                movable: false,
                toolbar: {
                    zoomIn: true,
                    zoomOut: true,
                    rotateLeft: false,
                    rotateRight: false,
                    flipHorizontal: false,
                    flipVertical: false,
                    prev: true,
                    play: true,
                    next: true,
                    oneToOne: true,
                    reset: true,
                }
              }"
					     v-html="articleContent">
					</div>
					<div class="reference">
						<div :class="['like', isActive ? 'active' : '']" @click="postLikeArticle">
							<section>
								<div :class="['fave', isActive ? 'active' : '']"></div><span>like</span>
							</section>
							<section>{{artItem.likes}}</section>
						</div>
					</div>
					<div class="copyright">
						<div class="wrapper">
							<p>
								<span>文本标题：</span>
								<a href="">{{artItem.title}}</a>
							</p>
							<p>
								<span>文章链接：</span>
								<a href="">{{artLink}}</a>
							</p>
							<p>
								<span>版权信息：</span>
								<a href="">"署名-非商用-自由转载" 转载请保留原文链接。</a>
							</p>
						</div>
					</div>
					<div class="share">
						<!--<my-share class="article-share"></my-share>-->
					</div>
				</div>
			</div>
			<div class="comment">
				<my-comments :post-id="artItem.id" v-if="artItem.title"></my-comments>
			</div>

			<!--<loading-com></loading-com>-->
		</section>
	</div>
</template>

<script>

	import markdown from '~/plugins/marked'
	import myShare from '~/components/bdshare'
	import myComments from '~/components/comments'
	import {ARTICLE_SOURCE} from '~/utils/constant'

	import loadingCom from '~/components/pageLoading/pageLoading'

	export default {
		name: 'fn-article',

		transition: 'fade',

		scrollToTop: true,

		fetch({store, params}) {
			return store.dispatch('getArtDetail', params)
		},

		head() {
			return {title: this.$store.state.article.details.title}
		},

		data() {
			return {
				source: ARTICLE_SOURCE,
				isActive: false,
				artLink: ''
			}
		},

		computed: {
			artItem() {
				return this.$store.state.article.details
			},
			// markdown解析服务
			articleContent() {
				return markdown(this.artItem.content, false, true).html
			},
		},

		methods: {
			async postLikeArticle() {
				if(this.isActive) return;
				this.isActive = true;
				let res = await this.$store.dispatch('postLikeArticle', this.artItem)
				if (res.code === 200) {
					// alert('文章写入成功');
				} else {
					// alert('文章写入失败')
				}
			}

		},

		mounted() {
			this.artLink = location.href;
		},

		components: {
			myShare,
			loadingCom,
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
			color: #FFF;
			background: var(--theme-color);
			transition: .2s ease-in background-color;
		}
	}

	.card {
		position: relative;
		margin-bottom: 16px;
		padding: 0 16px;
		background-color: hsla(0, 0%, 100%, 0.8);;
		box-shadow: 0 0 14px 2px #ebebeb;
		border-radius: 2px;
	}

	.article-detail {
		padding: 1.2rem;
		overflow: hidden;

		.title {
			margin: 1.2rem 0;
			font-size: 1.6rem;
			text-align: center;
			color: rgba(0, 0, 0, 0.65);
		}

		.meta {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			flex-wrap: nowrap;
			margin: 0.8rem 0 1.2rem;
			color: rgba(0, 0, 0, 0.43);
			font-size: 0.8rem;

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
					border: 1px solid rgba(0, 0, 0, 0.43);
					border-radius: 1px;
				}
			}
		}
	}

	.reference {
		margin: 20px;
		.like {
			height: 3rem;
			width: 9rem;
			border-radius: 26px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 10px;
			margin: 0 auto;
			border: 1px solid #eee;
			background-color: #fff;
			color: #666;
			&.active {
				background-color: var(--theme-color);
				border: 1px solid var(--theme-color);
				color: #fff;
			}
			.fave {
				width: 2.5rem;
				height: 2.5rem;
				display: inline;
				border-radius: 50%;
				background: url(/sys/zan.png) no-repeat;
				background-position: left;
				background-size: auto 100%;
				&.active {
					background-color: var(--theme-color);
					background-position: right;
					transition: background .6s steps(19);
				}
			}

			section {
				&:first-child {
					display: flex;
					justify-content: center;
					align-items: center;
					flex: 2;
				}

				&:last-child {
					flex: 1;
					border-left: 1px solid #e6e6e6;
					text-align: center;
				}
			}
		}
	}

	.copyright {
		.wrapper {
			padding: 0.5em 1.8em;
			font-size: 0.93em;
			display: block;
			margin: 2rem 0 1rem 0;
			border-left: 3px solid var(--theme-color);
			border-radius: 3px;
			word-break: break-word;
			line-height: 1.8;
			background-color: var(--box-back-color);
			transition: border-left-color,background-color .4s ease-in;
			span {
				margin-right: .2em;
				color: #5d686f;
			}
			a {
				text-decoration: none;
				color: #4094c7;
			}
		}
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
				box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .04);
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
