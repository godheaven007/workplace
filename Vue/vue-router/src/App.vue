<template>
  <div id="app">
    <router-link to="/root">Root</router-link> |
    <router-link to="/xusf">首页</router-link> |
    <router-link to="/aaa">关于</router-link>
    <!-- 匹配到的组件渲染至此 -->
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
