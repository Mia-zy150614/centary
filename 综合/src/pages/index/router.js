import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import login from './views/login.vue'
import entrance from './views/entrance.vue'

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', name: 'login', meta: { title: '登录' }, component: login },
        { path: '/entrance', name: 'entrance', meta: { title: '首页' }, component: entrance },
        {
            path: '*',
            meta: { title: '404', icon: 'icon_404' }, 
            component: () => import('@/components/error-page/404.vue')
        }
    ]
})