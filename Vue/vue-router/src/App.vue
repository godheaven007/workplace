<template>
  <div id="app">
    <router-link :to="{name: 'home', params: {name: 'homePage'}}">首页</router-link> |
    <router-link :to="{name: 'about', params: {name: 'aboutPage'}}">关于</router-link>
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
