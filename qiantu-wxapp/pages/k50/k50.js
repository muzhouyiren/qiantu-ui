//k50.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuth: false, // 是否授权个人信息
    testBtn: true,
    visible: true,
    swiperImages: [{
      imgurl: '../../assets/images/img5.jpg',
      title: '灵动外观设计',
      des: '天地线赋予整车低矮前冲的姿态，深眉弓让前灯深邃富有神秘，流畅而顺滑的车身线营造舒适的感觉，整体造型温和而犀利，柔美而有力。'
    }, {
      imgurl: '../../assets/images/img6.jpg',
      title: '极致跑车驾趣',
      des: 'BREMBO（布雷博）固定式对向四活塞卡钳保证强大制动力，锻造轻量化铝合金设计轮辋提升动态响应性，倍耐力P  ZREO高性能运动型轮胎强大抗滑能力、抓地力。极客装备共同造就跑车级极致精准驾控乐趣。'
    }, {
      imgurl: '../../assets/images/img7.jpg',
      title: '轻量化效果更优',
      des: '高效、先进的全铝合金框架式车身结构，更聪明地使用铝材。29个碳纤维复合材料外覆件，造就前途K50更轻灵的车身。集中更多纯电所能，全力助力你的驾驶乐趣。'
    }, {
      imgurl: '../../assets/images/img8.jpg',
      title: '卓越续航能力',
      des: '独创RESS可充电能量储存系统，及整车控制管理系统（VCU），提升整车效率管理及续航能力。NEDC综合工况续航里程超过380公里。'
    }],
    indicatorDots: true,//是否有点
    vertical: false,//水平垂直显示
    autoplay: true,//自动播放
    circular: true,//循环播放
    interval: 6000,//切换时长
    duration: 500,//间隔时常
    previousMargin: 0,//前边距
    nextMargin: 0,//后边距
    value: '3'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("index中的options==",options);
    console.log("this.data===", this.data.value);
  },
  getPhoneNumber(e) {
    let _this = this;
    console.log("e---==", e);
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    console.log("app.globalData.signature==", app.globalData.signature)
    console.log('app.globalData.rawData===', app.globalData.rawData)
    console.log("app.globalData.encryptedData--===", app.globalData.encryptedData)
    console.log("app.globalData.iv---", app.globalData.iv)
    console.log("app.globalData.sessionKey===", app.globalData.sessionKey);
    _this.setData({
      testBtn: false
    })
    wx.showLoading({
      title: '正在跳转',
    })
    wx.request({
      url: `${app.globalData.baseUrl}/wx/user/${app.globalData.appid}/phone`,
      data: {
        appid: `${app.globalData.appid}`,
        sessionKey: app.globalData.sessionKey,
        signature: app.globalData.signature,
        rawData: app.globalData.rawData,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      },
      method: "get",
      success(res) {
        console.log("phone接口返回===", res);
        console.log("phoneNumber==", res.data.phoneNumber);
        app.globalData.phoneNumber = res.data.phoneNumber;
        _this.setData({
          isAuth: true,
        }, () => {
          _this.goAuthorize()
        })
      },
      fail(err) {
        console.log("err==", err);
      }
    })
  },
  goAuthorize() { //跳转首页
    wx.hideLoading();
    wx.navigateTo({
      url: "/pages/testdrive/testdrive?add=" + this.data.value,
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

