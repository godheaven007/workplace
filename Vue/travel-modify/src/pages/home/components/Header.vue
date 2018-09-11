<template>
  <div class="header">
    <div class="header-left">
      <span class="iconfont icon-arrowleft"></span>
    </div>
    <div class="header-input">
      <span class="iconfont icon-search"></span>
      <input type="text" placeholder="请输入...">
    </div>
    <router-link to="/city">
      <div class="header-right">
        {{city}} <span class="iconfont icon-arrowdown"></span>
      </div>
    </router-link>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'HomeHeader',
  computed: {
    // city () {
    //   return this.$store.state.city
    // }
    ...mapState({
      city: 'city'
    })
  }
}
</script>

<style lang="scss" scoped>
  // @import '~@/assets/styles/variable.scss';
  @import 'styles/variable.scss';
  .header {
    display: flex;
    line-height: .86rem;
    background-color: $bgColor;
    color: #fff;
    .header-left {
      width: .8rem;
      .icon-arrowleft {
        display: block;
        text-align: center;
        font-size: .4rem;
      }
    }
    .header-input {
      position: relative;
      flex: 1;
      height: .86rem;
      line-height: .86rem;
      padding: .12rem 0;
      color: #ccc;
      .icon-search {
        position: absolute;
        top: 0;
        left: .1rem;
        color: #ccc;
      }
      input {
        width: 100%;
        height: 100%;
        vertical-align: top;
        padding-left: 0.5rem;
        border-radius: .1rem;
        color: #999;
      }
    }
    .header-right {
      min-width: 1.24rem;
      text-align: center;
      color: #fff;
    }
  }
</style>
