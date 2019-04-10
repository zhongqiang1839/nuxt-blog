<template>
  <div>
    <header class="editor-header">
      <input type="text" class="title-input" v-model="articleTitle" placeholder="请输入标题...">
      <div class="right-box">
        <span class="thumbnail">
          <div class="menu-view">
            <input type="text" placeholder="填入封面大图链接url..." v-model="thumbnail">
            <span :class="['iconfont', thumbnail ? 'icon-image-fill': 'icon-image']"></span>
          </div>
        </span>
        <span class="tag" >
          <span @click="isSubmitshow = !isSubmitshow">发布 <i class="iconfont" :class="isSubmitshow ? 'icon-up' : 'icon-down'"></i></span>
          <div class="tag-box" v-if="isSubmitshow">
            <i>文章来源</i>
            <div class="tag-item"
                 v-for="(item, index) in source"
                 :class="{'active': item.isActive}"
                 @click="toggleTypes(item)"
                 :key="item.value"
            >
              {{item.label}}
            </div>
            <i>文章分类</i>
            <div class="tag-list">
              <div class="tag-item"
                   v-for="(item, index) in categorys"
                   :class="{'active': item.isActive}"
                   @click="toggleCategory(item)"
                   :key="item.value"
              >
                {{item.label}}
              </div>
            </div>
            <i>文章标签</i>
            <div class="tag-list">
              <div class="tag-item"
                   :class="{'active': item.isActive}"
                   v-for="(item, index) in tagslist"
                   @click="toggleTags(item)"
                   :key="item._id"
              >
                {{item.name}}
              </div>
            </div>
            <div class="panel">
              <input type="text" v-model="tagName" placeholder="添加 1 个新标签">
            </div>
            <div class="btn-wrapper">
              <div class="sub-btn cancel" @click="isSubmitshow = false">取消</div>
              <div class="sub-btn" @click="submitComment($event)">确定并发布</div>
            </div>
          </div>
        </span>
        <nuxt-link to="/">
          <img src="/images/avatar/555.jpg" alt="">
        </nuxt-link>
      </div>
    </header>
    <div class="own-container">
      <no-ssr><mavon-editor :toolbars="markdownOption" :ishljs="true" ref=md @imgAdd="$imgAdd" v-model="handbook"/></no-ssr>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ARTICLE_SOURCE, FN_CATEGORYS } from '~/utils/constant'
import config from './../utils/config';
import { text } from "~/filters";

