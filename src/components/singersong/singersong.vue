<template>
   <transition name='slide'>
      <songmusic :bgimg='bgimg' :singername='singername' :singersongdata='singersongdata'></songmusic>
   </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import api from 'common/router/config'
import { createsong } from 'common/singersongclass/singersongclass'
import songmusic from 'components/songmusic/songmusic'
export default {
   data() {
      return {
         singersongdata: []
      }
   },
   components: {
      songmusic
   },
   computed: {
      ...mapGetters([
         'singer'
      ]),
      bgimg() {
         return this.singer.imgurl
      },
      singername() {
         // console.log(this.singer)
         return this.singer.name
      }
   },
   created() {
      this.getsingersong()
   },
   methods: {
      getsingersong() {
         if (!this.singer.id) this.$router.push('/singer')
         api.getsingersong(this.singer.id).then((data) => {
            if (data.data.code === 0) {
               this.singersongdata = this.processsong(data.data.data.list)
            }
         })
      },
      processsong(list) {
         let songdata = []
         list.forEach((item) => {
            let { musicData } = item
            if (musicData.songid && musicData.albumid) {
               songdata.push(createsong(musicData))
            }
         })
         return songdata
      }
   }
}
</script>
<style lang="stylus" scoped>
    @import '~common/stylus/variable'

.slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
