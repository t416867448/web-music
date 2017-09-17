import * as types from './mutations-types'
const mutations = {
   [types.SET_SINGER](state, singer) {
      state.singer = singer // 歌手数据
   },
   [types.SET_PLAYSTATE](state, flag) {
      state.playstate = flag // 播放状态（暂停或播放）
   },
   [types.SET_PLAYSHOW](state, flag) {
      state.playshow = flag // 播放器显示
   },
   [types.SET_PLAYLIST](state, list) {
      state.playlist = list // 播放歌曲列表
   },
   [types.SET_PLAYORDERLIST](state, list) {
      state.playoederlist = list // 播放歌曲顺序列表
   },
   [types.SET_PLAYMODE](state, mode) {
      state.playmode = mode // 播放状态（顺序、随机、循环）
   },
   [types.SET_CURRENTPLAYMODEINDEX](state, index) {
      state.currentplayindex = index // 播放歌曲的index
   }
}
export default mutations
