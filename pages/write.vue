<template>
  <div>
    <header class="editor-header">
      <input type="text" class="title-input" v-model="articleTitle" placeholder="请输入标题...">
      <div class="right-box">
        <span class="tag" >
          <span @click="isSubmitshow = !isSubmitshow">发布</span>
          <div class="tag-box" v-if="isSubmitshow">
            <i>标签</i>
            <div class="tag-list">
              <div class="tag-item"
                 :class="{'active': item.isActive}"
                 v-for="(item, index) in tagslist"
                 @click="toggleTags(item)"
                 :key="item._id"
              >
                {{item.name}}
              </div>
              <div class="sub-btn" @click="submitComment($event)">确定并发布</div>
            </div>
          </div>
        </span>
        <img src="images/user.jpeg" alt="">
      </div>
    </header>
    <div class="editor-tools">
      <a href="" class="image" title="bold" @click.stop.prevent="insertContent('bold')">
        <i class="iconfont icon-bold"></i>
      </a>
      <a href="" class="image" title="italicage" @click.stop.prevent="insertContent('italicage')">
        <i class="iconfont icon-italic"></i>
      </a>
      <a href="" class="emoji" title="emoji" @click.stop.prevent>
        <i class="iconfont icon-smile"></i>
        <div class="emoji-box">
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
      </a>
      <a href="" class="image" title="image" @click.stop.prevent="insertContent('image')">
        <i class="iconfont icon-image"></i>
      </a>
      <a href="" class="link" title="link" @click.stop.prevent="insertContent('link')">
        <i class="iconfont icon-link"></i>
      </a>
      <a href="" class="code" title="code" @click.stop.prevent="insertContent('code')">
        <i class="iconfont icon-code"></i>
      </a>
    </div>
    <section class="container">
      <div class="markdown">
        <div class="markdown-editor"
             ref="markdown"
             contenteditable="true"
             placeholder="写下你的文章..."
             @keyup="commentContentChange($event)">
        </div>
      </div>
      <div class="markdown-preview">
        <div class="content-wrapper">
          <div class="content-html markdown-body" v-html="marked(commentContentHtml)"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import markdown from '~/plugins/marked'

export default {

  layout: 'write',

  data() {
    return {
      articleTitle: '',
      commentContentHtml: '',
      isSubmitshow: false,
      tags: []
    }

  },

  computed: {
    tagslist () {
      let tags = this.$store.state.article.tags;
      tags.map((item, index) => {
        item.isActive = index === 0;
      })
      return tags;
    },
  },

  methods: {
    //切换标签
    toggleTags(item) {
      this.tagslist.map((temp) => {
        temp.isActive = item.id === temp.id;
      })
      this.$forceUpdate();
    },
    async submitComment(event) {
      event.preventDefault()
      if(!this.articleTitle || !this.articleTitle.replace(/\s/g, '')) return alert('标题呢？');
      if(!this.commentContentHtml || !this.commentContentHtml.replace(/\s/g, '')) return alert('内容呢？');
      let tagitem = this.tagslist.filter((item) => item.isActive)[0];
      let res = await this.$store.dispatch('postArticle', {
        title: this.articleTitle,
        content: this.commentContentHtml,
        description: '描述',
        keyword: '关键词',
        tag: tagitem._id,
      })
      console.log(res);
      if(res.code === 0) {
        alert('文章写入成功');
      } else {
        alert('文章写入失败')
      }
    },
    // markdown解析服务
    marked(content) {
      return markdown(content, null, false).html
    },
    // 编辑器相关
    commentContentChange() {
      const html = this.$refs.markdown.innerHTML
      const text = this.$refs.markdown.innerText
      if (!Object.is(html, this.commentContentHtml)) {
        this.commentContentHtml = html
      }
      if (!Object.is(text, this.commentContentHtml)) {
        this.commentContentHtml = text
      }
    },
    updateCommentContent({ start = '', end = '' }) {
      if (!start && !end) return false
      // 如果选中了内容，则把选中的内容替换，否则在光标位置插入新内容
      const selectedText = (window.getSelection || document.getSelection)().toString()
      const currentText = this.$refs.markdown.innerText
      if (!!selectedText) {
        const newText = currentText.replace(selectedText, start + selectedText + end)
        this.$refs.markdown.innerText = newText
      } else {
        this.$refs.markdown.innerText = this.$refs.markdown.innerText += (start + end)
        this.$refs.markdown.scrollTop = this.$refs.markdown.scrollHeight
      }
      this.commentContentChange()
    },
    clearCommentContent(content) {
      this.commentContentHtml = ''
      this.$refs.markdown.innerHTML = this.commentContentHtml
      this.commentContentChange()
    },
    insertContent(type) {
      const contents = {
        bold: {
            start: `**`,
            end: `**`
        },
        italicage: {
            start: `*`,
            end: `*`
        },
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
      }
      this.updateCommentContent(contents[type])
    },

    insertEmoji(emoji) {
      this.updateCommentContent({ end: emoji })
    },
  },
  mounted() {

  },

  components: {
  }
}
</script>

