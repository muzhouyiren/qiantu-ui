import Vue from 'vue'
import Router from 'vue-router'
import Index from '@pages/index/Index'
import MsgSuccess from '@pages/msgSuccess/MsgSuccess'
import Nopage from '@pages/nopage/404'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: '驾趣行注册',
        keepAlive:false
      }
    },
    {
      path: '/msgSuccess',
      name: 'MsgSuccess',
      component: MsgSuccess,
      meta: {
        title: '提交成功',
        keepAlive:false
      }
    },
    {
      path:'*',
      name:'Nopage',
      component:Nopage,
      meta: {
        title:'页面不存在',
        keepAlive:false
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})


export default router;