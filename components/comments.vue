<template>
  <div class="comment-box" id="comment-box" >
    <form class="post-box" name="comment" id="post-box">
      <div class="editor-box">
        <div class="user">
          <div class="name">
            <input required
                   type="text"
                   name="name"
                   placeholder="称呼（必填）"
                   v-model="user.name"
                   maxlength="10">
          </div>
          <div class="email">
            <input required
                   type="email"
                   name="email"
                   placeholder="邮箱（必填，不会公开）"
                   v-model="user.email"
                   @blur="updateUserGravatar"
                   maxlength="40">
          </div>
          <div class="site">
            <input type="url" name="url" placeholder="网站（http, https:// 开头，非必填）" v-model="user.site" maxlength="40">
          </div>
        </div>
        <div class="editor">
            <div class="will-reply" v-if="!!pid" key="1">
              <div class="reply-user">
                <span>
                  <span>回复: @{{ replyCommentSelf.name }}</span>
                </span>
                <a href="" class="cancel iconfont icon-undo" @click.stop.prevent="cancelCommentReply">取消</a>
              </div>
              <div class="reply-preview"
                   v-html="marked(replyCommentSelf.content).length > 100
                    ? marked(replyCommentSelf.content).slice(0, 100) + '...'
                    : marked(replyCommentSelf.content)"></div>
            </div>
            <div class="markdown" key="2">
              <div class="markdown-editor"
                   ref="markdown"
                   contenteditable="true"
                   placeholder="你就不想说点什么,或者占个板凳..."
                   @keyup="commentContentChange($event)">
              </div>
            </div>
            <div class="editor-tools" key="3">
              <!--<a href="" class="image" title="bold" @click.stop.prevent="insertContent('bold')">-->
                <!--<i class="iconfont icon-bold"></i>-->
              <!--</a>-->
              <!--<a href="" class="image" title="italicage" @click.stop.prevent="insertContent('italicage')">-->
                <!--<i class="iconfont icon-italic"></i>-->
              <!--</a>-->
              <a href="" class="emoji" title="emoji" @click.stop.prevent="emojiShow = !emojiShow">
                <i class="iconfont icon-smile"></i>
              </a>
              <a href="" class="image" title="image" @click.stop.prevent="insertContent('image')">
                <i class="iconfont icon-image"></i>
              </a>
              <a href="" class="link" title="link" @click.stop.prevent="insertContent('link')">
                <i class="iconfont icon-link"></i>
              </a>
              <a href="" alt="Markdown is support" class="code" title="code" @click.stop.prevent="insertContent('code')">
                <i class="iconfont icon-code"></i>
              </a>
              <a href="https://segmentfault.com/markdown" target="_blank" class="emoji" title="emoji">
                <i class="iconfont icon-markdown"></i>
              </a>
              <div class="emoji-box" v-show="emojiShow">
                <ul class="emoji-list">
                  <li class="item" @click="insertEmoji('😃')">😃</li>
                  <li class="item" @click="insertEmoji('😂')">😂</li>
                  <li class="item" @click="insertEmoji('😅')">😅</li>
                  <li class="item" @click="insertEmoji('😉')">😉</li>
                  <li class="item" @click="insertEmoji('😌')">😌</li>
                  <li class="item" @click="insertEmoji('😔')">😔</li>
                  <li class="item" @click="insertEmoji('😓')">😓</li>
                  <li class="item" @click="insertEmoji('😘')">😘</li>
                  <li class="item" @click="insertEmoji('😡')">😡</li>
                  <li class="item" @click="insertEmoji('😭')">😭</li>
                  <li class="item" @click="insertEmoji('😱')">😱</li>
                  <li class="item" @click="insertEmoji('😳')">😳</li>
                  <li class="item" @click="insertEmoji('😵')">😵</li>
                  <li class="item" @click="insertEmoji('🌚')">🌚</li>
                  <li class="item" @click="insertEmoji('👍')">👍</li>
                  <li class="item" @click="insertEmoji('👎')">👎</li>
                  <li class="item" @click="insertEmoji('💪')">💪</li>
                  <li class="item" @click="insertEmoji('🌹')">🌹</li>
                  <li class="item" @click="insertEmoji('💊')">💊</li>
                  <li class="item" @click="insertEmoji('🇨🇳')">🇨🇳</li>
                  <li class="item" @click="insertEmoji('🇺🇸')">🇺🇸</li>
                </ul>
              </div>
              <button type="submit"
                      class="submit"
                      @click="submitComment($event)">
                <span>回复</span>
                <i class="iconfont icon-release"></i>
              </button>
            </div>
        </div>
      </div>
    </form>
    <transition-group name="list" tag="span">
      <div class="list-box" v-if="comment.list.length && comment.list.length !== 0" key="1">
        <transition-group name="list" tag="ul" class="comment-list">
          <li class="comment-item"
              v-for="commentItem in comment.list"
              :id="`comment-item-${commentItem.id}`"
              :key="commentItem.id">
            <div class="cm-avatar">
              <a target="_blank"
                 rel="external nofollow"
                 :href="commentItem.site"
                 @click.stop="clickUser($event, commentItem.site)">
                <img :alt="commentItem.name || '匿名用户'"
                     :src="gravatar(commentItem.email) || '/images/anonymous.jpg'">
              </a>
            </div>
            <div class="cm-body">
              <div class="cm-header">
                <a class="user-name"
                   target="_blank"
                   rel="external nofollow"
                   :href="commentItem.site"
                   @click.stop="($event, commentItem.site)">
                  <span>{{ commentItem.name }}</span>
                </a>
                <div class="meta">
                  <span class="os" v-html="OSParse(commentItem.agent)"></span>
                  <span class="ua" v-html="UAParse(commentItem.agent)"></span>
                </div>
              </div>
              <div class="cm-content">
                <div class="reply-box" v-if="!!commentItem.pid">
                  <p class="reply-name">
                    <a href="" @click.stop.prevent="toSomeAnchorById(`comment-item-${commentItem.pid}`)">
                      <span></span>
                      <strong v-if="fondReplyParent(commentItem.pid)">{{ fondReplyParent(commentItem.pid) }}</strong>
                    </a>
                  </p>
                  <div
                    class="reply-content"
                    v-html="fondReplyParentContent(commentItem.pid).length > 150
                  ? fondReplyParentContent(commentItem.pid).slice(0, 150) + '...'
                  : fondReplyParentContent(commentItem.pid)" ></div>
                </div>
                <div v-html="marked(commentItem.content)"></div>
              </div>
              <div class="cm-footer">
                <div class="operate-box">
                  <a href="" class="like"
                     :class="{ liked: commentLiked(commentItem._id), actived: !!commentItem.likes }"
                     @click.stop.prevent="likeComment(commentItem)">
                    <i class="iconfont icon-like"></i>
                    <span>顶&nbsp;({{ commentItem.likes }})</span>
                  </a>
                  <a href="" class="reply" @click.stop.prevent="replyComment(commentItem)">
                    <i class="iconfont icon-reply"></i>
                    <span>回复</span>
                  </a>
                </div>
                <span class="floor">{{ commentItem.create_at | dateFormat('yyyy.MM.dd hh:mm')}}</span>
              </div>
            </div>
          </li>
        </transition-group>
      </div>
    </transition-group>
    <div class="loading" v-show="comment.fetching" key="2">
      <loadingCom></loadingCom>
    </div>
  </div>
