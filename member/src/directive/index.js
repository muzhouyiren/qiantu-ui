import Vue from 'vue'
Vue.directive('blur', {
    bind: function (el) {
      el.onblur = function(){
        el.scrollIntoView();
      }
    }
  })