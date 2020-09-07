<template>
  <form class="form" ref="form">
    <div class="form-box">
      <div class="form-item">
        <input
          type="text"
          placeholder="姓名："
          v-model="formData.name"
          v-validate="'required|isName'"
          data-vv-name="姓名"
          maxlength="32"
          v-resetPosition
        >
      </div>
      <div class="form-item">
        <input
          type="tel"
          placeholder="手机号码："
          v-model="formData.mobile"
          v-validate="'required|isMobile'"
          data-vv-name="手机号码"
          maxlength="11"
          v-resetPosition
        >
      </div>
      <div class="form-item">
        <input
          type="text"
          placeholder="图片验证码："
          v-model="formData.imgCode"
          v-validate="'required'"
          data-vv-name="图片验证码"
          maxlength="4"
          @blur="checkImage"
          @focus="checkImageFocus"
          v-resetPosition
        >
        <span v-if="isWrong" style="color: red;" class="fa fa-times-circle"></span>
        <span v-if="isRight" style="color: green;" class="fa fa-check-circle"></span>
        <img class="imgCode" ref="imgCode" src @click="changeImgcode" alt>
      </div>
      <div class="form-item">
        <input
          type="text"
          placeholder="短信验证码："
          v-model="formData.verificationCode"
          v-validate="'required'"
          data-vv-name="短信验证码"
          maxlength="6"
          v-resetPosition
        >
        <span
          :class="['msg', this.isGetMobileCode?'':'disabled']"
          @click="getMobileCode"
        >{{verificationCode}}</span>
      </div>
      <div class="form-item">
        <p @click="chooseTime">{{!formData.buyCarTime?"计划购车时间":txtData.buyCarTimeTxt}}</p>
        <input
          type="hidden"
          placeholder="计划购车时间"
          v-model="formData.buyCarTime"
          v-validate="'required'"
          data-vv-name="计划购车时间"
        >
        <span class="fa fa-angle-down"></span>
      </div>
    </div>

    <img class="submitBtn" @click="submitInfo" src="@img/btn.png" alt>
  </form>
</template>

