<template>
  <div id="app">
    <router-link to="/user/xusf/sex/male">xusf</router-link>
    <router-link to="/user/yuwy/sex/female">yuwy</router-link>
    <!-- 匹配到的组件渲染至此 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
  }
}
</script>

<style>
</style>
