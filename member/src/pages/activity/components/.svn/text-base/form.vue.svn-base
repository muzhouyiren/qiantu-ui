<template>
  <form class="form" ref="form-info">
		<div class="form-box">
			<div class="item">
				<span>姓名：</span>
				<div class="item-input">
					<input v-validate="'required'" data-vv-name="姓名" type="text" v-model="formParams.userName" :disabled="complete==1" v-blur>
				</div>
			</div>
			<div class="item">
				<span>电话：</span>
				<div class="item-input">
					<input v-validate="'required|isMobile'" data-vv-name="电话"  type="tel" v-model="formParams.mobile" :disabled="complete==1" v-blur>
				</div>
				<i v-if="complete==2" @click="getCode">{{ verificationCode }}</i>
			</div>
			<div class="item" v-if="complete==2">
				<span>验证码：</span>
				<div class="item-input">
					<input v-validate="'required'" data-vv-name="验证码"  type="tel" v-model="formParams.code" v-blur>
				</div>
			</div>
			<div class="item">
				<span>性别：</span>
				<div class="item-input" @click="chooseSex">
					<p>{{sexInfo.label}}</p>
					<span class="fa fa-caret-up"></span>
					<span class="fa fa-caret-down"></span>
				</div>
				<input type="hidden" v-validate="'required'" data-vv-name="性别" v-model="formParams.sex" v-blur>
			</div>
			<div class="item">
				<span>城市：</span>
				<div class="item-input" @click="chooseCity">
          <p>{{formParams.profession}}</p>
					<span class="fa fa-caret-up"></span>
					<span class="fa fa-caret-down"></span>
				</div>
        <input type="hidden" v-validate="'required'" data-vv-name="城市" v-model="formParams.profession" v-blur>
			</div>
			<div class="item">
				<span>爱好：</span>
				<div class="item-input">
					<input type="text" v-validate="'max:20'" data-vv-name="爱好" v-model="formParams.favorite" v-blur>
				</div>
			</div>
			<button type="button" @click="submitInfo">立即报名</button>
		</div>
	</form>
