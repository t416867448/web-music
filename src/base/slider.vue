<template>
    <div class="swiper-container" id="swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in sliderdata">
                <a :href="item.linkUrl">
                    <img class="swiper-img"  :src="item.picUrl" />
                </a>
            </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
    </div>
</template>
<script>
import Swiper from 'swiper'
export default {
    props: {
        sliderdata: {
            type: Array,
            defalue: []
        }
    },
    methods: {
        sliderplay() {
            setTimeout(() => {
                /* eslint-disable no-new */
                new Swiper('#swiper', {
                    loop: true,
                    pagination: '.swiper-pagination',
                    autoplay: 2000
                })
            }, 20)
        }
    },
    mounted() {
        this.sliderplay()
    }
}
</script>
<style  scoped>
@import '~swiper/dist/css/swiper.min.css';
    .swiper-img{
        width: 100%
    }
</style>