<style lang="less" scoped>

.editor-header {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 1.4rem;
  height: 5.334rem;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  z-index: 100;
  .title-input {
    margin: 0;
    padding: 0;
    font-size: 2rem;
    font-weight: 700;
    color: #000;
    border: none;
    outline: none;
    flex: 1;
  }
  .right-box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    span {
      font-size: 1.334rem;
      white-space: nowrap;
      color: #007fff;
      cursor: pointer;
      user-select: none;
      padding: 0 2rem;
    }
    img {
      width: 2.667rem;
      height: 2.667rem;
      border-radius: 50%;
      background-color: #eee;
      background-position: 50%;
      background-size: cover;
      background-repeat: no-repeat;
      cursor: pointer;
      margin-left: 10px;
    }
    > .tag {
      position: relative;
    }
    .tag-box {
      position: absolute;
      top: 2.3rem;
      left: -10rem;
      width: 250px;
      padding: .5rem;
      background-color: #fff;
      color: #909090;
      border: 1px solid #ddd;
      border-radius: 2px;
      box-shadow: 0 1px 2px #f1f1f1;
      cursor: default;
      user-select: none;
      z-index: 100;
    }
  }

}

.card-body {
  padding: 16px 0;
}

.tag-list {
  overflow: auto;
}

.sub-btn {
  display: block;
  margin: 0 auto;
  padding: .2rem 0.8rem;
  text-align: center;
  color: #007fff;
  background: #fff;
  border: 1px solid currentColor;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  transition: all .2s;
}


.tag-item {
  display: inline-block;
  margin: 0 8px 8px 0;
  padding: 4px 8px;
  border: 1px solid #e6e6e6;
  font-size: 12px;
  border-radius: 4px;
  &.active {
    color: #007fff;
    border-color: rgba(0,127,255,.15);
    background-color: rgba(0,127,255,.05);
  }
}


.container {
  display: flex;
  position: absolute;
  top: 5.334rem;
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  height: 100vh;
  > .markdown-preview {
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: #fff;
    overflow: hidden;
    flex: 1 1 50%;
    height: 100%;
    overflow-y: auto;
    border-left: 1px solid #ddd;
    padding-top: 2rem;
    .content-wrapper {
      flex: 1 1 auto;
      position: relative;
      overflow-y: auto;
      .content-html {
        padding: .8em 2em 12em;
        font-size: 1.334rem;
        line-height: 1.7;
        word-break: break-word;
        overflow-x: hidden;
      }
    }
  }
}

.markdown {
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  flex: 1 1 50%;
  height: 100%;
  overflow-y: auto;
  > .markdown-editor {
    min-height: 100vh;
    overflow: auto;
    outline: none;
    padding: 2rem;
    cursor: auto;
    font-size: .95em;
    line-height: 1.8em;
    border-radius: 4px;
    letter-spacing: 3px;
    &:empty:before{
      content: attr(placeholder);
      color: grey;
    }
  }
}
.editor-tools {
  position: fixed;
  top: 4rem;
  left: 1.5rem;
  z-index: 100;
  > .emoji {
    > .emoji-box {
      display: none;
      position: relative;
      top: 0;
      left: 0;
      width: 250px;
      padding: .5rem;
      background-color: #fff;
      z-index: 999;

      > .emoji-list {
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 1.3em;
        display: flex;
        flex-wrap: wrap;

        > .item {
          padding: 0 .4em;
          cursor: pointer;

          &:hover {
            background: rgba(0, 0, 0, 0.12);
          }
        }
      }
    }

    &:hover {
      > .emoji-box {
        display: block;
      }
    }
  }

  > .emoji,
  > .image,
  > .link,
  > .code,
  > .preview {
    width: 2em;
    height: 2em;
    text-align: center;
    display: inline-block;

    &:hover {
      background: rgba(0, 0, 0, 0.12);
    }
  }

  > .submit {
    float: right;
    border: 0;
    background: none;
    span {
      margin-right: .5rem;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.12);
    }
  }
}

</style>
