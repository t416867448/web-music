import {
    playmode
} from 'common/storeconfig/storeconfig'
const state = {
   singer: {}, // 歌手数据
   playstate: false, // 播放状态（暂停或播放）
   playshow: false, // 播放器显示
   playlist: [], // 播放歌曲列表
   playoederlist: [], // 播放歌曲顺序列表
   playmode: playmode.order, // 播放状态（顺序、随机、循环）
   currentplayindex: -1 // 播放歌曲的index
}
export default state
