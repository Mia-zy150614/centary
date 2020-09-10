import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import * as getters from './getter'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

import userStore from './modules/user-info'

export default new Vuex.Store({
    state: {
        basepath: null,
        activeMenu: null,
    },
    mutations: {
        setBasepath(state, value) {
            state.basepath = value
        },
        setActiveMenu(state, value) {
            state.activeMenu = value
        }
    },
    actions: {
        
    },
    getters: getters,
    modules: {
        userStore
    },
    plugins: [vuexLocal.plugin]
})
