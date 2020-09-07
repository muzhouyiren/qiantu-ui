import Vue from 'vue'
Vue.directive('resetPosition', {
  bind: function (el) {

    el.onblur = function (event) {
      event.preventDefault();
      setTimeout(function () {
        if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
          return
        }
        var result = 'pc';
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
          result = 'ios'
        } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
          result = 'android'
        }
        if (result = 'ios') {
          document.activeElement.scrollIntoViewIfNeeded(true);
        }
      }, 400)
    }

  }
})