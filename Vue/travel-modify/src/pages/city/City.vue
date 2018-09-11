<template>
  <div>
      <city-header></city-header>
      <city-search
        :cities="cityList"
      >
      </city-search>
      <city-list
        :cityList="cityList"
        :hotCityList="hotCityList"
        :letter="letter"
      >
      </city-list>
      <city-alphabet
        :alphaList="cityList"
        @letterChange="handleLetterChange"
      ></city-alphabet>
  </div>
</template>

<script>
import CityHeader from './components/Header'
import CitySearch from './components/Search'
import CityList from './components/List'
import CityAlphabet from './components/Alphabet'
import axios from 'axios'

export default {
  name: 'City',
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphabet
  },
  data () {
    return {
      cityList: {},
      hotCityList: [],
      letter: ''
    }
  },
  methods: {
    getCityList (res) {
      res = res.data
      if (res.ret) {
        let data = res.data
        this.cityList = data.cities
        this.hotCityList = data.hotCities
      }
    },
    handleLetterChange (letter) {
      this.letter = letter
    }
  },
  mounted () {
    axios.get('/api/city.json')
      .then(this.getCityList)
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style lang="scss" scoped>

</style>
