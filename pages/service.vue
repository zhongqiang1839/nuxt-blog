<template>
  <section class="container">
    <div class="fe-service">
      <div class="fe-service__img">
        <img src="/service/service.png" alt="">
      </div>
      <div class="fe-service__btn">
        <a class="fe-service__link"
           href="mailto:zhongqiang1839@163.com?subject=Hi！小强哥, 久仰大名！&cc=&body=
         我有一个需求:%0d%0a
        -需求简介:%0d%0a
        -需求文档:%0d%0a
        -预算周期:%0d%0a
        -预算金额:
        ">立即告诉我</a>
      </div>
      <ul class="fe-service__con">
        <li class="fe-service__item">
          <span class="iconfont icon-wechat-fill"></span>
          <h3>WeChat</h3>
          <p>H5开发</p>
          <p>公众号开发</p>
          <p>小程序开发</p>
        </li>
        <li class="fe-service__item">
          <span class="iconfont icon-qianduan"></span>
          <h3>Web Client</h3>
          <p>Vue 开发</p>
          <p>React 开发</p>
        </li>
        <li class="fe-service__item">
          <span class="iconfont icon-app"></span>
          <h3>Application</h3>
          <p>敬请期待...</p>
        </li>
        <li class="fe-service__item">
          <span class="iconfont icon-zixun"></span>
          <h3>技术咨询</h3>
          <p>敬请期待...</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>

export default {

  head () {
    return {
      title: this.title,
    }
  },

  fetch ({ store }) {},

  data () {
    return {
      current_page: 1,
      title: '接单了'
    }
  },

  computed: {},
  methods: {
    loadMore() {
    }
  },
  mounted() {
  },
  components: {
  }
}
</script>

<style lang="less" scoped>

.fe-service {

  &__img {
    position: relative;
    display: block;
    width: 100%;
    object-fit: cover;
    img {
      width: 100%;
      height: 100%;
    }
    margin-bottom: 1rem;
  }

  &__btn {
    height: 3em;
    width: 100%;
    display: flex;
    justify-content: center;
    a {
      display: block;
      margin: 0 auto;
    }
    margin-bottom: 1rem;
  }

  &__link {
    position: absolute;
    background: var(--theme-color);
    border-radius: 20px;
    color: #fff;
    width: 10rem;
    height: 3em;
    line-height: 3rem;
    text-align: center;
    letter-spacing: 1px;
    font-weight: 700;
    text-transform: uppercase;
    margin: 0 auto;
  }

  &__con {
	  width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    list-style: none;
  }

  &__item {

    flex: 1;
    height: 200px;

    text-align: center;
    background: rgba(255, 255, 255, 1);
    border-radius: .4em;
    margin: 1rem 1%;
    padding-top: 1rem;
    transition: background-color .25s linear;

    &:hover {
      background: rgba(255, 255, 255, 0.4);
    }

    .iconfont {
      font-size: 3rem;
    }

    h3 {
      font-size: 1.3em;
      font-weight: 700;
      padding: 1rem 0;
    }

    p {
      line-height: 1.8;
    }

  }

  &__slogn {
  }

}

@media (max-width: 375px) {
  .fe-service__item {
    width: 100%;
    flex: none;
    margin: 0;
    border-bottom: 1px solid #eee;
  }
}

</style>
