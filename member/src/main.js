// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import http from './plugins/http'
import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from './store'
import './filters'
import './directive'
import './veeValidate'

import '@styles/reset.css'
import '@styles/border.css'
import 'font-awesome/css/font-awesome.min.css'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)

document.body.addEventListener('touchstart', function () { });

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>',
	beforeCreate() {
		let _this = this;
		this.wx.ready(function () {
			_this.wx.hideOptionMenu();
		  })
	}
})

