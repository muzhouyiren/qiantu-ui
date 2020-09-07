// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

import { UrlSearch } from './utils/func.js'
let Request = new UrlSearch();
Vue.prototype.$Request = Request;

import './filters'
import './directive'
import './veeValidate'
import '@styles/reset.css'
import '@styles/border.css'
// import 'font-awesome/css/font-awesome.min.css'

import 'weui'
import weui from 'weui.js'
Vue.prototype.weui = weui;

// Vue.prototype.$url = 'http://10.10.28.91:8181'
Vue.prototype.$url = 'http://console.qiantumotor.com'
// Vue.prototype.$url = 'http://22185a778b.iok.la:38148'

Vue.config.productionTip = false;

document.body.addEventListener('touchstart', function () { });

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})

