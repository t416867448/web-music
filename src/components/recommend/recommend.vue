<template>
    <div class="recommend">
        <wrapper ref='scroll' class="recommend-content" :data='hotmusic'>
            <div>
                <slider v-if="!flag" :sliderdata='sliderdata'></slider>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li class="item" v-for="item in hotmusic">
                            <div class="icon">
                                <img @load='loderimg' width="60" height="60" v-lazy="item.imgurl">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.author"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-show="!hotmusic.length">
                <loading></loading>
            </div>
        </wrapper>
    </div>
</template>
<script>
import api from 'common/router/config'
import wrapper from 'base/scroll/scroll'
import slider from 'base/slider/slider'
import loading from 'base/loading/loading'
export default {
    data() {
        return {
            sliderdata: [],
            hotmusic: [],
            flag: true
        }
    },
    methods: {
        getbannerimg() {
            api.getbanner().then((data) => {
                if (data.data.code === 0) {
                    this.sliderdata = data.data.data.slider
                    this.flag = false
                }
            })
        },
        gethotmusicdata() {
            api.gethotmusic().then((data) => {
                if (data.data.code === 0) {
                    this.hotmusic = data.data.data.hotdiss.list
                    this.flag = false
                    console.log(this.hotmusic.list)
                }
            })
        },
        loderimg() {
            if (!this.callloderimg) {
                this.callloderimg = true
                this.$refs.scroll.refresh()
            }
        }
    },
    mounted() {
        this.getbannerimg()
        this.gethotmusicdata()
    },
    components: {
        slider,
        wrapper,
        loading
    }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
