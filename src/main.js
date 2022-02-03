import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import './assets/css/element-variables.scss'
import './assets/css/index.scss'
/** icons 图标*/
import '@/icons'
/** vuex*/
import store from './store'
/** 打印*/
import Print from 'vue-print-nb'
/** 不添加这个插件会报错*/
import fragment from 'vue-fragment'
/** 权限*/
import './utils/permission.js'
Vue.use(ElementUI);
Vue.use(Print);
Vue.use(fragment.Plugin)
Vue.config.productionTip = false
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
