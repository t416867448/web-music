<template>
   <div class="progress-bar" @click="progressclick">
      <div class="bar-inner" ref="progressbar">
         <div class="progress" ref="progress"></div>
         <div class="progress-btn-wrapper" ref="progressround" @touchstart='progresstouchstart' @touchmove='progresstouchmove' @touchend='progresstouchend'>
            <div class="progress-btn"></div>
         </div>
      </div>
   </div>
</template>

<script type="text/ecmascript-6">
// 小圆点宽度
const round = 16
export default {
   props: {
      progress: {
         type: Number,
         default: 0
      }
   },
   watch: {
      progress(newprogress) {
         if (newprogress >= 0 && !this.touch.init) {
            // 进度条总宽度
            let progressbar = this.$refs.progressbar.clientWidth - round
            let moveweight = newprogress * progressbar
            this.offprogress(moveweight)
         }
      }
   },
   created() {
      this.touch = {}
   },
   methods: {
      progresstouchstart(e) {
         this.touch.init = true
         // 当前点击的x轴坐标
         this.touch.touchx = e.touches[0].pageX
         // 远点移动的距离
         this.touch.progresswidth = this.$refs.progress.clientWidth
         // console.log(e)
      },
      progresstouchmove(e) {
         if (!this.touch.init) return
         // 点击之后移动的距离（移动之后的x轴坐标减去点击时x轴的坐标）
         let movex = e.touches[0].pageX - this.touch.touchx
         // 圆点移动的距离加拖动的距离。往左拖动时超出进度条左边取最小值，往右拖动大于进度条宽度取最大值
         let offsetwidth = Math.min(this.$refs.progressbar.clientWidth - round, Math.max(0, this.touch.progresswidth + movex))
         this.offprogress(offsetwidth)
      },
      progresstouchend() {
         this.touch.init = false
         this.progressdrag()
      },
      progressdrag() {
         // 进度条总宽度
         let progressbar = this.$refs.progressbar.clientWidth - round
         // 当前播放进度比例
         let drag = this.$refs.progress.clientWidth / progressbar
         // console.log(drag)
         this.$emit('dragdistance', drag)
      },
      progressclick(e) {
         // console.log(e)
         this.offprogress(e.offsetX)
         this.progressdrag()
      },
      offprogress(moveweight) {
         // 进度条移动过的宽度
         this.$refs.progress.style.width = `${moveweight}px`
         // 圆点移动的位子
         this.$refs.progressround.style['transform'] = `translate3d(${moveweight}px,0,0)`
      }
   }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>