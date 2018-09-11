<template>
  <div class="gallery-wrap" @click="galleryClose">
    <div class="wrapper">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) of imgs" :key="index">
          <img :src="item" alt="XXX">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonGallery',
  props: {
    imgs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationType: 'fraction'
      }
    }
  },
  methods: {
    galleryClose () {
      this.$emit('galleryClose')
    }
  }
}
</script>

<style lang="scss" scoped>
  .gallery-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,1);
    z-index: 100;
    .wrapper {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      img {
        width: 100%;
      }
    }
  }
  .swiper-container {
    overflow: visible;
  }
  .swiper-pagination-fraction {
    bottom: -2rem;
    color: #fff;
  }
</style>
