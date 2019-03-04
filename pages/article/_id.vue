<template>
	<div class="article-page">
		<section class="container">
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
					<div class="content markdown-body"
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
					     v-html="marked(artItem.content)">
					</div>
					<div class="reference">
						<div :class="['like', isActive ? 'active' : '']" @click="postLikeArticle">
							<section>
								<div :class="['fave', isActive ? 'active' : '']"></div>
								喜欢
							</section>
							<section>{{artItem.likes}}</section>
						</div>
					</div>
					<div class="copyright">
						<div class="wrapper">
							<p>
								<span>文本标题:</span>
								<a href="">{{artItem.title}}</a>
							</p>
							<p>
								<span>文章链接:</span>
								<a href="">http://jason.me/</a>
							</p>
							<p>
								<span>版权信息:</span>
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
		</section>
	</div>
</template>

<script>

	import markdown from '~/plugins/marked'
	import myShare from '~/components/bdshare'
	import myComments from '~/components/comments'
	import {ARTICLE_SOURCE} from '~/utils/constant'

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
				isActive: false
			}
		},

		computed: {
			artItem() {
				return this.$store.state.article.details
			},
			articleContent() {
				return markdown(this.artItem.content, true, true).html
			},
		},

		methods: {
			hide() {
				this.showDialog = false
			}, // markdown解析服务
			marked(content) {
				return markdown(content, null, false).html
			},
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
		},

		components: {
			myShare,
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
			background-color: #EA6F5A;
		}
	}
	
	.card {
		position: relative;
		margin-bottom: 16px;
		padding: 0 16px;
		background-color: hsla(0, 0%, 100%, 0.8);;
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
			color: rgba(0, 0, 0, 0.43);
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
				background-color: #EA6F5A;
				border: 1px solid #EA6F5A;
				color: #fff;
			}
			.fave {
				width: 2.8rem;
				height: 2.8rem;
				display: inline;
				border-radius: 50%;
				background: url(/images/zan.png) no-repeat;
				background-position: left;
				background-size: auto 100%;
				
				&.active {
					background-color: #EA6F5A;
					background-position: right;
					transition: background .6s steps(19);
				}
			}
			
			section {
				&:first-child {
					display: flex;
					justify-content: center;
					align-items: center;
					flex: 3;
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
			border-left: 3px solid #EA6F5A;
			border-radius: 3px;
			word-break: break-word;
			line-height: 1.8;
			background-color: rgba(96,125,139,.05);
			span {
				margin-right: 1em;
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
