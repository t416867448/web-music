<template>
    <div class="singer">
        <singer @singersongskip='singersongskip' :data='singersdata'></singer>
        <router-view></router-view>
    </div>
</template>
<script>
import api from 'common/router/config'
import Singerclass from 'common/singerclass/singerclass'
import singer from 'base/singer/singer'
import { mapMutations } from 'vuex'
const HOT_NAME = '热门'
export default {
    components: {
        singer
    },
    data() {
        return {
            singersdata: []
        }
    },
    methods: {
        singersongskip(item) {
            this.$router.push({
                path: `/singer/${item.id}`
            })
            // console.log(item)
            this.setsinger(item)
            // console.log(item)
        },
        getsinger() {
            api.getsinger().then((data) => {
                this.singersdata = this.reorganizedata(data.data.data.list)
                // console.log(this.singersdata)
            })
        },
        // 数据处理
        reorganizedata(list) {
            let singerdata = {
                hot: {
                    title: HOT_NAME,
                    items: []
                }
            }
            list.forEach((item, index) => {
                // 获取前10条作为热门数据
                if (index < 10) {
                    singerdata.hot.items.push(new Singerclass({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name
                    }))
                }
                // 获取item.Findex的值，如果未定义就创建
                const key = item.Findex
                if (!singerdata[key]) {     // 非undefined == true
                    singerdata[key] = {
                        title: key,
                        items: []
                    }
                }
                singerdata[key].items.push(new Singerclass({
                    id: item.Fsinger_mid,
                    name: item.Fsinger_name
                }))
            })
            // 对数据进行处理，
            let hotdata = []    // 热门为一组数据
            let singerlistdata = []     // 字母排序为一组数据
            for (let key in singerdata) {   // 循环数据得到所有键的数据
                if (singerdata[key].title === HOT_NAME) {   // 如果循环到的数据等于热门，
                    hotdata.push(singerdata[key])           // 就添加进去hotdata
                } else if (singerdata[key].title.match(/[a-zA-Z]/)) {   // 如果循环到的数据是a-z，
                    singerlistdata.push(singerdata[key])                // 就添加进去singerlistdata
                }
            }
            // 按照字母顺序排序
            singerlistdata.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            // console.log(hotdata)
            // 合并数组
            return hotdata.concat(singerlistdata)
        },
        ...mapMutations({
            setsinger: 'SET_SINGER'
        })
    },
    mounted() {
        this.getsinger()
    }
}
</script>
<style lang="stylus" scoped>
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
