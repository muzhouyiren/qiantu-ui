import Vue from 'vue'
Vue.directive('resetPosition', {
  bind: function (el) {

    el.onblur = function (event) {
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
        var currentPosition,timer;
        var speed=1;//页面滚动距离
        timer=setInterval(function(){
            currentPosition=document.documentElement.scrollTop || document.body.scrollTop;
            currentPosition-=speed; 
            window.scrollTo(0,currentPosition);//页面向上滚动
            currentPosition+=speed; //speed变量
            window.scrollTo(0,currentPosition);//页面向下滚动
            clearInterval(timer);
        },1);
      }
    }

  }
})