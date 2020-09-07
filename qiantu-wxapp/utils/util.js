/**
 * 封装ajax请求
 */
// const url = 'https://duber.eicp.vip';
const url = 'https://mini.qanto.cn';
const appid = 'wx1d68c58d1c5f3fab';
// const appid = "wx04173a48580558da";
function checkEmpty(obj) {
  if (obj != null && obj != undefined) {
    if (isString(obj) && obj != '') {
      return true
    }
    if (isArray(obj) && obj.length != 0) {
      return true
    }
  }
  return false
}
function isString(str) {
  return (typeof str == 'string') && str.constructor == String;
}
function isArray(obj) {
  return (typeof obj == 'object') && obj.constructor == Array;
}
const ajax = model => {
  wx.showLoading({
    title: '加载中',
  })
  model.url = url + model.url;
  let obj = {
    'session_key': wx.getStorageSync('session_key'),
  }
  Object.assign(obj, model.data)
  return new Promise(
    resolve => {
      wx.request({
        url: model.url,
        data: obj,
        method: model.method || 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'session_key': wx.getStorageSync('session_key')
        },
        success: res => {
          wx.hideLoading();
          if (res.statusCode == 200 || res.statusCode == 304) {
            if (res.data.code == 0) {
              wx.showToast({
                title: '请重新登录',
                icon: 'none'
              })
              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/login/login?type=1',
                })
              }, 1000)
            } else {
              resolve(res.data)
            }
          } else {
            wx.showModal({
              title: '提示',
              content: '服务器错误，请重试',
              showCancel: false,
            })
          }
        },
        fail: err => {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '当前网络不佳，请稍后重试',
            showCancel: false,
          })
        }


      })
    }
  )
};
function formatTime(time) { // 格式化时间戳
  if (!time) {
    return ''
  }
  time = Number(time)
  let t = new Date(time)
  let y = t.getFullYear()
  let m = t.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = t.getDate()
  d = d < 10 ? '0' + d : d
  return `${y}.${m}.${d}`
};
function formatTimeDot(time) {// 格式化 ---   ...
  if (!time) {
    return ''
  }
  return time.replace(/-/g, '.')
}
module.exports = {
  ajax: ajax,
  url: url,
  appid: appid,
  checkEmpty: checkEmpty,
  formatTime,
  formatTimeDot
}
