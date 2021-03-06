/* 用户信息 */
import { permission } from '../utils'
import Session from '@/utils/session-util'
export default {
    namespaced: true,
    state: {
        token: null, // 登录签名
        user: null, // 用户信息
        subSystems: null, // 子系统
        bottons: null, // 按钮权限
    },
    mutations: {
        setToken(state, value) {
            state.token = value
        },
        setUser(state, value) {
            state.user = value
        },
        setSystems(state, value) {
            state.subSystems = value
        },
        setBottons(state, value) {
            state.bottons = value
        }
    },
    actions: {
        async sessionUserinfo({ commit }, value) {
            const { token, userinfo } = value;
            const { subSystems, buttons, user } = userinfo
            commit('setToken', token)
            commit('setUser', user)
            commit('setBottons', buttons)
            // 权限菜单组件 及 默认跳转 子系统
            const subSystem =  await permission(subSystems)
            commit('setSystems', subSystem)
            // 带有时间的 token 缓存 
            Session.setLocalSession('token', token)
            // 默认跳转的子系统
            const systemTitles = Object.keys(subSystem)
            if(systemTitles.length) {
                return systemTitles[0]
            }
            return null
        }
    }
}