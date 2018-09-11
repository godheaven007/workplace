<template>
  <div>
    <div class="search">
      <input v-model="keyword" class="search-input" type="text" placeholder="输入城市名或拼音">
      <div class="search-content" ref="wrapper" v-show="keyword">
        <ul>
          <li
            class="search-item border-bottom"
            v-for="item of searchList"
            :key="item.id"
            @click="handleCityClick(item.name)"
          >
            {{item.name}}
          </li>
          <li class="search-item border-bottom" v-show="!searchList.length">
            未搜索到该城市!
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {mapMutations} from 'vuex'

export default {
  name: 'CitySearch',
  props: {
    cities: Object
  },
  data () {
    return {
      keyword: '',
      timer: null,
      searchList: []
    }
  },
  watch: {
    keyword () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (this.keyword.replace(/^\s*|\s*$/g, '') === '') {
        this.searchList = []
        return
      }
      this.timer = setTimeout(() => {
        this.getSearchList()
      }, 200)
    }
  },
  methods: {
    getSearchList () {
      let list = []
      for (var key in this.cities) {
        this.cities[key].forEach((city, index) => {
          if (city.spell.indexOf(this.keyword) !== -1 ||
              city.spell.indexOf(this.keyword) !== -1) {
            list.push(city)
          }
        })
      }
      this.searchList = list
    },
    handleCityClick (city) {
      // this.$store.commit('changeCity', city)
      this.changeCity(city)
      this.$router.push('/')
    },
    ...mapMutations(['changeCity'])
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {})
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/variable.scss';
  .search {
    height: .9rem;
    line-height: .9rem;
    padding: 0 .2rem;
    background-color: $bgColor;
    .search-input {
      width: 100%;
      height: .6rem;
      line-height: .6rem;
      padding: 0 .2rem;
      text-align: center;
      border-radius: .06rem;
      color: #666;
    }
    .search-content {
      overflow: hidden;
      position: absolute;
      top: 1.76rem;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 10;
      background-color: #eee;
      .search-item {
        line-height: .62rem;
        padding-left: .2rem;
        color: #666;
        background-color: #fff;
      }
    }
  }
</style>
