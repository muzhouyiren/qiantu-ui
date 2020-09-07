//app.js

//app.js
const util = require('./utils/util.js');
App({
  onLaunch: function () {
    // session_key初始化为0  代表未登录
    var session_key = wx.getStorageSync('session_key') || '0';
    wx.setStorageSync('session_key', session_key);
    var aa = wx.getStorageSync('session_key');
    console.log("session_key===", aa);

    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || [];
    // console.log("logs===",logs);
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.globalData.isAuth = true;
          console.log("获取授权")
          wx.getUserInfo({// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            lang: "zh_CN",
            success: res => {
              this.globalData.userInfo = res.userInfo;// 可以将 res 发送给后台解码出 unionId
              this.globalData.res = res;// 可以将 res 发送给后台解码出 unionId
              console.log("this.globalData.userInfo==", this.globalData.res);
              // this.loginFun(1) // 获取登录态
              wx.reLaunch({
                url: '/pages/index/index',
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else {
          console.log("没有授权")
          this.globalData.isAuth = false
          wx.reLaunch({
            url: '/pages/authorize/authorize',
          })
          // this.loginFun(1) // 获取登录态	 	
        }
      }
    })
  },
  // 为了解决onLaunch异步问题
  isBackRefresh() {
    if (getCurrentPages().length != 0) {
      this.globalData.flag = true;
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    } else {
      this.globalData.flag = true;
    }
  },
  /**
  * 登录方法
  * 
  * 参数type: 存在时表示只为获取登录态，即便没登录也不会跳转（onLaunch中使用）
  * 			无参数时，如果没登录，会跳转到授权页(pages中使用)
  */
  loginFun(type) {
    let _this = this
    wx.showLoading({
    	title: '正在登录',
    })
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({ // 验证是否登录
          url: `${_this.globalData.baseUrl}/wx/user/${_this.globalData.appid}/login`,
          data: {
            appid: `${_this.globalData.appid}`,
            code: res.code
          },
          method: "get",
          success(msg) {
            wx.hideLoading()
            if (msg.data.sessionKey) { // 已经登录了
              _this.globalData.isLogin = true
              _this.globalData.isAuth = true
              wx.setStorageSync('session_key', msg.data.sessionKey);
      
              wx.request({
                url: `${_this.globalData.baseUrl}/wx/user/${_this.globalData.appid}/info`,
                data: {
                  appid: `${_this.globalData.appid}`,
                  sessionKey: msg.data.sessionKey,
                  signature: _this.globalData.res.signature,
                  rawData: _this.globalData.res.rawData,
                  encryptedData: _this.globalData.res.encryptedData,
                  iv: _this.globalData.res.iv
                },
                method: "get",
                success(res) {
                  console.log("info接口返回===", res);
                  wx.reLaunch({
                    url: '/pages/index/index',
                  })
                },
                fail(err) {
                  console.log("err==", err);
                }
              })
            } else {
              _this.globalData.isLogin = false
              if (!type) {
                wx.reLaunch({
                  url: '/pages/authorize/authorize',
                })
              }
            }
            _this.isBackRefresh() // 解决onlaunch异步
          },
          fail(err) {
            wx.hideLoading()
            _this.globalData.isLogin = false
            if (!type) {
              wx.reLaunch({
                url: '/pages/authorize/authorize',
              })
            }
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    baseUrl: util.url,
    appid: util.appid,
    isLogin: false, // 是否登录
    isAuth: false, // 是否授权个人信息
    res: null, //
    phoneNumber: ''
    // encryptedData: '', // 授权个人信息时的加密
    // iv: '', // 授权个人信息时的加密

  },
  ajax: util.ajax,
  formatTime: util.formatTime,
  formatTimeDot: util.formatTimeDot
})
