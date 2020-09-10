import '@/config/main-config'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import validateRouter from '@/utils/router-utils'
validateRouter(router)
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#page')