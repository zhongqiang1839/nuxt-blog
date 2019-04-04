<template>
  <section class="container">
    <!--<div class="avator-box">-->
      <!--<img src="/images/user.jpeg" alt="">-->
      <!--<p>Jason</p>-->
      <!--&lt;!&ndash;<h2 class="slogan">愿你在迷茫时，坚信你的珍贵；爱你所爱，行你所行。听从你心，无问西东。</h2>&ndash;&gt;-->
    <!--</div>-->
    <ul class="introduce">
      <li>
        <i class="iconfont icon-user"></i>
        <p>
          Jason, 原名: 冯忠强，目前工作在上海,就职于 康成投资(中国), 专注web开发领域...
        </p>
      </li>
      <li>
        <i class="iconfont icon-skill"></i>
        <p>
          javascript, Vue, CSS, nodejs, 小程序，轻应用...
        </p>
      </li>
	    <li>
		    <i class="iconfont icon-link"></i>
		    <p>
			    业余LOL 5000场大乱斗玩家， 业余吃鸡...
		    </p>
	    </li>
      <li>
        <i class="iconfont icon-tag"></i>
        <p>
          愿你在迷茫时，坚信你的珍贵；爱你所爱，行你所行。听从你心，无问西东。
        </p>
      </li>
      <li>
        <i class="iconfont icon-mail"></i>
        <p>
          zhongqiang1839@163.com
        </p>
      </li>

    </ul>
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
      title: '关于我'
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

.container {
  /*min-height: 100vh;*/
}

.avator-box {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  img {
    margin: 0 auto;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid var(--border-color);
  }
  p {
    font-family: Damion,Neue;
    font-size: 32px;
    color: #666;
  }
  h2 {
    font-size: 18px;
    color: #666;
    font-weight: normal;
    margin-top: 10px;
  }
}

.introduce {
  position: relative;
  border-radius: 3px;
  margin-bottom: 16px;
  margin-top: 1.4rem;
  padding: 10px 16px;
  background-color: hsla(0, 0%, 100%, 0.8);
  box-shadow: 0 0 14px 2px #ebebeb;
  li {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    margin: 24px 0;
    i {
      color: var(--theme-color);
      font-size: 20px;
    }
    p {
      padding-left: 20px;
      float: left;
      font-size: 14px;
      color: #777;
    }
  }
}

@media (max-width: 656px) {
  .introduce {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}

</style>
