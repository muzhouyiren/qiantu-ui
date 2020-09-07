
const app = getApp()
import WxValidate from '../../utils/WxValidate'
import DicData from '../../utils/dicData'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    citysArr: [],
    radioItems: [{ 
      code: '1', 
      value: '先生' 
    },{ 
      code: '0', 
      value: '女士'
    }]
  },
  bindProvinceArrPickerChange:function(e){//切换省份
    // console.log('picker发送选择改变，携带值为', e.detail)
    this.setData({
      provinceId: e.detail.value || ''
    })
    var _provinces = DicData.provinces;
    // console.log("_provinces[e.detail.value].id==", _provinces[e.detail.value].id);
    var _citys = DicData.citys;
    this.data.citysArr = [];
    for(var i in _citys){
      if (_provinces[e.detail.value].id == _citys[i].parent){
        this.data.citysArr.push(_citys[i])
      }
    }
    this.setData({
      cityArr: this.data.citysArr,
      cityId: ''
    })
  },
  bindPickerChange: function (e) {//切换城市
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      cityId: e.detail.value
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  formSubmit: function (e) {
    const params = e.detail.value
    if(params.userName.trim() == ""){
      this.showModal({msg:"姓氏不能为空！"})
      return false
    }
    console.log(params)
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    let { userName, mobile, province, city, gender  } = e.detail.value;
    if (gender == "1"){
      userName = userName.trim() + "先生"
    }else{
      userName = userName.trim() + "女士"
    }
    wx.showLoading({
      title: '正在提交',
    })
    
    wx.request({
      url: `${app.globalData.baseUrl}/wx/dt/${app.globalData.appid}/save`,
      method: 'get',
      data:{
        userName: userName,
        mobile: mobile,
        province: province,
        city: city,
        gender: gender
      },
      success(res) {
        wx.hideLoading();
        if (res.data.success == true){
          wx.navigateTo({
            url: "/pages/success/success"
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          showCancel: false,
          // content: '请求超时，请退出重新扫码！',
          content: '请求超时，请退出重新提交！',
          success: function () {
            wx.redirectTo({
              url: '/pages/index/index'
            })
          }
        })
      }
    })
  },
  toIndex: function(){
    wx.reLaunch({
      url: "/pages/index/index"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options===", options)
    this.initValidate();
    this.setData({
      provinceArr: DicData.provinces,
      mobile: app.globalData.phoneNumber || ""
    })
    var provincesA = DicData.provinces;
    var citysA = DicData.citys
    var _provinceId, _cityId;
    for (var i in provincesA) {
      if (provincesA[i].name.indexOf(app.globalData.userInfo.province) != -1) {
        console.log("provincesA[i].id===", provincesA[i].id);
        this.bindProvinceArrPickerChange({ detail: { value: i } })
      }
    }
    for (var i in citysA) {
      if (citysA[i].name.indexOf(app.globalData.userInfo.city) != -1) {
        console.log("citysA[i].name===", citysA[i].name);
        this.bindPickerChange({ detail: { value: i } })
      }
    }
    for (var i in this.data.radioItems) {
      if (app.globalData.userInfo.gender == this.data.radioItems[i].code) {
        this.data.radioItems[i].checked = true;
        this.setData({
          radioItems: this.data.radioItems
        })
      }
    }
    console.log("app.globalData===", app.globalData);
  },
  showModal(error) {
    wx.showToast({
      title: error.msg,
      icon: 'none'
    })
  },
  initValidate() {
    // 验证字段的规则
    const rules = {
      userName: {
        required: true,
        // rangelength: [2, 4]
        maxlength: 10
      },
      gender: {
        required: true,
      },
      mobile: {
        required: true,
        tel: true,
      },
      province: {
        required: true,
      },
      city: {
        required: true,
      }
    }

    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      userName: {
        required: '请输入您的姓氏',
        rangelength: '姓氏不得超过10字!'
      },
      mobile: {
        required: '请输入您的手机号码',
        tel: '请输入正确的手机号码',
      },
      province: {
        required: '请选择省份',
      },
      city: {
        required: '请选择城市',
      },
      
    }

    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages)

    // 自定义验证规则
    // this.WxValidate.addMethod('assistance', (value, param) => {
    //   return this.WxValidate.optional(value) || (value.length >= 1 && value.length <= 2)
    // }, '请勾选1-2个敲码助手')
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