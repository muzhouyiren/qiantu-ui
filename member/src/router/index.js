import Vue from 'vue'
import Router from 'vue-router'
import SaveMemberInfo from '@pages/saveMemberInfo/saveMemberInfo'
import Index from '@pages/index/index'
import Register from '@pages/register/register'
import ActivateSuccess from '@pages/activatesuccess/activatesuccess'
import Member from '@pages/member/member'
import Activity from '@pages/activity/activity'
import EarnPoints from '@pages/earnPoints/earnPoints'
import MyPoint from '@pages/MyPoint/MyPoint'
import Level from '@pages/level/level'
import Rights from '@pages/rights/rights'
import MyActivity from '@pages/myActivity/myActivity'
import ShareQrcode from '@pages/shareQrcode/shareQrcode'
import Protocal from '@pages/protocal/protocal'
import ShareActivity from '@pages/shareActivity/shareActivity'
import Coffee from '@pages/coffee/Coffee'
import Nopage from '@pages/nopage/404'

import { testConf,baseConf } from '@/plugins/config.js'

import axios from 'axios'
import VueCookies from 'vue-cookies'
import 'weui'
import weui from 'weui.js'
import wx from 'weixin-js-sdk'
Vue.use(VueCookies)
Vue.use(Router)
Vue.prototype.wx = wx;

// 测试
// Vue.prototype.$useConf = testConf;
// let $useConf = testConf;

// 正式
Vue.prototype.$useConf = baseConf;
let $useConf = baseConf;

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: "/member",
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {
        title: '成为会员'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: '激活会员卡'
      }
    },
    {
      path: '/activatesuccess',
      name: 'ActivateSuccess',
      component: ActivateSuccess,
      meta: {
        title: '激活成功'
      }
    },
    {
      path: '/saveMemberInfo',
      name: 'SaveMemberInfo',
      component: SaveMemberInfo,
      meta: {
        title: '会员信息完善'
      }
    },
    {
      path: '/member',
      name: 'Member',
      component: Member,
      meta: {
        title: '前途驿会员卡'
      }
    },
    {
      path: '/activity',
      name: 'Activity',
      component: Activity,
      meta: {
        title: '活动报名'
      }
    },
    {
      path: '/earnPoints',
      name: 'EarnPoints',
      component: EarnPoints,
      meta: {
        title: '如何赚取积分'
      }
    },
    {
      path: '/myPoint',
      name: 'MyPoint',
      component: MyPoint,
      meta: {
        title: '我的积分'
      }
    },
    {
      path: '/level',
      name: 'Level',
      component: Level,
      meta: {
        title: '会员入会&会员等级'
      }
    },
    {
      path: '/rights',
      name: 'Rights',
      component: Rights,
      meta: {
        title: '会员权益说明'
      }
    },
    {
      path: '/myActivity',
      name: 'MyActivity',
      component: MyActivity,
      meta: {
        title: '我的活动'
      }
    },
    {
      path: '/shareQrcode',
      name: 'ShareQrcode',
      component: ShareQrcode,
      meta: {
        title:'分享二维码'
      }
    },
    {
      path:'/protocal',
      name:'Protocal',
      component:Protocal,
      meta:{
        title:'微信公众号用户服务协议'
      }
    },
    {
      path:'/shareActivity',
      name:'ShareActivity',
      component:ShareActivity,
      meta:{
        title:'前途驿活动签到'
      }
    },
    {
      path:'/coffee',
      name:'Coffee',
      component:Coffee,
      meta:{
        title:''
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

function getOpenIdApi() {
  return axios.get('/front/webAuth/getOpenId');
}
async function getOpenId(fn) {
  try {
    let { data } = await getOpenIdApi();
    if (data.success) {
      fn(data.data);
    } else {
      let originUrl = location.href.split('#')[0];
      let pageUrl = location.href.split('#')[1].slice(1, location.href.split('#')[1].length) || '';
      location.assign($useConf.oriUrl+'/front/webAuth/authorize?redirectUrl=' + originUrl + '&redirectPage=' + pageUrl);
    }
  } catch (error) {
    console.log(error);
  }
}

function getMemberTypeApi(params) {
  return axios.post('/front/member/getMemberType', params)
}
async function getMemberType(params, next) {
  try {
    let { data } = await getMemberTypeApi(params);
    if (data.success) {
      switch (data.data) {
        case 1:
          next({ path: '/index', replace: true })
          break;
        case 2:
          next({ path: '/register', replace: true })
          break;
        case 3:
          next({ path: '/activatesuccess', replace: true })
          break;
        default:
          next()
          break;
      }
    } else {
      weui.alert(data.msg);
    }
  } catch (error) {
    console.log(error)
  }
}

function handleFn(to) {
  if (to) {
    document.title = to.meta.title
  }
  if (to.name == 'Index') {
    document
      .querySelector("html")
      .setAttribute("style", "background-color:#f5f5f5");
  } else {
    document
      .querySelector("html")
      .setAttribute("style", "background-color:#fff");
  }
}
//2.获取到openid之后初始化wx.config
function handleOpenId(openid, to, next) {
  if (firstEnter == 1) {
    let url = window.location.href.split("#")[0];
    axios.post('/front/wxapi/getJsTicket', { url: url })
      .then((res) => {
        let { data } = res;
        if (data.success) {
          wx.config({
            debug: false,
            appId: data.data.appId,
            timestamp: data.data.timestamp,
            nonceStr: data.data.nonceStr,
            signature: data.data.signature,
            jsApiList: ['hideOptionMenu','showMenuItems','hideMenuItems', "addCard","onMenuShareAppMessage"]
          });
          handleOpenIdEnter(openid, to, next)
        } else {
          weui.alert(data.msg);
        }

      }).catch((err) => { console.log(err) })
  }else{
    handleOpenIdEnter(openid, to, next)
  }

}
//3.判断是否是member页面，进行不同的跳转
function handleOpenIdEnter(openid, to, next){
  if (to.name == 'Member') {
    getMemberType({ openid: openid }, next)
  } else {
    next();
  }
}
//1.判断第一次进入从服务端获取openid
function handleRouter(to, next) {
  firstEnter++;
  if (firstEnter == 1){
    getOpenId(function (openid) {
      localStorage.setItem("openId", openid);
      window.$cookies.set("openId", openid);
      handleOpenId(openid, to, next)
    });
  }else{
    let openid = localStorage.getItem("openId") || window.$cookies.get("openId");
    handleOpenId(openid, to, next)
  }
}

let firstEnter = 0;
router.beforeEach((to, from, next) => {
  handleFn(to);//自定义title和背景颜色
  handleRouter(to, next) 
  // next();
})

router.afterEach((to, from, next) => {
  // let url = location.href;
  // wx.ready(function () {
  //   wx.onMenuShareAppMessage({
  //     title:"当前分享的标题",
  //     desc:'当前页面的分享描述',
  //     link:location.origin+"/web/index.html#"+to.path,
  //     imgUrl:'http://test.qanto.cn/web/static/img/logo.b7f0d10.png',
  //     success:function(){
  //       alert("分享成功");
  //     }
  //   })
  // })
})

export default router;