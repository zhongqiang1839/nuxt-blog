<template>
  <div class="eevee" v-if="showEevee"></div>
</template>
<script>
  
  import {FN_MESSAGE} from '~/utils/constant'
  
  export default {
    name: 'fn-message', data() {
      return {
        showEevee: true
      }
    }, methods: {
      showMessage(text, timeout) {
        if (Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1) - 1];
        $('.eevee').stop().css('opacity', 1).html(text);
        timeout = timeout || 5000;
        this.hideMessage(timeout);
      },
      hideMessage(timeout) {
        $('.eevee').stop();
        if (timeout === null) timeout = 5000;
        $('.eevee').delay(timeout).fadeTo(200, 0);
      },
      showHitokoto() {
        $.getJSON('https://v1.hitokoto.cn/', result => {
          this.showMessage(result.hitokoto, 5000);
        });
      },
      renderTip(template, context) {
        let tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
        return template.replace(tokenReg, function (word, slash1, token, slash2) {
          if (slash1 || slash2) {
            return word.replace('\\', '');
          }
          let letiables = token.replace(/\s/g, '').split('.');
          let currentObject = context;
          let i, length, letiable;
          for (i = 0, length = letiables.length; i < length; ++i) {
            letiable = letiables[i];
            currentObject = currentObject[letiable];
            if (currentObject === undefined || currentObject === null) return '';
          }
          return currentObject;
        });
      },
      initTips() {
        String.prototype.renderTip = (context) => {
          return this.renderTip(this, context);
        };
        $.each(FN_MESSAGE.mouseover, (index, tips) => {
          $(tips.selector).mouseover(() => {
            let text = tips.text;
            if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
            this.showMessage(text, 3000);
          });
        });
        $.each(FN_MESSAGE.click, (index, tips) => {
          $(tips.selector).click(() => {
            let text = tips.text;
            if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
            this.showMessage(text, 3000);
          });
        });
      },
      init() {
        let text;
        if (window.location.href === `${location.origin}`) { //主页URL判断，需要斜杠结尾
          let now = (new Date()).getHours();
          if (now > 23 || now <= 5) {
            text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？';
          } else if (now > 5 && now <= 7) {
            text = '早上好！一日之计在于晨，美好的一天就要开始了！';
          } else if (now > 7 && now <= 11) {
            text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
          } else if (now > 11 && now <= 14) {
            text = '中午了，工作了一个上午，现在是午餐时间！';
          } else if (now > 14 && now <= 17) {
            text = '午后很容易犯困呢，今天的运动目标完成了吗？';
          } else if (now > 17 && now <= 19) {
            text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~~';
          } else if (now > 19 && now <= 21) {
            text = '晚上好，今天过得怎么样？';
          } else if (now > 21 && now <= 23) {
            text = '已经这么晚了呀，早点休息吧，晚安~~';
          } else {
            text = '嗨~ 快来逗我玩吧！';
          }
        } else {
          text = '嗨！朋友你好！ 欢迎来到 小强哥的个人博客！';
        }
        this.showMessage(text, 12000);
      }
    },
    mounted() {
      this.showEevee = (window.innerWidth > 1200);
      window.onresize = () => {
        this.showEevee = !(window.innerWidth > 1200);
      };
      this.initTips();
      this.init();
      window.setInterval(this.showHitokoto, 20000);
    }
  }
</script>

<style lang="less" scoped>
  
  .eevee {
    position: fixed;
    top: 1rem;
    right: .2rem;
    z-index: 1000;
    margin: 0 1rem 1rem;
    padding: 1rem 1rem;
    border-radius: 6px;
    width: 200px;
    color: #888;
    background-color: var(--box-back-color);
    text-align: left;
    transition: all .4s ease;
  }
  
</style>
