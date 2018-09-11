<template>
  <div>
    <!-- <detail-header :showHeader="showHeader" :opacityObj="opacityObj"></detail-header> -->
    <detail-header></detail-header>
    <detail-banner
      :sightName="sightName"
      :bannerImg="bannerImg"
      :gallaryImgs="gallaryImgs"
    ></detail-banner>
    <detail-list :list="categoryList"></detail-list>

    <div style="height: 40rem;"></div>
  </div>
</template>

<script>
import DetailHeader from './components/Header'
import DetailBanner from './components/Banner'
import DetailList from './components/List'
import axios from 'axios'
export default {
  name: 'Detail',
  data () {
    return {
      // showHeader: false,
      // opacityObj: {
      //   opacity: 0
      // }
      sightName: '',
      bannerImg: '',
      gallaryImgs: [],
      categoryList: []
    }
  },
  // methods: {
  //   handleScroll () {
  //     let height = document.documentElement.scrollTop
  //     if (height > 10) {
  //       this.showHeader = true
  //       let opacity = height / 60
  //       opacity = opacity > 1 ? 1 : opacity
  //       this.opacityObj = {
  //         opacity
  //       }
  //     } else {
  //       this.showHeader = false
  //     }
  //   }
  // },
  // activated () {
  //   window.addEventListener('scroll', this.handleScroll)
  // },
  // deactivated () {
  //   window.removeEventListener('scroll', this.handleScroll)
  // },
  methods: {
    getDetailInfo (res) {
      res = res.data
      if (res.ret && res.data) {
        let data = res.data
        this.sightName = data.sightName
        this.bannerImg = data.bannerImg
        this.gallaryImgs = data.gallaryImgs
        this.categoryList = data.categoryList
      }
    }
  },
  components: {
    DetailHeader,
    DetailBanner,
    DetailList
  },
  mounted () {
    axios.get('/api/detail.json', {
      params: {id: this.$route.params.id}
    }).then(this.getDetailInfo)
      .catch(() => {
        console.log('error...')
      })
  }
}
</script>
