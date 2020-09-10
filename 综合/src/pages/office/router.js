import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: 'office',
    routes: [
        { 
            path: '/', 
            component: () => import('../../components/layout/index.vue'),
            children: [
                {
                    path: '/personnel',
                    name: 'personnel-page',
                    meta: { title: '人事架构', role: 'personnel', icon: 'menu_personnel_icon' },
                    component: () => import('./views/personnel.vue')
                },
                {
                    path: '/personnel/view',
                    name: 'personnel-view-page',
                    meta: { title: '人员详情', role: 'personnel', icon: 'menu_personnel_icon' },
                    component: () => import('./views/personnel-info.vue')
                },
                {
                    path: '/personnel/edit',
                    name: 'personnel-edit-page',
                    meta: { title: '人员编辑', role: 'personnel', icon: 'menu_personnel_icon' },
                    component: () => import('./views/personnel-info.vue')
                },
                {
                    path: '/contractlist', 
                    name: 'contractlist-page', 
                    meta: { title: '合同列表', role: 'contractlist', icon: 'menu_hetong_icon' }, 
                    component: () => import('./views/contractlist.vue')
                },
                {
                    path: '/contractlist/add', 
                    name: 'contractlist-page-add', 
                    meta: { title: '新增合同', role: 'contractlist', icon: 'menu_hetong_icon' }, 
                    component: () => import('./views/contract-info.vue')
                },
                {
                    path: '/contractlist/view', 
                    name: 'contractlist-page-view', 
                    meta: { title: '合同详情', role: 'contractlist', icon: 'menu_hetong_icon' }, 
                    component: () => import('./views/contract-info.vue')
                },
                {
                    path: '/contractlist/edit', 
                    name: 'contractlist-page-edit', 
                    meta: { title: '合同编辑', role: 'contractlist', icon: 'menu_hetong_icon' }, 
                    component: () => import('./views/contract-info.vue')
                },
                {
                    path: '/contracttemplate', 
                    name: 'contracttemplate-page', 
                    meta: { title: '合同模板', role: 'contracttemplate', icon: 'menu_hetong_icon' }, 
                    component: () => import('./views/contracttemplate.vue')
                },
                {
                    path: '/contracttemplate/add', 
                    name: 'contracttemplate-page-add', 
                    meta: { title: '合同模板新增', role: 'contracttemplate', icon: 'menu_hetong_icon' }, 
                    component: () => import('./views/contracttemplate-info.vue')
                },
                {
                    path:'/leave',
                    name:'apply-page',
                    meta:{title:'请假申请', role: 'contracttemplate', icon: 'menu_hetong_icon'},
                    component:()=>import ('./views/apply.vue')
                },
                {
                    path:'/leave/add',
                    name:'apply-page-add',
                    meta:{title:'请假申请', role: 'contracttemplate', icon: 'menu_hetong_icon'},
                    component:()=>import ('./views/apply-info.vue')
                },
                {
                    path:'/leave/view',
                    name:'apply-page-view',
                    meta:{title:'申请详情', role: 'contracttemplate', icon: 'menu_hetong_icon'},
                    component:()=>import ('./views/apply-info.vue')
                },
                 {
                    path:'/leave/edit',
                    name:'apply-page-edit',
                    meta:{title:'申请详情', role: 'contracttemplate', icon: 'menu_hetong_icon'},
                    component:()=>import ('./views/apply-info.vue')
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