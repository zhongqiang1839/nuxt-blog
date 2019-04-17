<template>
  <div>
    <ul class="fe-article__container" v-if="artList.length">
      <li class="fe-article__item" v-for="(item, index) in artList" :key="index">
        <a class="fe-article__item-link" :href="`/article/${item._id}`">
          <span class="fe-article__item-time">{{item.create_at}}</span>
          <span class="fe-article__item-title"> {{item.title}}</span>
        </a>
      </li>
    </ul>
    <div class="fe-article__empty" v-else> 暂无更多文章</div>
  </div>
</template>

<script>
  export default {
    name: 'fn-art-list',

    props: {
      artList: {
        type: Array,
        required: true,
        default: []
      }
    },

    mounted () {
    }
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
        width: 6rem;
      }
      &-title {
        display: table-cell;
        padding-top: .1rem;
        font-size: 1rem;
      }
    }
  }

</style>
