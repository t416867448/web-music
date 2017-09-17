<template>
   <div class="player" v-show="playlist.length>0">
      <transition name="normal" @enter='enter' @after-enter='afterEnter' @leave='leave' @after-leave='afterLeave'>
         <div class="normal-player" v-show="playshow">
            <div class="background">
               <img width="100%" height="100%" :src="currentplaysong.image">
            </div>
            <div class="top">
               <div class="back" @click="playzoom">
                  <i class="icon-back"></i>
               </div>
               <h1 class="title" v-html="currentplaysong.name"></h1>
               <h2 class="subtitle" v-html="currentplaysong.singer"></h2>
            </div>
            <div class="middle">
               <div class="middle-l">
                  <div class="cd-wrapper" ref="zoomanimation">
                     <div class="cd" :class="playbgrotate">
                        <img class="image" :src="currentplaysong.image">
                     </div>
                  </div>
                  <div class="playing-lyric-wrapper">
                     <div class="playing-lyric"></div>
                  </div>
               </div>
               <div class="lyric-wrapper">
                  <div>
                     <p class="text"></p>
                  </div>
               </div>
            </div>
            <div class="bottom">
               <div class="dot-wrapper">
                  <span class="dot"></span>
                  <span class="dot"></span>
               </div>
               <div class="progress-wrapper">
                  <span class="time time-l">{{gettime(currenttime)}}</span>
                  <div class="progress-bar-wrapper">
                     <progressbar :progress='progress' @dragdistance='dragdistance'></progressbar>
                  </div>
                  <span class="time time-r">{{gettime(currentplaysong.duration)}}</span>
               </div>
               <div class="operators">
                  <div class="icon i-left">
                     <i class="icon-sequence"></i>
                  </div>
                  <div class="icon i-left" :clsss='discb'>
                     <i class="icon-prev" @click="perv"></i>
                  </div>
                  <div class="icon i-center" :clsss='discb'>
                     <i :class="playicon" @click="setplaystate"></i>
                  </div>
                  <div class="icon i-right" :clsss='discb'>
                     <i class="icon-next" @click="next"></i>
                  </div>
                  <div class="icon i-right">
                     <i class="icon icon-not-favorite"></i>
                  </div>
               </div>
            </div>
         </div>
      </transition>
      <transition name="mini">
         <div class="mini-player" v-show="!playshow" @click="playshowmini">
            <div class="icon">
               <img width="40" :class="playbgrotate" height="40" :src="currentplaysong.image">
            </div>
            <div class="text">
               <h2 class="name" v-html="currentplaysong.name"></h2>
               <p class="desc" v-html="currentplaysong.singer"></p>
            </div>
            <progresscircle :progress='progress'>
               <div class="control">
                  <i :class="miniicon" class="icon-mini" @click.stop="setplaystate"></i>
               </div>
            </progresscircle>
            <div class="control">
               <i class="icon-playlist"></i>
            </div>
         </div>
      </transition>
      <audio ref="audio" :src="currentplaysong.url" @play="preventrepeat" @timeupdate="playtime"></audio>
   </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import animations from 'create-keyframe-animation'
