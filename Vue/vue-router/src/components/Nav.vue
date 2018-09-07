<template>
  <div class="wrap">
    <ul class="nav-link">
      <li>
        <router-link to="/setting/student">学生</router-link>
      </li>
      <li>
        <router-link to="/setting/parent">家长</router-link>
      </li>
      <li>
        <router-link to="/setting/teacher">老师</router-link>
      </li>
    </ul>
    <div class="nav-content">
      <router-view class="view" name="foo"></router-view>
      <router-view class="view"></router-view>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Nav'
}
</script>
<style scoped>
*{margin: 0; padding: 0;}
.wrap {
  overflow: hidden;
  width: 500px;
  height: 500px;
  border: 2px solid #000;
  margin: 0 auto;
}
.nav-link {
  list-style: none;
  float: left;
  width: 200px;
  height: 100%;
  background-color: #0ff;
}
.nav-content {
  float: left;
  width: 300px;
  height: 100%;
  background-color: #f0f;
}
.nav-content .view {
  width: 100%;
  height: 50%;
}
</style>
