import Vue from 'vue'
import Router from 'vue-router'
import Index from '@pages/index/Index'
import K20order from '@pages/k20order/K20order'
import Payment from '@pages/payment/Payment'
import Nopage from '@pages/nopage/404'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: 'k20选配',
        keepAlive:false
      }
    },
    {
      path:'/k20order',
      name:'K20order',
      component:K20order,
      meta:{
        title:'提交订单',
        keepAlive:false
      }
    },
    {
      path:'/payment',
      name:'Payment',
      component:Payment,
      meta:{
        title:'付款',
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