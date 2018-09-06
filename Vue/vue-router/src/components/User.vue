<template>
  <h1>{{$route.params.username}} - {{$route.params.sex}}</h1>
</template>

<script>
export default {
  name: 'Home',
  updated () {
  }
}
</script>
<style scoped>
</style>
