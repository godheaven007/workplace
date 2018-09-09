<template>
  <div>
    <h1>{{getCount}}</h1>
    <p>
      <button @click="add">+</button>
      <button @click="reduce">-</button>
    </p>
  </div>
</template>

<script>
import store from '@/store/index'
import {mapState} from 'vuex'
export default {
  name: 'Count',
  data () {
    return {
      msg: 'hello'
    }
  },
  store,
  methods: {
    add () {
      this.$store.commit('add')
    },
    reduce () {
      this.$store.commit('reduce')
    }
  },
  // 状态取值方式一
  // computed: {
  //   count () {
  //     return this.$store.state.count
  //   }
  // }
  // 状态取值方式二
  // computed: mapState({
  //   count: state => state.count
  // })

  // 状态取值方式三
  // computed: mapState(['count'])

  // 状态取值方式四
  // computed: {
  //   ...mapState(['count'])
  // }

  // 状态取值方式五
  computed: {
    ...mapState({
      getCount: 'count'
    })
  }
}
</script>
