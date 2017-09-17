<template>
   <div class="music-list">
      <div class="back" @click="back">
         <i class="icon-back"></i>
      </div>
      <h1 class="title" v-html="singername"></h1>
      <div class="bg-image" :style="bg_img" ref="bgheight">
         <div class="play-wrapper" ref='playbut'>
            <div class="play">
               <i class="icon-play"></i>
               <span class="text">随机播放全部</span>
            </div>
         </div>
         <div class="filter" ref="filter"></div>
      </div>
      <div class="bg-layer" ref="layer"></div>
      <scroll :data='singersongdata' :probeType='probeType' :monitoring='monitoring' @scroll='scroll' class="list" ref="settop">
         <div class="song-list-wrapper">
            <songs :singersongdata='singersongdata' @playmusic='playmusic'></songs>
         </div>
      </scroll>
      <div class="loading-container" v-show="!singersongdata.length">
         <loading></loading>
      </div>
   </div>
</template>
<script>
import scroll from 'base/scroll/scroll'
import songs from 'base/songs/songs'
import { prefixstyle } from 'common/getdom/getdom'
import loading from 'base/loading/loading'
import { mapActions } from 'vuex'

const transform = prefixstyle('transform')
const backdrop = prefixstyle('backdrop-filter')
export default {
   props: {
      // 背景图
      bgimg: {
         type: String,
         dufault: ''
      },
      // 歌手姓名
      singername: {
         type: String,
         dufault: []
      },
      // 歌手歌单
      singersongdata: {
         type: Array,
         dufault: []
      }
   },
   components: {
      scroll,
      songs,
      loading
   },
   created() {
      this.probeType = 3
      this.monitoring = true
   },
   mounted() {
      // 获取背景图dom高度
      this.imgheight = this.$refs.bgheight.clientHeight
      this.mixlayertop = -this.imgheight + 40
      this.$refs.settop.$el.style.top = `${this.imgheight}px`
   },
   data() {
      return {
         scrolly: 0
      }
   },
   methods: {
      scroll(pos) {
         this.scrolly = pos.y
      },
      back() {
         this.$router.back()
      },
      playmusic(item, index) {
         // console.log(item)
         // console.log(this.singersongdata)
         this.play({
            list: this.singersongdata,
            index
         })
      },
      ...mapActions([
         'play'
      ])
   },
   watch: {
      // 歌手歌单向上滑动效果
      scrolly(newy) {
         // console.log(this.mixlayertop)    //-250
         // console.log(newy)                //y轴移动的实时负数
         // Math.max()返回最大的数，如果移动距离超过-250就一直返回-250
         let layertop = Math.max(this.mixlayertop, newy)
         let zindex = 0
         let scaling = 1
         let blur = 0
         // 控制layer层滑动的距离
         const percent = Math.abs(newy / this.imgheight)
         if (newy > 0) {
            scaling = percent + 1
            zindex = 10
         } else {
            blur = Math.min(20 * percent, 20)
         }
         this.$refs.layer.style[transform] = `translate3d(0,${layertop}px,0)`
         this.$refs.filter.style[backdrop] = `blur(${blur}px)`
         // 控制滑动内容距离顶部的距离
         if (newy < this.mixlayertop) {
            zindex = 10
            this.$refs.bgheight.style.paddingTop = 0
            this.$refs.bgheight.style.height = 40 + 'px'
            this.$refs.playbut.style.display = 'none'
            // console.log(this.$refs.bgheight.style)
         } else {
            this.$refs.bgheight.style.paddingTop = '70%'
            this.$refs.bgheight.style.height = 0
            this.$refs.playbut.style.display = ''
         }
         this.$refs.bgheight.style[transform] = `scale(${scaling})`
         this.$refs.bgheight.style.zIndex = zindex
      }
   },
   computed: {
      bg_img() {
         return `background-image:url(${this.bgimg})`
      }
   }
}
</script>
<style lang="stylus" scoped>
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
