<template>
  <div id="app">
    <router-link to="/">首页</router-link> |
    <router-link to="/about">关于</router-link> |
    <router-link to="/about/about1">关于1</router-link> |
    <router-link to="/about/about2">关于2</router-link>
    <!-- 匹配到的组件渲染至此（注意！！！这里的router-view只渲染顶层组件） -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
