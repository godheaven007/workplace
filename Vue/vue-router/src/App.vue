<template>
  <div id="app">
    <router-link :to="{name: 'home', params: {name: '小师傅'}}">首页</router-link> |
    <router-link to="/about">关于</router-link> |
    <router-link to="/color">颜色</router-link>
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
