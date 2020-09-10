import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: 'finance',
    routes: [
        { 
            path: '/', 
            component: () => import('../../components/layout/index.vue'),
            children: [
                {
                    path: '/pay', 
                    name: 'pay-page', 
                    meta: { title: '工资管理', role: 'pay', icon: 'menu_huowu_icon' }, 
                    component: () => import('./views/pay.vue')
                },
                {
                    path: '*',
                    meta: { title: '404', icon: 'icon_404' }, 
                    component: () => import('@/components/error-page/404.vue')
                }
            ]
        }
    ]
})