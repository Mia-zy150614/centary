import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: 'libray',
    routes: [
        { 
            path: '/', 
            component: () => import('../../components/layout/index.vue'),
            children: [
                {
                    path: '/goods', 
                    name: 'goods-page', 
                    meta: { title: '货物列表', role: 'goods', icon: 'menu_huowu_icon' }, 
                    component: () => import('./views/goods.vue')
                },
                {
                    path: '/goods/add', 
                    name: 'goods-page-add', 
                    meta: { title: '货物添加', role: 'goods', icon: 'menu_huowu_icon' }, 
                    component: () => import('./views/goods-info.vue')
                },
                {
                    path: '/goods/edit',
                    name: 'goods-page-edit',
                    meta: { title: '货物编辑', role: 'goods', icon: 'menu_huowu_icon' },
                    component: () => import('./views/goods-info.vue')
                },
                {
                    path: '/rfq',
                    name: 'rfq-page',
                    meta: { title: '询价管理', role: 'rfq', icon: 'menu_xunjia_icon' },
                    component: () => import('./views/rfq.vue')
                },
                 {
                    path: '/rfq/add',
                    name: 'rfq-add-page',
                    meta: { title: '询价新增', role: 'rfq', icon: 'menu_xunjia_icon' },
                    component: () => import('./views/rfq-info.vue')
                },
                {
                    path: '/quotation',
                    name: 'quotation-page',
                    meta: { title: '报价管理', role: 'quotation', icon: 'menu_baojia_icon' },
                    component: () => import('./views/quotation.vue')
                },
                {
                    path: '/quotation/add',
                    name: 'quotation-page-add',
                    meta: { title: '报价单新增', role: 'quotation', icon: 'menu_baojia_icon' },
                    component: () => import('./views/quotation-info.vue')
                },
                {
                    path: '/quotation/view',
                    name: 'quotation-view-page',
                    meta: { title: '报价单详情', role: 'quotation', icon: 'menu_baojia_icon' },
                    component: () => import('./views/quotation-view.vue')
                },
                {
                    path: '/buyask',
                    name: 'buyask-page',
                    meta: { title: '采购询价', role: 'buyask', icon: 'menu_buyask_icon' },
                    component: () => import('./views/buyask.vue')
                },
                {
                    path: '/buyask/add',
                    name: 'buyask-page-add',
                    meta: { title: '采购询价新增', role: 'buyask', icon: 'menu_buyask_icon' },
                    component: () => import('./views/buyask-info.vue')
                },
                {
                    path: '/buyask/edit',
                    name: 'buyask-page-edit',
                    meta: { title: '采购询价编辑', role: 'buyask', icon: 'menu_buyask_icon' },
                    component: () => import('./views/buyask-info.vue')
                },
                {
                    path: '*',
                    meta: { title: '404', icon: 'icon_404' }, 
                    component: () => import('@/components/error-page/404.vue')
                }
            ]
        },
       
    ]
})