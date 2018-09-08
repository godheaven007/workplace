<template>
  <div id="app">
    <router-link to="/">首页</router-link> |
    <router-link to="/about">关于</router-link> |
    <router-link to="/aaa">404 Error</router-link>
    <!-- 匹配到的组件渲染至此 -->
    <transition name="app" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .app-enter,.app-leave-to {
    opacity: 0;
  }
  .app-enter-active,
  .app-leave-active{
    transition: opacity .5s;
  }
</style>
