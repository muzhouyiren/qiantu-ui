<template>
    <div class="box">
        <p>尊敬的{{userName}}{{sex}}:</p>
        <p>您好！您的专属分享二维码已经生成，有效期为XX天</p>
        <div class="img">
            <img :src="qrcode" alt="">
        </div>
        <p class="bottom-txt">长按复制分享给好友，立即获得300积分哦</p>
    </div>
</template>
<script>
import { getUserInfo, getCode } from "./apis.js";
import weui from 'weui.js'
export default {
  name: "ShareQrcode",
  data() {
    return {
      userName:"",
      sex:"",
      qrcode:""
    };
  },
  methods: {
    showloading() {
      return weui.loading("loading");
    },
    async getUserInfo(params) {
      try {
        let { data,status } = await getUserInfo(params);
        let loading = this.showloading();
        if(status == 200){
          loading.hide();
        }
        if (data.success) {
          this.userName = data.data.sysMemberUserName;
          this.sex = data.data.sysMemberSex==1?"先生":"女士";
          this.getCode({code:data.data.mid,type:2});
        } else {
          weui.alert(data.msg);
        }
      } catch (error) {
        console.log(error); 
      }
    },
    async getCode(params){
        try {
            let { data } = await getCode(params);
            if(data.success){
              this.qrcode = data.data;
            }else{
              weui.alert(data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }
  },
  created(){
    let openId = localStorage.getItem("openId") || this.$cookies.get("openId");
    // this.getUserInfo({ openid: openId });
    // this.getUserInfo({ openid: "o-SXw0gM1wDOD0VJcakAB7veES2g" });
    
  }
};
</script>
<style lang="stylus" scoped>
.box {
    padding: 18% 10% 10%;
}
p{
    font-size 15px;
    color #282828;
    &.bottom-txt{
        text-align center;
    }
}
.img{
    width 60%;
    padding-bottom 60%;
    margin 20% auto 30%;
    position relative;
    img{
        width 100%;
        position absolute
        top 0 
        left 0;
    }
}
</style>

