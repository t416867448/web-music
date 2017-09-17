<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    props: {
        data: {
            type: Array,
            defule: null
        },
        /*
            probeType(必须，否则联动不会生效):
            类型：Number
            默认值：0
            可选值：1、2、3
            作用：有时候我们需要知道滚动的位置。当 probeType 为 1 的时候，会在屏幕滑动停止的时候派发 scroll 事件；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
        */
        probeType: {
            type: Number,
            defule: 1
        },
        click: {
            type: Boolean,
            defule: true
        },
        monitoring: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        _init() {
            /* eslint-disable no-new */
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click
            })
            if (this.monitoring) {
                /*
                    添加scroll事件
                    参数：{Object} {x, y} 滚动的实时坐标
                    触发时机：滚动过程中，具体时机取决于选项中的 probeType。
                    获取滚动过程中的实时坐标(x表示横向滚动，y表示纵向滚动)
                    console.log(pos)   //{x: 0, y: -8}
                */
                this.scroll.on('scroll', (pos) => {
                    this.$emit('scroll', pos)
                })
            }
        },
        enable() {
            this.scroll.enable()
        },
        refresh() {
            this.scroll.refresh()
        },
        scrollToElement() {
            this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
    },
    mounted() {
        this._init()
    },
    watch: {
        data() {
            // 加延迟是为等dom渲染完，20毫秒是一个经验值
            setTimeout(() => {
                this.refresh()
            }, 20)
        }
    }
}
</script>