</template>
<script>
import weui from "weui.js";
import { smscode, checkSignUp, signUp,getUserInfo } from "../apis.js";
import { signInfo } from "@json/signInfo";
export default {
  name: "ActivityForm",
  props: ["id"],
  data() {
    return {
      confData: signInfo,
      sexInfo: {
        label: null,
        value: null
      },
      formParams: {
        userName: "",
        mobile: "",
        code: "",
        sex: "",
        profession: "北京",
        favorite: ""
      },
      status: true,
      count: 60,
      timer: null,
      verificationCode: "获取验证码",
      isSignUp:true,
      complete:1,//1是已完善，2是未完善
    };
  },
  methods: {
    showloading() {
      return weui.loading("loading");
    },
    //1.初始化获取信息，通过手机号判断是否完善信息
    async getUserInfo(params) {
      try {
        let { data,status } = await getUserInfo(params);
        let loading = this.showloading();
        if(status == 200){
          loading.hide();
          this.complete = data.data.sysMemberMobile?1:2;
        }
        if (data.success) {
          if(this.complete==1){
            this.formParams.userName = data.data.sysMemberUserName;
            this.formParams.mobile = data.data.sysMemberMobile;
            this.formParams.sex = this.sexInfo.value = data.data.sysMemberSex;
            this.sexInfo.label = data.data.sysMemberSex == 1?'先生':"女士";
          }
        } else {
          weui.alert(data.msg);
        }
      } catch (error) {
        console.log(error); 
      }
    },

    chooseSex() {
      let _this = this;
      weui.picker(this.confData.sex, {
        onConfirm: function(result) {
          _this.sexInfo.label = result[0].label;
          _this.formParams.sex = result[0].value;
        },
        defaultValue: [1],
        id: "sexPicker"
      });
    },

    chooseCity(){
      let _this = this;
      weui.picker(this.confData.city, {
        onConfirm: function(result) {
          _this.formParams.profession = result[0].label;
        },
        defaultValue: [0],
        id: "cityPicker"
      });
    },

    //点击获取验证码
    getCode() {
      if (!this.formParams.mobile) {
        weui.alert("电话项不能为空");
        return;
      }
      for (let i of this.errors.items) {
        if (i.field == "电话") {
          weui.alert(i.msg);
          return;
        }
      }
      this.checkSignUp({ activityId: this.id, mobile: this.formParams.mobile });
    },

    //验证手机号时候重复报名
    async checkSignUp(params) {
      try {
        let { data } = await checkSignUp(params);
        if (data.success) {
          this.getCodeSuccess();
        } else {
          weui.alert(data.msg);
        }
      } catch (error) {
        console.log(error);
      }
    },

    //验证手机号无重复报名，再获取验证码
    getCodeSuccess() {
      if (this.status) {
        this.status = false;
        var count = this.count;
        this.verificationCode = count + "s后重新获取";
        this.timer = setInterval(() => {
          if (count === 0) {
            clearInterval(this.timer);
            this.verificationCode = "获取验证码";
            this.status = true;
          } else {
            count--;
            this.verificationCode = count + "s后重新获取";
          }
        }, 1000);
        this.SmsCode({ mobile: this.formParams.mobile });
      }
    },

    //获取验证码
    async SmsCode(params) {
      try {
        let { data } = await smscode(params);
        if (data.success) {
        } else {
          weui.alert(data.msg);
        }
      } catch (error) {
        console.log(error);
      }
    },

    //提交表单
    submitInfo() {
      this.$validator.validateAll().then(res => {
        if (res) {
          this.formParams.activityId = this.id;
          this.formParams.openid =
            localStorage.getItem("openId") || this.$cookies.get("openId");
          this.formParams.complete = this.complete;
          if(this.isSignUp){
            this.isSignUp = false;
            this.signUp(this.formParams);
          }
          return;
        }
        if (this.errors.items[0].rule == "required") {
          weui.alert(`${this.errors.items[0].field}项不能为空`);
          return;
        }
        if (this.errors.items[0].rule == "max") {
          let arr = this.errors.items[0].msg.match(/\d+/g);
          let num = arr[arr.length-1];
          weui.alert(`${this.errors.items[0].field}项长度不能超过${num}个字`);
          return;
        }
        weui.alert(this.errors.items[0].msg);
      });
    },
     
    async signUp(params) {
      try {
        let { data,status } = await signUp(params);
        let loading = weui.loading("loading");
        if(status == 200){
          this.isSignUp = true;
          loading.hide();
        }
        if (data.success) {
          weui.alert(`<div class="success-tip">
                    <p class="icon"><i class="weui-icon-success weui-icon_msg"></i></p>
                    <p>尊敬的会员：</p>
                    <p>&#12288;&#12288;感谢您报名参加前途驿的活动，您已报名成功，祝您体验愉快。</p>
                    </div>`,() => {
                  this.$router.push("/member");
                });
          if(this.complete == 2){
            clearInterval(this.timer);
            this.verificationCode = "获取验证码";
            this.status = true;
          }
          // this.sexInfo.label = null;
          // for (let item in this.formParams) {
          //   this.formParams[item] = "";
          // }
          // clearInterval(this.timer);
          // this.verificationCode = "获取验证码";
          // this.status = true;
        } else {
          weui.alert(data.msg);
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    let openId = localStorage.getItem("openId") || this.$cookies.get("openId");
    this.getUserInfo({ openid: openId });
  }
};
</script>
<style lang="stylus">
@import '~@styles/varibles.styl';

.success-tip {
  text-align: left;

  p {
    line-height: 1.8;
  }

  p.icon {
    text-align: center;
    margin-bottom: 50px;

    .weui-icon_msg {
      font-size: 60px;
      color: $color;
    }
  }
}
</style>

<style lang="stylus" scoped>
@import '~@styles/varibles.styl';
@import '~@styles/mixins.styl';

.form {
	padding: 30px 30px 80px;
}

.form-box {
	padding: 10px 30px 68px;
	box-shadow: 0 0 15px 0 rgba(#000, 0.1);
	border-radius: 10px;
	position: relative;

	button {
		width: 210px;
		height: 36px;
		line-height: 36px;
		text-align: center;
		background: $color;
		color: #fff;
		font-size: 15px;
		border-radius: 20px;
		position: absolute;
		bottom: -18px;
		left: 0;
		right: 0;
		margin: 0 auto;
		transition: all 0.5s ease;

		&:active {
			transform: scale(0.98);
		}
	}
}

.item {
	display: flex;
	margin-top: 7px;
	padding: 7px 0;
	border-bottom: 1px solid #c6c6c6;
	font-size: 12px;
	color: #282828;

	input {
		width: 100%;
		padding: 0 5px;
	}

	i {
		color: $color;
	}
}

.item-input {
	position: relative;
	flex: 1;
	width: 0;

	p {
		padding-right: 15px;
		padding-left: 5px;
		ellipsis(auto);
	}

	.fa-caret-up {
		position: absolute;
		right: 15px;
		top: -2px;
	}

	.fa-caret-down {
		position: absolute;
		right: 15px;
		bottom: -2px;
	}
}
</style>

