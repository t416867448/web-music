import * as types from './mutations-types'
export const play = function ({ commit, state }, { list, index }) {
    // console.log(list)
    // console.log(index)
    commit(types.SET_PLAYSTATE, true)
    commit(types.SET_PLAYSHOW, true)
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_PLAYORDERLIST, list)
    commit(types.SET_CURRENTPLAYMODEINDEX, index)
}
