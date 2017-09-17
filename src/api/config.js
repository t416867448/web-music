// 公共参数
const commonparent = {
   g_tk: 94835077,
   jsonCallback: 'GetSingerListCallback',
   loginUin: 0,
   hostUin: 0,
   format: 'json',
   inCharset: 'utf8',
   outCharset: 'utf-8',
   notice: 0,
   platform: 'yqq',
   needNewCode: 0
}
// 轮播图参数
export const bannerparent = {
   g_tk: 5381,
   uin: 0,
   format: 'json',
   inCharset: 'utf-8',
   outCharset: 'utf-8',
   notice: 0,
   platform: 'h5',
   needNewCode: 1,
   _: new Date().getTime()
}
// 首页热门歌曲参数
export const hotmusicparent = Object.assign({}, commonparent, {
   tpl: 'v12',
   page: 'other',
   callback: 'GetRecomListCallback' + Math.random(),
   rnd: Math.random()
})
// 歌手页歌手参数
export const singerparent = Object.assign({}, commonparent, {
   channel: 'singer',
   page: 'list',
   key: 'all_all_all',
   pagesize: 100,
   pagenum: 1
})
// 歌手歌单参数
export function singersongparent(singerid) {
   return Object.assign({}, commonparent, {
      singermid: singerid,
      order: 'listen',
      begin: 0,
      num: 30,
      songstatus: 1
   })
}
export const url = {
   // 轮播图数据url
   sliderurl: '/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
   // 首页热门歌曲url
   hotmusilist: 'v8/fcg-bin/fcg_first_yqq.fcg',
   // 歌手页歌手数据url
   singerurl: 'v8/fcg-bin/v8.fcg',
   // 歌手歌单数据url
   singersongurl: 'v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
}
