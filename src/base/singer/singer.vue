<template>
    <scroll class="listview" ref='scroll' :probeType='probeType' :data='data' :monitoring='monitoring' @scroll='scroll'>
        <ul>
            <li class="list-group" v-for="item in data" ref='listgroup'>
                <h2 class="list-group-title" v-html="item.title"></h2>
                <ul>
                    <li @click="singersongskip(it)" v-for="it in item.items" class="list-group-item">
                        <img @load='loderimg' class="avatar" v-lazy="it.imgurl">
                        <span class="name" v-html="it.name"></span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart='touchshortcut' @touchmove.stop='ontouchmove'>
            <ul>
                <li class="item" :class="{'current':currentindex===index}" v-for="(item,index) in singertitle" :data-index='index'>
                    {{item}}
                </li>
            </ul>
        </div>
        <div class="list-fixed" v-show="fixedtitle" ref="fixed">
            <h2 class="fixed-title">{{fixedtitle}}</h2>
        </div>
        <div v-show="data">
            <loading></loading>
        </div>
    </scroll>
</template>
<script>
import scroll from 'base/scroll/scroll'
import { getdata } from 'common/getdom/getdom'
import loading from 'base/loading/loading'
export default {
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    components: {
        scroll,
        loading
    },
    data() {
        return {
            groupy: -1,     //  滑动过程中的实时y轴坐标
            currentindex: 0,     //  滑动到哪个区块之间
            deff: -1
        }
    },
    created() {
        /*
            probeType(必须，否则联动不会生效):
            类型：Number
            默认值：0
            可选值：1、2、3
            作用：有时候我们需要知道滚动的位置。当 probeType 为 1 的时候，会在屏幕滑动停止的时候派发 scroll 事件；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
        */
        this.probeType = 3
        this.touch = {}
        this.monitoring = true
        this.listHeight = []
    },
    methods: {
        loderimg() {
            if (!this.callloderimg) {
                this.callloderimg = true
                this.$refs.scroll.refresh()
            }
        },
        touchshortcut(e) {
            let touchlisttouch = e.touches[0]
            this.touch.y1 = touchlisttouch.clientY
            // 获取当前点击的li的index索引值，重0开始
            let targetindex = getdata(e.target, 'index')
            this.touch.targetindex = targetindex
            this._touch(targetindex)
        },
        ontouchmove(e) {
            this.touch.y2 = e.touches[0].clientY
            // 字体大小12加padding上下值6等于18，|0表示取整
            let delta = (this.touch.y2 - this.touch.y1) / 18 | 0
            // 用当前点击的li的index索引 + 移动的距离
            let moveindex = parseInt(this.touch.targetindex) + delta
            this._touch(moveindex)
        },
        // 模板添加@scroll事件 scroll方法获取实时坐标
        scroll(pos) {
            this.groupy = pos.y
            // console.log(this.groupy) //{x: 0, y: -8}
        },
        listgroupheight() {
            this.listHeight = []
            // 获取listgroup所有li
            let list = this.$refs.listgroup
            let height = 0
            this.listHeight.push(height)
            // 遍历每个li，然后获取每个li的高度
            for (let i = 0; i < list.length; i++) {
                height += list[i].clientHeight
                this.listHeight.push(height)
            }
        },
        _touch(index) {
            // console.log(index)
            //  字母导航栏上下空白区
            // 点击上下空白区域index为null（false），!index为（true），什么也不作直接返回不变
            if (!index) {
                return
            }
            // 滑动到字母导航栏上面空白部分为负值,所以index重置为0，就是第一个高亮
            if (index < 0) {
                index = 0
            }
            this.groupy = -this.listHeight[index]
            this.$refs.scroll.scrollToElement(this.$refs.listgroup[index], 0)
        },
        singersongskip(item) {
            // console.log(item)
            this.$emit('singersongskip', item)
        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this.listgroupheight()
            }, 20)
        },
        groupy(newy) {
            const listHeight = this.listHeight
            // 滚动到顶部
            if (newy > 0) {
                this.currentindex = 0
                return
            }
            // 循环遍历listHeight，获得上一个li高度和下一个li高度
            // 滚动到中间部分
            for (let i = 0; i < listHeight.length - 1; i++) {
                let listheight1 = listHeight[i]
                let listheight2 = listHeight[i + 1]
                // 核心：
                // 当前y轴的移动高度和上一个li高度和下一个li高度之间做对比，可以得出y轴处在哪个li的index索引
                if (-newy >= listheight1 && -newy < listheight2) {
                    this.currentindex = i
                    this.deff = listheight2 + newy
                    return
                }
            }
            // 滚动到底部
            this.currentindex = listHeight.length - 2
        },
        // 标题被顶向上滑动效果
        deff(newval) {
            // 30为标题栏的高度，newval为实时滑动距离
            let fixedtop = (newval > 0 && newval < 30) ? newval - 30 : 0
            if (this.fixedtop === fixedtop) return
            this.fixedtop = fixedtop
            this.$refs.fixed.style.transform = `translate3d(0,${fixedtop}px,0)`
        }
    },
    computed: {
        // 计算处理传入的data数据，得到右侧字母导航栏数据集
        singertitle() {
            return this.data.map((currentValue) => {
                return currentValue.title.substr(0, 1)
            })
        },
        fixedtitle() {
            // 如果y轴坐标大于0
            if (this.groupy > 0) return ''
            return this.data[this.currentindex] ? this.data[this.currentindex].title : ''
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
