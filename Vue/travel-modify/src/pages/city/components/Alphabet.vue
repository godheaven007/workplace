<template>
  <ul class="list">
    <li class="item"
      v-for="(item, index) of getAlphaList"
      :key="index"
      :ref="item"
      @click="handleLetterClick"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      {{item}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CityAlphabet',
  props: {
    alphaList: Object
  },
  data () {
    return {
      offsetTop: 0
    }
  },
  computed: {
    getAlphaList () {
      return Object.keys(this.alphaList)
    }
  },
  updated () {
    console.log('updated')
    this.offsetTop = this.$refs['A'][0].offsetTop
  },
  methods: {
    handleLetterClick (e) {
      this.$emit('letterChange', e.target.innerText)
    },
    handleTouchStart (e) {
    },
    handleTouchMove (e) {
      let touchTarget = e.touches[0]
      let touchPageY = touchTarget.pageY
      let distance = touchPageY - this.offsetTop - 88
      let index = Math.floor(distance / 20)
      if (index >= 0 && index < this.getAlphaList.length) {
        this.$emit('letterChange', this.getAlphaList[index])
      }
    },
    handleTouchEnd () {
    }
  },
  mounted () {

  },
  activated () {
    console.log(666)
  }
}
</script>

<style lang="scss" scoped>
  .list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 1.76rem;
    right: 0;
    bottom: 0;
    width: .4rem;
    .item {
      line-height: .4rem;
      text-align: center;
      color: #00bcd4;
    }
  }
</style>
