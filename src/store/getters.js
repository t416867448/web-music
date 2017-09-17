export const singer = state => state.singer // 歌手数据
// export const singer = function (state) {
//    return state.singer
// }
export const playstate = state => state.playstate // 播放状态（暂停或播放）

export const playshow = state => state.playshow // 播放器显示

export const playlist = state => state.playlist // 播放歌曲列表

export const playoederlist = state => state.playoederlist // 播放歌曲顺序列表

export const playmode = state => state.playmode // 播放状态（顺序、随机、循环）

export const currentplayindex = state => state.currentplayindex // 播放歌曲的index

export const currentplaysong = (state) => { // 当前所播放的歌曲
    return state.playoederlist[state.currentplayindex] || []
}
