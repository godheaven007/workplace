<template>
  <div>
    <h1>{{getCount}}</h1>
    <p>
      <button @click="plus">+</button>
      <button @click="minus(3)">-</button>
    </p>
  </div>
</template>

<script>
import store from '@/store/index'
import {mapState, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'Count',
  store,
  methods: {
    // Mutations方式一
    // add () {
    //   this.$store.commit('add')
    // },
    // reduce () {
    //   this.$store.commit('reduce')
    // }

    // Mutations方式二
    // 转换后同上(需要注意的是，这里的方法名必须与Vuex中mutations中的方法名一致， 若不一致，可采用方式三)
    //  ...mapMutations(['add', 'reduce'])

    // Mutations方式san
    ...mapMutations({
      plus: 'add',
      minus: 'reduce'
    })
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
    // ...mapState({
    //   getCount: 'count'
    // }),

    // Getters使用方式一
    // getCount () {
    //   return this.$store.getters.doubleCount
    // }

    // Getters使用方式二
    ...mapGetters({
      getCount: 'doubleCount'
    })
  }
}
</script>
