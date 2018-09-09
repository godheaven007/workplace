<template>
  <h1>关于</h1>
</template>

<script>
export default {
  name: 'About',
  beforeRouteEnter: (from, to, next) => {
    next({name: 'concat', params: {age: 100}})
  }
}
</script>

<style>

</style>
