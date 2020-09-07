
import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)


const $urllocal = 'http://22185a778b.iok.la:55281'

class GetOpenid{
    init(next){
        alert('localstorage'+localStorage.getItem("openid"))
        alert('cookie'+window.$cookies.get("openid"))
        let openid = localStorage.getItem("openid") || window.$cookies.get("openid")
        if(openid && openid!=='null' && openid!=='undefined'){
            alert('缓存或者链接有值'+openid)
            next()
        }else{
            if(this.getQueryString('openid')){
                alert(this.getQueryString('openid')+"缓存中没有，链接上有")
                localStorage.setItem("openid", openid)
                window.$cookies.set("openid", openid)
                next()
            }else{
                alert('缓存没有，链接没有')
                window.location.assign(`http://weixin.qiantumotor.com/wmt-interface/toAuthorize/gh_79a4b57e7c7a/base?redirectUrl=${encodeURIComponent($urllocal)}&state=state`)
            }
        }
    }
    getQueryString(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); 
        return null; 
    } 
}

export default GetOpenid

