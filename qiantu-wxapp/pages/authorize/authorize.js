// pages/authorize/authorize.js
//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // isAuth: false, // 是否授权个人信息
    testBtn: true,
    visible: true,
    value: '3'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("index中的options==",options);
    // console.log("this.data===", this.data.value);
  },
  getUserInfo(e) { // 授权个人信息
    let _this = this;
    if (e.detail.userInfo) { // 已允许
      app.globalData.isAuth = true;
      app.globalData.userInfo = e.detail.userInfo;
      app.globalData.res = e.detail;
      // app.globalData.signature = e.detail.signature;
      // app.globalData.rawData = e.detail.rawData;
      // app.globalData.encryptedData = e.detail.encryptedData;
      // app.globalData.iv = e.detail.iv;
      _this.setData({
        testBtn: false
      })
      wx.showLoading({
        title: '正在跳转',
      })
      wx.login({
        timeout:5000,
        success: function (data) {
          // console.log("data.code===", data)
          if (data.code) {
            wx.request({
              url: `${app.globalData.baseUrl}/wx/user/${app.globalData.appid}/login`,
              data: {
                appid: `${app.globalData.appid}`,
                code: data.code
              },
              method: "get",
              success(msg) {
                console.log("登陆接口返回msg===", msg.data.sessionKey);
                app.globalData.sessionKey = msg.data.sessionKey;

                // session_key初始化为0  代表未登录
                wx.setStorageSync('session_key', msg.data.sessionKey)
                wx.request({
                  url: `${app.globalData.baseUrl}/wx/user/${app.globalData.appid}/info`,
                  data: {
                    appid: `${app.globalData.appid}`,
                    sessionKey: msg.data.sessionKey,
                    signature: e.detail.signature,
                    rawData: e.detail.rawData,
                    encryptedData: e.detail.encryptedData,
                    iv: e.detail.iv
                  },
                  method: "get",
                  success(res) {
                    console.log("info接口返回===", res);
                    _this.goAuthorize()
                    // _this.setData({
                    //   isAuth: true,
                    // }, () => {
                    //   _this.goAuthorize()
                    // })
                  },
                  fail(err){
                    console.log("err==",err);
                  }
                })
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        },
      });
    }
  },
  goAuthorize() { // 去授权
    wx.hideLoading();
    wx.reLaunch({
      // url: "/pages/testdrive/testdrive?return_url=/pages/index/index",
      url: "/pages/index/index?add=" + this.data.value,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

