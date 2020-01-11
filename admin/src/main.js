import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/style.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import  http from '@/plugins/http.js'
// use
Vue.use(mavonEditor)


Vue.prototype.$vm=mavonEditor

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')