<template>
  <div class="list wrap" ref="wrapper">
    <div class="content">
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="button-list">
          <div class="button-wrapper">
            <div class="button" @click="handleCityClick(city)">
              {{city}}
            </div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list">
          <div
            class="button-wrapper"
            v-for="item of hotCityList"
            :key="item.id"
            @click="handleCityClick(item.name)"
          >
            <div class="button">
              {{item.name}}
            </div>
          </div>
        </div>
      </div>
      <!-- A、B、C、 -->
      <div class="area"
        v-for="(cities,key) of cityList"
        :key="key"
        :ref="key"
      >
        <div class="title border-topbottom">{{key}}</div>
        <ul class="item-list">
          <li
            class="item border-bottom"
            v-for="city of cities"
            :key="city.id"
            @click="handleCityClick(city.name)"
          >
            {{city.name}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'CityList',
  props: {
    cityList: Object,
    hotCityList: Array,
    letter: String
  },
  methods: {
    handleCityClick (city) {
      // this.$store.commit('changeCity', city)
      this.changeCity(city)
      this.$router.push('/')
    },
    ...mapMutations(['changeCity'])
  },
  computed: {
    // city () {
    //   return this.$store.state.city
    // }
    ...mapState(['city'])
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {})
    })
  },
  activated () {
    console.log(444)
  },
  watch: {
    letter () {
      let curDom = this.$refs[this.letter][0]
      this.scroll.scrollToElement(curDom)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/variable.scss';
  .border-topbottom {
    &:before, &:after {
      border-color: #ccc;
    }
  }
  .border-bottom {
    &:before {
      border-color: #ccc;
    }
  }
  .list {
    position: absolute;
    top: 1.76rem;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }
  .title {
    line-height: .44rem;
    background-color: #eee;
    padding-left: .2rem;
    color: #666;
    font-size: .26rem;
  }
  .button-list {
    overflow: hidden;
    padding: .1rem .6rem .1rem .1rem;
    .button-wrapper {
      float: left;
      width: 33.33%;
      .button {
        padding: .1rem 0;
        text-align: center;
        margin: .1rem;
        border: .02rem solid #ccc;
        border-radius: .06rem;
      }
    }
  }
  .item-list {
    .item {
      line-height: .76rem;
      padding-left: .2rem;
      color: #666;
    }
  }
</style>
