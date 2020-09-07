<template>
  <div class="page msg_success">
    <div class="shape"></div>
    <div class="weui-msg__icon-area">
      <i class="weui-icon-success weui-icon_msg"></i>
    </div>
    <div class="weui-msg__text-area">
      <h2 class="weui-msg__title">提交成功</h2>
      <p class="weui-msg__desc">恭喜您已注册成功</p>
      <p class="weui-msg__desc">感谢您的参与</p>
    </div>

  </div>
</template>

<script>
export default {
  name: "MsgSuccess",
  data() {
      return {
          params:null
      }
  },
  created () {
      // this.params = this.$route.params
  },
};
</script>

<style lang="stylus" scoped>
.page {
  min-height: 100%;
  overflow-y: auto;
  text-align:center;
  display:flex;
  flex-direction:column;
}
.shape{
    width:100%;
    height:22px;
    background:#990004;
}
.weui-msg__icon-area{
    margin-top:18%;
}
.weui-icon-success{
    color:#bfbfbf;
    font-size:65px;
}
.weui-msg__title{
    margin-bottom:25px;
}
.weui-msg__desc{
    color:#333;
    margin-bottom:13px;
}
.weui-msg__text-area{
    flex:1;
}
.weui-msg__tips-area{
    margin-bottom:18%;
}
.weui-btn_primary{
    width:165px;
    height:35px;
    line-height:35px;
    background:#990004;
    font-size:17px;
}
.weui-msg__opr-area{
    margin-bottom:12px;
}
.weui-msg__tips{
    font-size:13px;
    color:#333;
}
.bgCur{
    background:#c68f5a;
}
</style>