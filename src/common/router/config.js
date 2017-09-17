import axios from 'axios'
import {
   url,
   bannerparent,
   hotmusicparent,
   singerparent,
   singersongparent
} from '../../api/config'
export default {
   // 获取轮播图
   getbanner() {
      return axios.get('/api' + url.sliderurl, {
         params: bannerparent
      })
   },
   //    首页热门歌曲
   gethotmusic() {
      return axios.get('/api' + url.hotmusilist, {
         params: hotmusicparent
      })
   },
   //    歌手页数据
   getsinger() {
      return axios.get('/api' + url.singerurl, {
         params: singerparent
      })
   },
   // 歌手歌单数据
   getsingersong(singerid) {
      return axios.get('/api' + url.singersongurl, {
         params: singersongparent(singerid)
      })
   }
}
