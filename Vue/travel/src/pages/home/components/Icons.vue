<template>
  <div class="icon-list">
    <swiper :options="swiperOption" v-if="showIcons">
        <swiper-slide v-for="(page, index) of pages" :key="index">
          <div class="icon-item-wrap">
            <div class="icon-item" v-for="item of page" :key="item.id">
              <div class="icon-img-wrap">
                <img :src="item.imgUrl" alt="">
              </div>
              <p>{{item.desc}}</p>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeIcons',
  props: {
    list: Array
  },
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true
      }
    }
  },
  computed: {
    pages () {
      const pages = []
      this.list.forEach((item, index) => {
        const page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    },
    showIcons () {
      return this.list.length
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variable.scss';
@import '~styles/mixins.scss';
  .icon-list {
    /deep/ .swiper-container {
      width: 100%;
      height: 0;
      padding-bottom: 56%;
    }
    /deep/ .swiper-pagination-bullet-active {
      background-color: $bgColor;
    }
  }
  .icon-item-wrap {
    display: flex;
    flex-flow: row wrap;
    .icon-item {
      position: relative;
      flex: none;
      width: 25%;
      height: 40px;
      padding-bottom: 25%;
      .icon-img-wrap {
        position: absolute;
        top: 0;
        right: 0;
        bottom: .44rem;
        left: 0;
        padding-top: .1rem;
        text-align: center;
        img {
          height: 100%;
        }
      }
      p {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: .44rem;
        line-height: .44rem;
        text-align: center;
        color: $fontTextColor;
        font-size: 14px;
        @include ellipsis;
      }
    }
  }
</style>
