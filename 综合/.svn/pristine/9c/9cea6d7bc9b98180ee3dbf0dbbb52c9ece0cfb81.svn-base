/* main.js 公共配置 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
import '../../theme/index.css'
import '../style/reset.css'
import '../style/common.scss'
import '../style/font/iconfont.css' // 字体图标css
import '../style/font/iconfont.js' // 字体图标js

// Vue 全局属性方法
import { VuePrototype, customizeComponent } from './vueprototype'
VuePrototype(Vue)
customizeComponent(Vue)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}