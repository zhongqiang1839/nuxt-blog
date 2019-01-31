<template>
  <div class="app-container">
    <my-background></my-background>
    <my-header></my-header>
    <div class="container layout">
      <div class="welcome-view">
        <div class="welcome__feed view">
          <nuxt/>
        </div>
        <aside class="welcome__side view">
          <my-tags></my-tags>
        </aside>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import myHeader from '~/components/header'
  import myFooter from '~/components/footer'
  import myTags from '~/components/tags'
  import userInfo from '~/components/user'
  import myBackground from '~/components/backgrond'

  export default {
    data() {
      return {}
    },
    mounted() {
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                $('[rel="icon"]').attr('href', "/images/fail.ico");
                document.title = '╭(°A°`)╮ 页面崩溃啦 ~ 快回来看看~！';
            } else {
                $('[rel="icon"]').attr('href', "/favicon.ico");
                document.title = '噫..又好了~';
            }
        });
    },
    components: {
      myHeader,
      myFooter,
      myTags,
      myBackground,
      userInfo
    },
  }
</script>

<style lang="less" scoped>

.app-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  margin: 0 auto;
}

.container {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
}

.welcome-view>.view {
  margin-top: 1.767rem;
}

.welcome-view {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.welcome-view .welcome__feed{
  overflow: hidden;
  flex-grow: 1;
  min-width: 700px;
}

.welcome-view .welcome__side {
  width: 240px;
  min-width: 240px;
  margin-left: 20px;
}

</style>
