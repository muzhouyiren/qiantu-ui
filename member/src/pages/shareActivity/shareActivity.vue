<template>
    <div>
    </div>
</template>
<script>
import weui from "weui.js";
import { getSignIn } from './apis.js'
export default {
  name: "ShareActivity",
  data() {
    return {
      openid: "",
      activityId:"",
    };
  },
  watch: {
    $route() {
      this.activityId = this.$route.query.activityId;
    }
  },
  methods: {
    async getSignIn(params) {
      try {
        let loading = weui.loading('loading');
        let {data,status} = await getSignIn(params);
        if(status = 200){
          loading.hide();   
          weui.alert(data.msg,()=>{
            // WeixinJSBridge.call('closeWindow');
            this.$router.push("/member");
          })
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.activityId = this.$route.query.activityId;
    this.openid = localStorage.getItem("openId") || this.$cookies.get("openId");
    this.getSignIn({openid:this.openid,activityId:this.activityId})
  }
};
</script>
<style lang="stylus" scoped>

</style>
