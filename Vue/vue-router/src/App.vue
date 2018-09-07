<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.$router.push('/setting/student')
  }
}
</script>

<style>
</style>