import { prefixstyle } from 'common/getdom/getdom'
import progressbar from 'base/progressbar/progressbar'
import progresscircle from 'base/progresscircle/progresscircle'
const transform = prefixstyle('transform')
export default {
   components: {
      progressbar,
      progresscircle
   },
   data() {
      return {
         trepeat: false,
         currenttime: 0
      }
   },
   computed: {
      // 当前播放时间/当前播放歌曲总时间=当前播放进度%
      progress() {
         return this.currenttime / this.currentplaysong.duration
      },
      discb() {
         return this.trepeat ? '' : 'disable'
      },
      // 最大化播放器播放暂停图标切换
      playicon() {
         return this.playstate ? 'icon-pause' : 'icon-play'
      },
      // 最小化播放器播放暂停图标切换
      miniicon() {
         return this.playstate ? 'icon-pause-mini' : 'icon-play-mini'
      },
      // 播放器图片转圈动画
      playbgrotate() {
         return this.playstate ? 'play' : 'play pause'
      },
      ...mapGetters([
         'playlist',    // 播放列表
         'playshow',    // 最大化最小化切换
         'currentplaysong',   // 当前播放歌曲
         'playstate',         // 播放状态
         'currentplayindex'   // 当前播放歌曲index
      ])
   },
   methods: {
      playtime(e) {
         // console.log(e)
         this.currenttime = e.target.currentTime
         // console.log(this.currenttime)
      },
      gettime(time) {
         time = time | 0
         let minute = time / 60 | 0
         let second = time % 60
         second = second >= 10 ? second : `0${second}`
         return `${minute}:${second}`
      },
      // 播放器最小化
      playzoom() {
         this.playshowhide(false)
      },
      // 播放器最大化
      playshowmini() {
         this.playshowhide(true)
      },
      // 播放或暂停
      setplaystate() {
         if (!this.trepeat) {
            return
         }
         this.playstateswitch(!this.playstate)
      },
      // 上一首
      perv() {
         if (!this.trepeat) {
            return
         }
         let index = this.currentplayindex - 1
         if (index === -1) {
            index = this.playlist.length - 1
         }
         this.currentplaymodeindex(index)
         if (!this.playstate) {
            this.setplaystate()
         }
         this.trepeat = false
      },
      // 下一首
      next() {
         if (!this.trepeat) {
            return
         }
         let index = this.currentplayindex + 1
         if (index === this.playlist.length) {
            index = 0
         }
         this.currentplaymodeindex(index)
         if (!this.playstate) {
            this.setplaystate()
         }
         this.trepeat = false
      },
      preventrepeat() {
         this.trepeat = true
      },
      ...mapMutations({
         playshowhide: 'SET_PLAYSHOW',
         playstateswitch: 'SET_PLAYSTATE',
         currentplaymodeindex: 'SET_CURRENTPLAYMODEINDEX'
      }),
      // 播放器最小化最大化动画
      // 动画开始
      enter(el, done) {
         let { zoomratio, x, y } = this.getxycoordinate()
         // console.log({ zoomratio, x, y })
         let animation = {
            0: {
               transform: `translate3d(${x}px,${y}px,0) scale(${zoomratio})`
            },
            60: {
               transform: `translate3d(0,0,0) scale(1.1)`
            },
            100: {
               transform: `translate3d(0,0,0) scale(1)`
            }
         }
         animations.registerAnimation({
            name: 'move',
            animation,
            presets: {
               duration: 400,
               easing: 'linear'
            }
         })
         // 开始调用
         /*
            第一个参数element ： 可以是一个单一的元素，元素或querySelectorAll结果数组
            第二个参数name：
                  如果是字符串，那么就是registerAnimation定义的动画名称
                  如果传递对象，它必须包含名称，例子：
                  animations.runAnimation(document.querySelectorAll(‘.dots‘), {
                     name: ‘wiggle‘,
                     delay: 1500       //    在这里，我们可以重写如上所述的任何预置选项
                  }, function () {}
                     callback     //    第三个参数  回调
         */
         animations.runAnimation(this.$refs.zoomanimation, 'move', done)
      },
      // 动画开始之后
      afterEnter() {
         // 执行回调 进入到这里  然后清除动画
         animations.unregisterAnimation('move')
         this.$refs.zoomanimation.style.animation = ''
      },
      // 动画完成
      leave(el, done) {
         this.$refs.zoomanimation.style.transition = 'all 0.4s'
         const { x, y, zoomratio } = this.getxycoordinate()
         this.$refs.zoomanimation.style[transform] = `translate3d(${x}px,${y}px,0) scale(${zoomratio})`
         this.$refs.zoomanimation.addEventListener('transitionend', done)
      },
      // 动画完成之后
      afterLeave() {
         this.$refs.zoomanimation.style.transition = ''
         this.$refs.zoomanimation.style[transform] = ''
      },
      // 动画移动的位子坐标
      getxycoordinate() {
         let miniwigth = 40 // 迷你播放器图片的宽度
         let minibottom = 20  // 迷你播放器图片距离下面的高度
         let minileft = 40   // 迷你播放器距离左边的宽度
         let playimgtop = 80 // 播放器距离顶部的高度
         let playimgwigth = window.innerWidth * 0.8  // 播放器的宽度
         let zoomratio = miniwigth / playimgwigth // 缩放比例
         let x = -(window.innerWidth / 2 - minileft) // x轴需要移动的距离
         let y = window.innerHeight - playimgwigth / 2 - playimgtop - minibottom // y轴需要移动的距离
         return { zoomratio, x, y }
      },
      // 拖动进度条播放
      dragdistance(drag) {
         // console.log(drag)
         this.$refs.audio.currentTime = this.currentplaysong.duration * drag
         if (!this.playstate) {
            this.setplaystate()
         }
      }
   },
   watch: {
      currentplaysong() {
         this.$nextTick(() => {
            this.$refs.audio.play()
         })
      },
      playstate(state) {
         let eaudio = this.$refs.audio
         this.$nextTick(() => {
            state ? eaudio.play() : eaudio.pause()
         })
      }
   }
}
</script>
<style lang="stylus" scoped>
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
