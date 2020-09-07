import Vue from 'vue'
import Router from 'vue-router'
import Index from '@pages/index/Index'
import Authorization from '@pages/authorization/Authorization'
import Nopage from '@pages/nopage/404'

import 'weui'
import weui from 'weui.js'
Vue.prototype.$weui = weui;

Vue.use(Router)

Vue.prototype.$url = 'http://console.qiantumotor.com'

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: '前途K50上市一周年',
        keepAlive:false
      }
    },
    {
      path: '/authorization',
      name: 'Authorization',
      component: Authorization,
      meta: {
        title: '个人信息授权书',
        keepAlive:false
      }
    },
    {
      path:'*',
      name:'Nopage',
      component:Nopage,
      meta: {
        title:'页面不存在'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
})


export default router;