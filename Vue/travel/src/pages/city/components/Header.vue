<template>
  <div class="header">
    <router-link to="/">
      <span class="iconfont icon-arrowleft"></span>
    </router-link>
    城市选择
  </div>
</template>

<script>
export default {
  name: 'CityHeader'
}
</script>

<style lang="scss" scoped>
@import '~styles/variable.scss';
.header {
    position: relative;
    height: .86rem;
    line-height: .86rem;
    text-align: center;
    color: #fff;
    background-color: $bgColor;
    font-size: .32rem;
    span {
      position: absolute;
      top: 0;
      left: .2rem;
      color: #fff;
    }
  }
</style>
