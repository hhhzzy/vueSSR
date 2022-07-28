import Vue from 'vue'
import Vuex from 'vuex'
import initData from './modules/initData'

Vue.use(Vuex)
// export default new Vuex.Store({
//     modules: {
//         test
//     }
// })

export default function createStore () {
    return new Vuex.Store({
        modules: {
            initData
        }
    })
}