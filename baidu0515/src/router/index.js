import Vue from 'vue'
import Router from 'vue-router'
import Index from '@pages/index/index'
import Nopage from '@pages/nopage/404'

import axios from 'axios'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: '前途K50城市巡展'
      }
    },
    {
      path:'*',
      name:'Nopage',
      component:Nopage,
      meta: {
        title:'前途K50城市巡展'
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