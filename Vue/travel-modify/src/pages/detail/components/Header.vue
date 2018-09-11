<template>
  <!-- 头部渐隐渐现 -->
  <div>
    <div class="detail-header detail-header1" v-if="!showHeader">
      <router-link tag="div" to="/" class="detail-back-btn">
        <span class="iconfont icon-back"></span>
      </router-link>
    </div>
    <div class="detail-header detail-header2" :style="opacityObj" v-else>
      <router-link to="/">
        <span class="iconfont icon-back"></span>
      </router-link>
      <p>北京欢乐谷</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailHeader',
  // props: {
  //   showHeader: {
  //     type: Boolean
  //   },
  //   opacityObj: {
  //     type: Object
  //   }
  // },
  data () {
    return {
      showHeader: false,
      opacityObj: {
        opacity: 0
      }
    }
  },
  methods: {
    handleScroll () {
      console.log('xsf')
      let height = document.documentElement.scrollTop
      if (height > 10) {
        this.showHeader = true
        let opacity = height / 60
        opacity = opacity > 1 ? 1 : opacity
        this.opacityObj = {
          opacity
        }
      } else {
        this.showHeader = false
      }
    }
  },
  activated () {
    window.addEventListener('scroll', this.handleScroll)
  },
  deactivated () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss" scoped>
  .detail-header {
    position: fixed;
    width: 100%;
    height: .88rem;
    line-height: .88rem;
    text-align: center;
    z-index: 90;
  }
  .detail-header1 {
    .detail-back-btn {
      position: absolute;
      top: .1rem;
      left: .1rem;
      width: .72rem;
      height: .72rem;
      line-height: .72rem;
      text-align: center;
      border-radius: 50%;
      background-color: rgba(0,0,0,0.5);
      span {
        color: #fff;
        font-size: .5rem;
        margin-left: -.05rem;
      }
    }
  }
  .detail-header2 {
    background: #00bcd4;
    span {
      position: absolute;
      top: 0;
      left: 0;
      width: .8rem;
      height: .88rem;
      line-height: .88rem;
      color: #fff;
      font-size: .6rem;
    }
    p {
      width: 100%;
      text-align: center;
      color: #fff;
      line-height: .88rem;
      font-size: .32rem;
    }
  }
</style>