<script>
import { PageIndex } from "../apis.js";
const pageIndex = new PageIndex();
export default {
  name: "AppointmentForm",
  data() {
    return {
      formData: {
        name: null,
        mobile: null,
        verificationCode: null,
        sessionId: null,
        utmSource: 3,
        imgCode: null,
        buyCarTime: null
      },
      txtData: {
        buyCarTimeTxt: ""
      },
      buyTimeArr: [],
      verificationCode: "获取验证码",
      isGetMobileCode: true,
      timeSign: null,
      isWrong: false,
      isRight: false
    };
  },
  methods: {
    //提交验证
    submitInfo: function() {
      this.$validator.validateAll().then(res => {
        if (!res) {
          if (this.errors.items[0].rule == "required") {
            this.weui.alert(`${this.errors.items[0].field}不能为空`);
            return;
          }
          this.weui.alert(this.errors.items[0].msg);
          return;
        }

        pageIndex
          .addBookDrive(this.formData)
          .then(res => {
            if (res.code === "0") {
              let data = res.data;
              if (data) {
                this.weui.toast("提交成功", {
                  duration: 2000,
                  callback: () => {
                    this.isWrong = false;
                    this.isRight = false;
                    for (let i in this.formData) {
                      if (i == "utmSource") {
                        this.formData[i] = this.$Request.utm_source
                          ? this.$Request.utm_source
                          : "3";
                      } else {
                        this.formData[i] = null;
                      }
                    }
                  }
                });
              }
            } else {
              this.weui.alert(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    //获取图片验证码
    changeImgcode: function(e) {
      this.timeSign = new Date().getTime();
      this.$refs.imgCode.src =
        this.$url + "/front/api/getImageCode?res=" + this.timeSign;
    },
    //校验图片验证码
    checkImage: function() {
      if (!this.formData.imgCode || this.formData.imgCode.length !== 4) {
        this.isWrong = true;
        this.isRight = false;
        return;
      }
      let params = { res: this.timeSign, code: this.formData.imgCode };
      pageIndex
        .checkImage(params)
        .then(res => {
          if (res.code === "0") {
            this.isRight = true;
            this.isWrong = false;
          } else {
            this.isWrong = true;
            this.isRight = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //校验图片验证码
    checkImageFocus: function() {
      this.isWrong = false;
      this.isRight = false;
    },

    //选择计划购车时间
    chooseTime: function() {
      let _this = this;
      this.weui.picker(_this.buyTimeArr, {
        onConfirm: function(result) {
          _this.formData.buyCarTime = result[0].value;
          _this.txtData.buyCarTimeTxt = result[0].label;
        },
        defaultValue: [0],
        id: "buytimePicker"
      });
    },
    //获取短信验证码
    getMobileCode: function() {
      if (!this.formData.mobile) {
        this.weui.alert("手机号码不能为空");
        return;
      }
      if (this.formData.mobile) {
        for (let i of this.errors.items) {
          if (i.field == "手机号码") {
            this.weui.alert(i.msg);
            return;
          }
        }
      }
      if (!this.formData.imgCode) {
        this.weui.alert("图片验证码不能为空");
        return;
      }
      this.getApiMobileCode();
    },
    //获取短信验证码调用接口
    getApiMobileCode: function() {
      if (this.isGetMobileCode) {
        pageIndex
          .sendMobileCode(
            this.formData.mobile,
            this.formData.imgCode,
            this.timeSign
          )
          .then(res => {
            if (res.code === "0") {
              let data = res.data;
              if (data && data.res === "0") {
                this.weui.toast("发送成功", {
                  duration: 2000
                });
                this.countdownCode();
                this.formData.sessionId = data.sessionId;
              }
            } else {
              this.weui.alert(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //验证码倒计时
    countdownCode: function() {
      if (this.isGetMobileCode) {
        this.isGetMobileCode = false;
        let count = 60;
        this.verificationCode = count + "s后重新获取";
        let timer = setInterval(() => {
          if (count === 0) {
            clearInterval(timer);
            this.verificationCode = "获取验证码";
            this.isGetMobileCode = true;
            return;
          }
          count--;
          this.verificationCode = count + "s后重新获取";
        }, 1000);
      }
    }
  },
  created() {
    // 初始化购车时间
    this.buyTimeArr = pageIndex.buyCarTime();
    this.formData.utmSource = this.$Request.utm_source
      ? this.$Request.utm_source
      : "3";
    
  },
  mounted() {
    this.changeImgcode();
  }
};
</script>

<style lang="stylus" scoped>
input::-webkit-input-placeholder {
  color: #a2a1a1;
}

form {
  padding: 15px 40px 30px;
  color: #a2a1a1;
  @media (max-height: 570px){
    padding: 5px 40px 15px;
  }
}

.form-box {
  padding: 0 0 10px;
}

.form-item {
  background: #222328;
  margin-bottom: 17px;
  display: flex;

  @media (max-height: 680px) {
    margin-bottom: 10px;
  }

  @media (max-height: 630px) {
    margin-bottom: 5px;
  }

  input, p {
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    color: #a2a1a1;
    flex: 1;
    min-width: 100px;
    padding: 0 10px;
    text-align: left;
  }

  .fa {
    padding: 0 10px;
    line-height: 24px;
  }

  .msg {
    line-height: 24px;
    font-size: 12px;
    padding: 0 10px;

    &.disabled {
      color: #999;
    }
  }
}

.submitBtn {
  width: 100px;
  margin: 10px auto 0;
  display: block;
  @media(max-height:600px){
    margin: 0 auto;
  }
}

.imgCode {
  width: 70px;
  height: 24px;
}
</style>