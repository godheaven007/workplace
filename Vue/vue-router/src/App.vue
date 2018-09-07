<template>
  <div id="app">
    <ul>
      <li>
        <!-- 该路径下，没有配置main视图，下面的<router-view name="main">就不会被渲染 -->
        <router-link to="/router1">路由1</router-link>
      </li>
      <li>
        <router-link to="/router2">路由2</router-link>
      </li>
    </ul>
    <router-view class="sidebar" name="sidebar"></router-view>
    <router-view class="main" name="main"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.sidebar {
  float: left;
  width: 20%;
  height: 500px;
  background-color: #0ff;
}
.main {
  float: left;
  width: 80%;
  height: 500px;
  background-color: #f0f;
}
</style>
