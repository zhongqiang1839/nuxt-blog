<template>
  <div class="aside">
    <section class="cards-view one-word">
      <div class="card-header">
        每日一句
      </div>
      <div class="card-body">
        有些话，适合藏在心里，有些痛苦，适合无声无息的忘记，有些回忆，只适合偶尔拿出来回味。
      </div>
    </section>
    <!--<section class="cards-view">-->
      <!--<header>-->
        <!--<div class="avator">-->
          <!--<img src="/images/user.jpeg" alt="" />-->
        <!--</div>-->
        <!--<h2 class="user-name">-->
          <!--<a href=""> 小强哥 </a>-->
        <!--</h2>-->
      <!--</header>-->
    <!--</section>-->
    <section class="cards-view">
      <div class="card-header">
        热门标签
      </div>
      <div class="card-body">
        <div class="tag-list">
          <a class="tag-item"  v-for="item in tagslist" :key="item._id" :href="`/tag/${item._id}`">{{item.name}}</a>
        </div>
      </div>
    </section>
    <section class="cards-view">
      <div class="card-header">
        文章分类
      </div>
      <div class="card-body">
        <div class="tag-list">
          <a class="tag-item">前端技术</a>
          <a class="tag-item">后端技术</a>
          <a class="tag-item">生活情感</a>
          <a class="tag-item">人在路上</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'fn-tags',
    computed: {
      tagslist () {
        return this.$store.state.article.tags
      },
    },

    watch: {
    },

    methods: {
    },

    directives: {
    },

    mounted () {

    }
  }
</script>

<style lang="less" scoped>

  .aside {
    position: relative;
  }

  .cards-view {
    position: relative;
    margin-bottom: .5rem;
    padding: 0 16px;
    background-color: hsla(0,0%,100%,0.8);
    box-shadow: 0 0 14px 2px #ebebeb;
    border-radius: 2px;
    .card-header {
      padding: 12px 0 6px;
      border-bottom: 1px solid #eee;
      font-weight: 700;
      .iconfont {
        color: rgba(0,0,0,0.25);
        margin-right: 4px;
      }
      color: #666;
    }
  }

  .card-body {
    padding: 16px 0;
  }

  .tag-list {
    overflow: auto;
  }

  .tag-item {
    display: inline-block;
    margin: 0 8px 8px 0;
    padding: 4px 8px;
    border: 1px solid #e6e6e6;
    font-size: 12px;
    border-radius: 4px;
    transition: all .3s ease;
    color: #333;
  }
  
  .one-word {
    .card-body {
      color: #999;
      line-height: 1.6;
    }
  }
  
  header {
    .avator {
      background-color: #fff;
      text-align: center;
      padding: 10px 0 0 0;
      img {
        display: inline-block;
        padding: 1px;
        width: 6rem;
        height: 6rem;
        border: 1px solid rgba(10,10,10,.4);
        border-radius: 50%;
      }
    }
    .user-name {
      letter-spacing: 1px;
      font-weight: 400;
      line-height: 1.4;
      text-align: center;
      color: #607d8b;
      a {
        display: block;
        letter-spacing: 0;
        line-height: 2.4;
        white-space: nowrap;
        transition: color .15s;
      }
    }
    .slogn-box {
      line-height: 1.5;
      opacity: .618;
    }
  }
  
</style>