</template>

<script>
  import markdown from '~/plugins/marked'
  import gravatar from '~/plugins/gravatar'
  // import { scrollTo } from '~/utils/scroll'
  import loadingCom from '~/components/pageLoading/pageLoading'
  import _ from '~/utils/underscore'
  import { UAParse, OSParse } from '~/utils/meta-parse'

  export default {
    name: 'fn-comment',
    data () {
      return {
        // 父级评论
        pid: 0,
        // 评论排序
        sortMode: 1,
        emojiShow: false,
        // 编辑器相关
        commentContentHtml: '',
        commentContentText: '',
        previewContent: '',
        previewMode: false,
        // 用户相关
        userCacheMode: false,
        userCacheEditing: false,
        user: {
          name: '',
          email: '',
          site: '',
          gravatar: null
        },
        // 用户历史数据
        likeComments: [],
        regexs: {
          email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
          url: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
        }
      }
    },
    props: {
      postId: {
        type: [String, Number],
        required: true
      }
    },

    fetch() {
    },

    components: { loadingCom },

    computed: {

      userAgent() {
        return this.$store.state.options.userAgent
      },
      comment() {
        return this.$store.state.article.comments
      },

      replyCommentSelf() {
        return this.comment.list.find(comment => Object.is(comment.id, this.pid))
      },

    },

    mounted () {

      this.initUser();

      this.loadCommentList()

      // window.onscroll = _.throttle(() => {
      //
      //   // 总高度
      //   let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      //
      //   // 滚动距离
      //   let scrolleTop = document.documentElement.scrollTop || document.body.scrollTop
      //
      //   // 窗口高度
      //   let windowHeight = window.innerHeight
      //
      //   if (scrollHeight -  scrolleTop - windowHeight <= 200) {
      //     if (!this.comment.pagination.total_page && !this.comment.fetching) {
      //       this.loadCommentList()
      //     } else if (this.haveMore && !this.comment.fetching) {
      //       this.loadCommentList({
      //         current_page: this.comment.pagination.current_page + 1
      //       })
      //     }
      //   }
      // }, 400)
    },
    destroyed() {
      window.onscroll = null
    },
    methods: {
      UAParse, OSParse,
      // markdown解析服务
      marked(content) {
        return markdown(content, null, false).html
      },
      // 头像服务
      gravatar(email) {
        if (!this.regexs.email.test(email)) return null;
        let gravatar_url = gravatar.url(email, {
          protocol: 'https'
        });
        return gravatar_url
      },
      // 初始化本地用户即本地用户的点赞历史
      initUser() {
        if (localStorage) {
          const user = localStorage.getItem('BLOG_USER');
          const likeComments = localStorage.getItem('LIKE_COMMENTS');
          if (likeComments) this.likeComments = JSON.parse(likeComments);
          if (user) {
            this.user = JSON.parse(user);
            this.updateUserGravatar();
            this.userCacheMode = true
          }
        }
      },
      // 更新当前用户头像
      updateUserGravatar() {
        const emailIsVerified = this.regexs.email.test(this.user.email);
        this.user.gravatar = emailIsVerified ? this.gravatar(this.user.email) : null
      },
      // 编辑器相关
      commentContentChange() {
        const html = this.$refs.markdown.innerHTML;
        const text = this.$refs.markdown.innerText;
        if (!Object.is(html, this.commentContentHtml)) {
          this.commentContentHtml = html
        }
        if (!Object.is(text, this.commentContentText)) {
          this.commentContentText = text
        }
      },
      updateCommentContent({ start = '', end = '' }) {
        if (!start && !end) return false;
        // 如果选中了内容，则把选中的内容替换，否则在光标位置插入新内容
        const selectedText = (window.getSelection || document.getSelection)().toString();
        const currentText = this.$refs.markdown.innerText;
        if (!!selectedText) {
          const newText = currentText.replace(selectedText, start + selectedText + end);
          this.$refs.markdown.innerText = newText
        } else {
          this.$refs.markdown.innerText = this.$refs.markdown.innerText += (start + end);
          this.$refs.markdown.scrollTop = this.$refs.markdown.scrollHeight
        }
        this.commentContentChange()
      },
      clearCommentContent(content) {
        this.commentContentHtml = '';
        this.$refs.markdown.innerHTML = this.commentContentHtml;
        this.commentContentChange()
      },
      insertContent(type) {
        const contents = {
          // bold: {
          //   start: `**`,
          //   end: `**`
          // },
          // italicage: {
          //   start: `*`,
          //   end: `*`
          // },
          image: {
            start: `![`,
            end: `]()`
          },
          link: {
            start: `[`,
            end: `]()`
          },
          code: {
            start: '\n```javascript\n',
            end: '\n```'
          }
        };
        this.updateCommentContent(contents[type])
      },

      insertEmoji(emoji) {
        this.updateCommentContent({ end: emoji })
      },

      // 切换预览模式
      togglePreviewMode() {
        this.previewContent = this.marked(this.commentContentText);
        this.previewMode = !this.previewMode
      },

      // 评论排序
      async sortComemnts (sort) {
        if (!Object.is(this.sortMode, sort)) {
          this.sortMode = sort;
          await this.loadCommentList();
          setTimeout(() => {
            this.toSomeAnchorById('comment-box')
          }, 300)
        }
      },

      // 点击用户
      clickUser(event, site) {
        if (!site) event.preventDefault()
      },

      // 跳转到某条指定的id位置
      toSomeAnchorById(id) {
        const targetDom = document.getElementById(id);
        if (targetDom) {
          let isToEditor = Object.is(id, 'post-box');
          let isCommentBox = Object.is(id, 'comment-box');
          scrollTo(targetDom, 500, { offset: isToEditor ? -110 : isCommentBox ? -70 : -300 });
          // 如果是进入编辑模式，则需要激活光标
          if (isToEditor) {
            let p = this.$refs.markdown;
            let s = window.getSelection();
            let r = document.createRange();
            r.setStart(p, p.childElementCount);
            r.setEnd(p, p.childElementCount);
            s.removeAllRanges();
            s.addRange(r)
          }
        }
      },

      // 回复评论
      replyComment(comment) {
        this.pid = comment.id;
        this.toSomeAnchorById('post-box');
      },
      // 取消回复
      cancelCommentReply() {
        this.pid = 0;
      },
      // 找到回复来源
      fondReplyParent(pid) {
        const parent = this.comment.list.find(comment => Object.is(comment.id, pid));
        return parent ? parent.name : null;
      },

      // 回复来源内容
      fondReplyParentContent (pid) {
        const parent = this.comment.list.find(comment => Object.is(comment.id, pid));
        const content = parent ? parent.content : null;
        return this.marked(content);
      },

      // 点赞某条评论
      likeComment(comment) {
        if (this.commentLiked(comment._id)) return false;
        this.$store.dispatch('likeComment', { _id: comment._id })
          .then(data => {
            this.likeComments.push(comment._id);
            localStorage.setItem('LIKE_COMMENTS', JSON.stringify(this.likeComments))
          })
          .catch(err => {
            console.warn('评论点赞失败', err)
          })
      },
      // 获取某条评论是否被点赞
      commentLiked(comment_id) {
        return this.likeComments.includes(comment_id);
      },

      // 获取评论列表
      async loadCommentList(params = {}) {
        params.sort = this.sortMode;
        const res = await this.$store.dispatch('loadCommentsByPostId', {
          ...params,
          post_id: this.postId
        })
      },

      // async pageLoad (params = {}) {
      //   await this.loadCommentList(params)
      //   setTimeout(() => {
      //     this.toSomeAnchorById('comment-box')
      //   }, 500)
      // },

      // 提交评论
      async submitComment(event) {
        // 为了使用原生表单拦截，不使用事件修饰符
        event.preventDefault();

        if (!this.user.name) return alert('名字？');
        if (!this.user.email) return alert('邮箱？');
        if (!this.regexs.email.test(this.user.email)) return alert('邮箱不合法');
        if (this.user.site && !this.regexs.url.test(this.user.site)) return alert('链接不合法');
        if(!this.commentContentText || !this.commentContentText.replace(/\s/g, '')) return alert('内容？');
        const lineOverflow = this.commentContentText.split('\n').length > 36;
        const lengthOverflow = this.commentContentText.length > 1000;
        if(lineOverflow || lengthOverflow) return alert('内容需要在1000字/36行以内');
        if (!this.user.site) delete this.user.site;

        const res = await this.$store.dispatch('postComment', {
          pid: this.pid,
          post_id: this.postId,
          content: this.commentContentText,
          name: this.user.name,
          email: this.user.email,
          site: this.user.site,
          agent: this.userAgent
        });
        if (res.code === 200) {
          this.previewMode = false;
          this.userCacheMode = true;
          this.cancelCommentReply();
          this.clearCommentContent();
          this.$nextTick(() => {
            // scrollTo(document.querySelector(`#comment-item-${res.result.id}`), 200, { offset: 0 })
          });
          localStorage.setItem('BLOG_USER', JSON.stringify(this.user))
        } else alert('操作失败')
      }
    }
  }
