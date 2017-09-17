import vue from 'vue'
import vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createlogger from 'vuex/dist/logger'
vue.use(vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new vuex.Store({
   actions,
   getters,
   state,
   mutations,
   strict: debug,
   plugins: debug ? [createlogger()] : []
})
