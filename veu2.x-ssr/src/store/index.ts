import Vue from 'vue'
import Vuex from 'vuex'
import initData from './modules/initData'

Vue.use(Vuex)

export default function createStore() {
    return new Vuex.Store({
        state: {},
        mutations: {},
        actions: {},
        modules: {
            initData
        }
    })
}