</script>

<style lang="scss">
  .cm-content,
  .reply-preview {
    font-size: 1em;
    line-height: 2em;
    word-wrap: break-word;

    a {
      text-decoration: underline;
    }

    img {
      margin: .5rem 0;
      max-width: 100%;
      border-radius: 2px;
    }

    p {
      margin: 0;
    }

    code {
      color: #bd4147;
      padding: .3em .5em;
      margin: 0 .5em;
      border-radius: 4px;
      background-color: rgba(36,41,46,.12);
    }

    pre {
      overflow: auto;
      font-size: 85%;
      line-height: 1.45;
      background-color: #f7f7f7;
      border-radius: 3px;
      width: 100%;

      > code {
        margin: 0;
        padding: 1em;
        float: left;
        width: 100%;
        height: 100%;
        display: block;
        line-height: 1.6em;
        background-color: transparent;
      }
    }
  }

  #comment-box {
    position: relative;
    padding: 1rem 0;
    font-family: Microsoft YaHei,Arial,Helvetica,sans-serif;
    .loading {
      font-weight: bold;
      text-align: center;
      height: 7rem;
      line-height: 7rem;
    }
    .list-box {
      margin-top: 1rem;
      padding: 1rem;
      background-color: rgba(255, 255, 255, 0.8);
      box-shadow: 0 0 14px 2px #ebebeb;
      border-radius: 2px;
      > .comment-list {
        padding: 0;
        margin: 0;
        list-style-type: none;

        > .comment-item {
          position: relative;
          padding: .6em 0 .6em 3.6em;
          border-bottom: 1px dashed var(--border-color);
          &:last-child {
            border: 0;
          }

          > .cm-avatar {
            display: block;
            position: absolute;
            left: 0;
            top: 1.2rem;

            > a {
              display: block;
              width: 36px;
              height: 36px;

              > img {
                width: 100%;
                height: 100%;
                transition: transform .5s ease-out;
                border-radius: 50%;
              }
            }
          }

          > .cm-body {
            display: block;
            width: 100%;
            height: 100%;
            padding: .5rem;

            > .cm-header {
              display: flex;
              justify-content: space-between;
              position: relative;

              > .meta {
                color: #a6a6a6;
                font-size: 12px;
                display: inline-block;
                .iconfont {
                  margin-right: 2px;
                  &.icon-chrome-fill {
                    /*font-size: 12px;*/
                  }
                }
                span {
                  margin-left: 4px;
                }
              }

              > .user-name {
                color: #666;
                font-weight: bold;
                font-size: .85rem;
                margin-right: .3rem;
                img {
                  border-radius: 4px;
                  margin-right: .2rem;
                }
                &:hover {
                  text-decoration: underline;
                }
              }
            }

            > .cm-content {
              font-size: 12px;
              color: #666;
              > .reply-box {
                padding: .8rem;
                border-left: 3px dashed #eee;
                >.reply-name {
                  color: #666;
                  font-weight: bold;
                  font-size: .85rem;
                  a {
                    text-decoration: none;

                    &:hover {
                      text-decoration: underline;
                    }
                  }
                }
              }
            }

            > .cm-footer {
              display: flex;
              align-items: center;
              position: relative;
              justify-content: space-between;
              > .floor {
                color: #a6a6a6;
                font-size: .85rem;
                font-family: Arial;
                display: inline-block;
              }
              .operate-box {
                flex: 1;
                > .reply,
                > .like {
                  font-size: .8em;
                  margin-right: 1em;
                }
                > .reply,
                > .like {
                  opacity: .8;

                  &:hover {
                    color: #EA6F5A;
                  }

                  &.liked {
                    color: #EA6F5A;
                    font-weight: bold;
                  }

                }

                >.reply {
                  display: none;

                  &:hover {
                    color: #5ab95c;
                  }
                }
              }
            }
          }
          &:hover {
            .cm-body > .cm-footer > .operate-box > .reply {
              display: inline-block;
            }
          }
        }
      }
    }

    > .post-box {
      display: block;
      padding: 1rem;
      background-color: hsla(0, 0%, 100%, 0.8);
      box-shadow: 0 0 14px 2px #ebebeb;
      border-radius: 2px;

      > .editor-box {
        width: 100%;
        border-radius: 4px;
        border: 1px solid rgba(36, 41, 46, 0.12);
        > .user {
          display: flex;
          width: 100%;
          height: 2em;
          line-height: 2em;

          > .name,
          > .email,
          > .site {
            flex-grow: 1;
            > input {
              width: 100%;
              padding: 10px .5rem;
              background: transparent;
              border: none;
              resize: none;
              outline: none;
              max-width: 100%;
              font-size: .775rem;
              border-bottom: 1px dashed #dedede;

              &:hover {
                border-color: #999;
              }

              &:focus {
                border-color: #999;
              }
            }
          }
        }
        > .editor {
          flex-grow: 1;
          position: relative;
          .will-reply {
            font-size: .95em;
            color: #999;
            > .reply-user {
              display: flex;
              justify-content: space-between;
              padding: .4rem 1rem;
              height: 2.6em;
              line-height: 2.6em;
              .cancel {
                &:hover {
                  color: #db384c;
                }
              }
            }
            > .reply-preview {
              max-height: 10em;
              overflow: auto;
              padding: .5rem 1rem;
              border-bottom: 1px solid #eee;
            }
          }
          .markdown {
            position: relative;
            overflow: hidden;
            > .markdown-editor {
              min-height: 8em;
              max-height: 30em;
              overflow: auto;
              outline: none;
              padding: .8em .5em;
              cursor: auto;
              font-size: .85em;
              line-height: 1.8em;
              border-bottom: 1px dashed rgba(36,41,46,.12);
              &:empty:before{
                content: attr(placeholder);
                color: grey;
              }
              &:focus{
                content: none;
              }
            }
          }
          .editor-tools {
            height: 2rem;
            line-height: 2rem;
            position: relative;
            color: #666;
            > .emoji-box {
              padding: .5rem;
              z-index: 999;
              border: 1px solid #eee;
              background-color: #fff;
              position: absolute;

              > .emoji-list {
                list-style: none;
                font-size: 1.0em;
                display: flex;
                flex-wrap: nowrap;
                > .item {
                  padding: 0 .2em;
                  cursor: pointer;
                }
              }
            }

            > .emoji,
            > .image,
            > .link,
            > .code,
            > .preview {
              width: 2em;
              height: auto;
              text-align: center;
              display: inline-block;

              &:hover {
                background: rgba(0, 0, 0, 0.12);
              }
            }

            > .submit {
              float: right;
              color: #999;
              height: 100%;
              position: relative;
              display: inline-block;
              font-size: 14px;
              font-weight: 500;
              line-height: 20px;
              cursor: pointer;
              user-select: none;
              border: none;
              appearance: none;
              background: transparent;
              span {
                margin-right: .1rem;
              }
              &:hover {
                background: rgba(0, 0, 0, 0.12);
              }
            }
          }
        }
      }
    }
  }
</style>
