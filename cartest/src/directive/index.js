import Vue from 'vue'
Vue.directive('resetPosition', {
  bind: function (el) {

    el.onblur = function (event) {
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
})