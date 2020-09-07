// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'


import './filters'
import './directive'
import './veeValidate'
import '@styles/reset.css'
import '@styles/border.css'

// import iView from 'iview'
import 'iview/dist/styles/iview.css'
// Vue.use(iView)

import 'weui'
import weui from 'weui.js'
Vue.prototype.$weui = weui

import { UrlSearch } from './utils/func.js'
let Request = new UrlSearch()
Vue.prototype.$request = Request

// Vue.prototype.$url = 'http://10.10.28.79:8181'
Vue.prototype.$url = 'http://console.qiantumotor.com'
// Vue.prototype.$url = 'http://console.qiantumotor.com'

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

