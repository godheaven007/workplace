<template>
  <h1>联系-{{this.$route.params.age}}</h1>
</template>

<script>
export default {
  name: 'Concat',
  mounted () {
    console.log(this.$router, 111)
    console.log(this.$route, 222)
  }
}
</script>
<style scoped>
</style>