export default {
  layout: 'write',
  components: {
  },
  computed: {
    tagslist () {
      let tags = this.$store.state.article.tags;
      if(tags.length) {
        tags.map((item, index) => {
          item.isActive = index === 0;
        })
      }
      return tags
    },
  },
  data() {
    return {
      thumbnail: '',
      articleTitle: '',
      isSubmitshow: false,
      type: '',
      tags: [],
      tagName: '',
      source: ARTICLE_SOURCE,
      categorys: FN_CATEGORYS,
      markdownOption:{
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      handbook:"> 文章简介\n\n" + "————————————————\n" + "\n" + "正文"
    }
  },
  methods: {
    // 绑定@imgAdd event
    $imgAdd(pos, $file){
      // 第一步.将图片上传到服务器.
      let formdata = new FormData();
      formdata.append('image', $file);
      axios({
        url: config.serverIp + '/api/upload',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then(({data}) => {
        console.log(data.filename);
        this.$refs.md.$img2Url(pos, `${config.serverIp}/uploads/${data.filename}`);
      })
    },
    //切换标签
    toggleTags(item) {
      item.isActive = !item.isActive;
      this.$forceUpdate();
    },
    toggleTypes(item) {
      this.source.map(temp => temp.isActive = item.value === temp.value);
      this.$forceUpdate();
    },
    toggleCategory(item) {
      this.categorys.map(temp => temp.isActive = item.value === temp.value);
      this.$forceUpdate();
    },
    async submitComment(event) {
      event.preventDefault();
      if(!this.articleTitle || !this.articleTitle.replace(/\s/g, '')) return alert('标题呢？');
      if(!this.handbook || !this.handbook.replace(/\s/g, '')) return alert('内容呢？');
      let tagArr = this.tagslist.map((item) => {
        if(item.isActive) return item._id;
      }).filter(item =>  item !== undefined);
      let sourceItem = this.source.filter(item => item.isActive)[0];
      let categoryItem = this.categorys.filter(item => item.isActive)[0];
      let [description, content] = this.handbook.split('————————————————');
  
      let res = await this.$store.dispatch('postArticle', {
        title: this.articleTitle,
        content: content.toString(),
        description: description.toString(),
        keyword: tagArr.join(','),
        tagName: this.tagName,
        tag: tagArr,
        source: sourceItem.value,
        type: categoryItem.value,
        thumb: this.thumbnail
      });
      if(res.code === 200) {
        alert('文章写入成功');
        this.clearCommentContent();
      } else {
        alert('文章写入失败')
      }
    },
  },
  mounted() {

  },

}
</script>

<style lang="less" scoped>
  
  .own-container {
    .v-note-wrapper {
      min-height: 100vh!important;
      margin-top: 0!important;
    }
  }
  
  .editor-header {
    display: flex;
    align-items: center;
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
        padding: 0 1rem;
      }
      img {
        width: 3.6rem;
        height: 3.6rem;
        border-radius: 50%;
        background-color: #eee;
        background-position: 50%;
        background-size: cover;
        background-repeat: no-repeat;
        cursor: pointer;
        margin-left: 10px;
        border: 2px solid #000;
      }
      > .thumbnail {
        position: relative;
        .art_desc {
          height: 5.334rem;
          width: 18rem;
          border-left: 1px solid #888;
          border-top: none;
          border-bottom: none;
        }
        .iconfont {
          font-size: 2rem;
          color: #2a2b33!important;
        }
      }
      > .tag {
        position: relative;

        .iconfont {
          font-weight: bolder;
        }

        .panel {
          padding: .2rem;
          width: 100%;
          font-size: 1.2rem;
          white-space: nowrap;
          color: #909090;
          background-color: #fff;
          border-radius: 2px;
          cursor: default;
          user-select: none;
          z-index: 100;
          input {
            padding: .2em 0;
            width: 100%;
            font-size: .6em;
            border: none;
            border-bottom: 1px solid #f1f1f1;
            border-radius: 0;
            outline: none;
          }
        }

      }
      .tag-box {
        position: absolute;
        top: 2.3rem;
        left: -16rem;
        width: 316px;
        padding: .5rem;
        background-color: #fff;
        color: #909090;
        border: 1px solid #ddd;
        border-radius: 2px;
        box-shadow: 0 1px 2px #f1f1f1;
        cursor: default;
        user-select: none;
        z-index: 9999;
        transition: all .4s ease-in;
        i {
          display: block;
          font-style: normal;
          font-size: 18px;
          border-left: 2px solid #999;
          padding-left: 8px;
          margin: 20px 0;
        }
      }
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

    .card-body {
      padding: 16px 0;
    }

    .tag-list {
      overflow: auto;
      display: flex;
      flex-wrap: wrap;
    }


    .btn-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 20px;
      .sub-btn {
        display: block;
        margin: 0 auto;
        font-size: 16px;
        text-align: center;
        padding: 4px 8px;
        color: #007fff;
        background: #fff;
        outline: none;
        cursor: pointer;
        margin-top: 6px;
        &.cancel {
          color: #999;
        }
      }
    }

  }


  .menu-view .search {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    /*left: 0;*/
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: all 1s;
    z-index: 4;
  }
  .menu-view .search:hover {
    cursor: pointer;
  }
  .menu-view .search::before {
    content: "";
    position: absolute;
    margin: auto;
    top: 12px;
    right: 0;
    bottom: 0;
    left: 10px;
    width: 8px;
    height: 2px;
    background: #666;
    transform: rotate(45deg);
    transition: all .5s;
  }
  .menu-view .search::after {
    content: "";
    position: absolute;
    margin: auto;
    top: -5px;
    right: 0;
    bottom: 0;
    left: -5px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid #666;
    transition: all .5s;
  }
  .menu-view input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    /*left: 0;*/
    width: 80px;
    /*height: 50px;*/
    outline: none;
    border: none;
    color: #666;
    /*padding: 0 80px 0 20px;*/
    transition: all 1s;
    opacity: 0;
    z-index: 5;
    font-weight: bolder;
    letter-spacing: 0.1em;
  }
  .menu-view input:hover {
    cursor: pointer;
  }
  .menu-view input:focus {
    width: 250px;
    opacity: 1;
    cursor: text;
  }
  .menu-view input:focus ~ .search {
    right: 0;
    z-index: 6;
  }
  .menu-view input::placeholder {
    color: #999;
    opacity: 0.5;
    font-weight: bolder;
  }
  
</style>
