<template>
  <div>
    <div class="banner-wrap" @click="handleBannerClick">
      <div class="banner-bg">
        <img :src="bannerImg" alt="">
      </div>
      <div class="banner-gallery">
        <span class="iconfont icon-img"></span> {{gallaryImgs.length}}
      </div>
      <p class="banner-desc">
        {{sightName}}
      </p>
    </div>
    <fade-animation>
      <common-gallery
        v-if="showGallery"
        :imgs="gallaryImgs"
        @galleryClose="handleGalleryClose"
      ></common-gallery>
    </fade-animation>
  </div>
</template>

<script>
import CommonGallery from 'common/gallery/Gallery'
import FadeAnimation from 'common/fade/Fade'
export default {
  name: 'DetailBanner',
  props: {
    sightName: {
      type: String
    },
    bannerImg: {
      type: String
    },
    gallaryImgs: {
      type: Array
    }
  },
  data () {
    return {
      showGallery: false
    }
  },
  methods: {
    handleBannerClick () {
      this.showGallery = true
    },
    handleGalleryClose () {
      this.showGallery = false
    }
  },
  components: {
    CommonGallery,
    FadeAnimation
  }
}
</script>

<style lang="scss" scoped>
  .banner-wrap {
    position: relative;
    .banner-bg {
      overflow: hidden;
      height: 0;
      width: 100%;
      padding-bottom: 55%;
      img {
        width: 100%;
      }
    }
    .banner-gallery {
      position: absolute;
      left: .2rem;
      bottom: .86rem;
      width: 1.2rem;
      height: .4rem;
      line-height: .38rem;
      background: rgba(0,0,0,.5);
      border-radius: .2rem;
      font-size: .24rem;
      color: #fff;
      text-align: center;
    }
    .banner-desc {
      position: absolute;
      right: .2rem;
      bottom: .36rem;
      left: .2rem;
      min-height: .4rem;
      line-height: .4rem;
      color: #fff;
      font-size: .36rem;
      text-shadow: 0 1px 2px rgba(0,0,0,0.70);
      // background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.8));
    }
  }
</style>
