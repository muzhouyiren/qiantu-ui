<template>
  <form class="form" ref="form">
    <div class="form-box">
      <h6 class="h-tit">驾趣行注册</h6>
      <div class="form-item">
        <label for>姓名</label>
        <div class="input-box">
          <input
            type="text"
            v-model="formData.userName"
            v-validate="'required|isName'"
            data-vv-name="userName"
            maxlength="32"
            @blur="inputBlur"
            @focus="inputFocus"
            v-resetPosition
          >
          <div v-show="inputFlag['userName'].flag">
            <i v-show="!errors.has('userName')" class="weui-icon-success icon-verify"></i>
            <i v-show="errors.has('userName')" class="weui-icon-warn"></i>
          </div>
        </div>
        <div class="sex switch-tab">
          <span
            v-for="(item,index) in sexData"
            :key="index"
            :class="{cur:sexCur==index}"
            @click="switchSex(item,index)"
          >{{item.name}}</span>
          <input type="hidden" v-model="formData.sex" v-validate="'required'" data-vv-name="性别">
        </div>
      </div>
      <div class="form-item">
        <label for>图片验证码</label>
        <div class="input-box">
          <input
            type="text"
            v-model="inputFlag['imgCode'].value"
            v-validate="'required'"
            data-vv-name="imgCode"
            maxlength="4"
            @blur="inputBlur"
            @focus="inputFocus"
            v-resetPosition
          >
          <div v-show="inputFlag['imgCode'].flag">
            <i v-show="inputFlag['imgCode'].isRight" class="weui-icon-success icon-verify"></i>
            <i v-show="!inputFlag['imgCode'].isRight" class="weui-icon-warn"></i>
          </div>
        </div>
        <img class="img-code" ref="imgCode" src @click="changeImgcode" alt>
      </div>
      <div class="form-item">
        <label for>手机</label>
        <div class="input-box">
          <input
            type="tel"
            v-model="formData.mobile"
            v-validate="'required|isMobile'"
            data-vv-name="mobile"
            maxlength="11"
            @blur="inputBlur"
            @focus="inputFocus"
            v-resetPosition
          >
          <div v-show="inputFlag['mobile'].flag">
            <i v-show="!errors.has('mobile')" class="weui-icon-success icon-verify"></i>
            <i v-show="errors.has('mobile')" class="weui-icon-warn"></i>
          </div>
        </div>
        <span
          :class="['code switch-tab',this.mobileCode.isGetMobileCode?'':'disabled' ]"
          @click="getMobileCode"
        >{{mobileCode.verificationCode}}</span>
      </div>
      <div class="form-item">
        <label for>短信验证码</label>
        <div class="input-box">
          <input
            type="tel"
            v-model="formData.verificationCode"
            v-validate="'required|max:6|min:6'"
            data-vv-name="verificationCode"
            maxlength="6"
            @blur="inputBlur"
            @focus="inputFocus"
            v-resetPosition
          >
          <div v-show="inputFlag['verificationCode'].flag">
            <i v-show="!errors.has('verificationCode')" class="weui-icon-success icon-verify"></i>
            <i v-show="errors.has('verificationCode')" class="weui-icon-warn"></i>
          </div>
        </div>
        <span class="code-null"></span>
      </div>
      <div class="form-item">
        <label for>计划购车时间</label>
        <div class="input-box">
          <p @click="chooseTime">{{txtData.buyCarTimeTxt}}</p>
          <div v-show="inputFlag['buyCarTime'].flag">
            <i v-show="formData.buyCarTime" class="weui-icon-success icon-verify"></i>
            <i v-show="!formData.buyCarTime" class="weui-icon-warn"></i>
          </div>
        </div>
        <input
          type="hidden"
          placeholder="计划购车时间"
          v-model="formData.buyCarTime"
          v-validate="'required'"
          data-vv-name="buyCarTime"
        >
      </div>
      <div class="form-tip">
        <p>
          确认以上信息真实有效
          <i
            :class="['weui-icon-success weui-icon_msg icon-verify isCheckInfo',isCheckInfo?'':'icon-disabled']"
            @click="switchCheck"
          ></i>
        </p>
        <!-- <p><span>已同意 <router-link to="/notice">《用户试乘试驾须知》</router-link></span><i :class="['weui-icon-success weui-icon_msg icon-verify isCheckNotice',isCheckNotice?'':'icon-disabled']" @click='switchCheck'></i></p> -->
      </div>
      <div :class="['submitBtn',btnFlag?'':'btn-disabed']" @click="submitInfo">注&nbsp;册</div>
    </div>
  </form>
</template>

<script>
import { PageIndex } from "../apis.js";
const pageIndex = new PageIndex();
export default {
  name: "AppointmentForm",
  components: {},
  data() {
    return {
      sexCur: 0,
      driveTypeCur: 0,
      isCheckInfo: true,
      isCheckNotice: true,
      btnFlag: true,
      formData: {
        userName: null,
        sex: "0",
        mobile: null,
        verificationCode: null,
        sessionId: null,
        buyCarTime: null,
        utmSource: null
      },
      txtData: {
        buyCarTimeTxt: null
      },
      inputFlag: {
        userName: {
          flag: false,
          name: "姓名"
        },
        imgCode: {
          flag: false,
          name: "图片验证码",
          value: null,
          isRight: false
        },
        mobile: {
          flag: false,
          name: "手机"
        },
        verificationCode: {
          flag: false,
          name: "短信验证码"
        },
        buyCarTime: {
          flag: false,
          name: "计划购车时间"
        }
      },
      mobileCode: {
        verificationCode: "获取验证码",
        isGetMobileCode: true
      },
      sexData: [{ name: "先生", value: "0" }, { name: "女士", value: "1" }],
      buyTimeArr: [
        { label: "1周内", value: "1" },
        { label: "1周-1月", value: "2" },
        { label: "1-3月", value: "3" },
        { label: "3个月以上", value: "4" },
        { label: "未知", value: "0" }
      ],
      timeSign: null
    };
  },
  methods: {
    //选择计划购车时间
    chooseTime: function() {
      this.inputFlag.buyCarTime.flag = true;
      let _this = this;
      this.$weui.picker(_this.buyTimeArr, {
        onConfirm: function(result) {
          _this.formData.buyCarTime = result[0].value;
          _this.txtData.buyCarTimeTxt = result[0].label;
        },
        defaultValue: [1],
        id: "buytimePicker"
      });
    },
    switchCheck: function(e) {
      if (e.target.classList.contains("isCheckInfo")) {
        this.isCheckInfo = !this.isCheckInfo;
      }
      if (e.target.classList.contains("isCheckNotice")) {
        this.isCheckNotice = !this.isCheckNotice;
      }
      if (!this.isCheckInfo || !this.isCheckNotice) {
        this.btnFlag = false;
      } else {
        this.btnFlag = true;
      }
    },
    switchSex: function(item, index) {
      this.sexCur = index;
      this.formData.sex = item.value;
    },
    // 获取焦点
    inputFocus: function(e) {
      this.inputFlag[e.target.dataset.vvName].flag = false;
    },
    //失去焦点校验
    inputBlur: function(e) {
      if (
        !this.inputFlag[e.target.dataset.vvName].flag &&
        e.target.dataset.vvName !== "imgCode"
      ) {
        this.inputFlag[e.target.dataset.vvName].flag = true;
      }
      //校验图片验证码
      if (e.target.dataset.vvName == "imgCode") {
        let imgCodeVal = this.inputFlag.imgCode.value;
        if (!imgCodeVal || imgCodeVal.length !== 4) {
          this.inputFlag["imgCode"].isRight = false;
          this.inputFlag["imgCode"].flag = true;
          return;
        }
        let params = { res: this.timeSign, code: imgCodeVal };
        pageIndex
          .checkImage(params)
          .then(res => {
            this.inputFlag["imgCode"].flag = true;
            if (res.code === "0") {
              this.inputFlag["imgCode"].isRight = true;
            } else {
              this.inputFlag["imgCode"].isRight = false;
            }
          })
          .catch(err => {
            this.inputFlag["imgCode"].flag = true;
            console.log(err);
          });
      }
    },
    //获取图片验证码
    changeImgcode: function(e) {
      this.timeSign = new Date().getTime();
      this.$refs.imgCode.src =
        this.$url + "/front/api/getImageCode?res=" + this.timeSign;
    },
    //获取短信验证码
    getMobileCode: function() {
      if (!this.formData.mobile) {
        this.$weui.alert("手机号码不能为空");
        return;
      }
      if (this.formData.mobile) {
        for (let i of this.errors.items) {
          if (i.field == "mobile") {
            this.$weui.alert(i.msg);
            return;
          }
        }
      }
      if (!this.inputFlag["imgCode"].value) {
        this.$weui.alert("图片验证码不能为空");
        return;
      }
      this.getApiMobileCode();
    },
    //获取短信验证码接口
    getApiMobileCode: function() {
      if (this.mobileCode.isGetMobileCode) {
        pageIndex
          .sendMobileCode(
            this.formData.mobile,
            this.inputFlag.imgCode.value,
            this.timeSign
          )
          .then(res => {
            if (res.code === "0") {
              let data = res.data;
              if (data && data.res === "0") {
                this.$weui.toast("发送成功", {
                  duration: 1000
                });
                this.countdownCode();
                this.formData.sessionId = data.sessionId;
              }
            } else {
              this.$weui.alert(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //验证码倒计时
    countdownCode: function() {
      if (this.mobileCode.isGetMobileCode) {
        this.mobileCode.isGetMobileCode = false;
        let count = 60;
        this.mobileCode.verificationCode = count + "s重新获取";
        let timer = setInterval(() => {
          if (count === 0) {
            clearInterval(timer);
            this.mobileCode.verificationCode = "获取验证码";
            this.mobileCode.isGetMobileCode = true;
            return;
          }
          count--;
          this.mobileCode.verificationCode = count + "s重新获取";
        }, 1000);
      }
    },
    //提交验证
    submitInfo: function() {
      this.$validator.validateAll().then(res => {
        if (!res) {
          if (this.errors.items[0].rule == "required") {
            this.$weui.alert(
              `${this.inputFlag[this.errors.items[0].field].name}不能为空`
            );
            return;
          }
          if (this.errors.items[0].rule == "min") {
            let num = this.errors.items[0].msg.match(/\d+/)[0];
            this.$weui.alert(
              `${this.inputFlag[this.errors.items[0].field].name}至少${num}位`
            );
            return;
          }
          this.$weui.alert(this.errors.items[0].msg);
          return;
        }
        pageIndex
          .tripInfo(this.formData)
          .then(res => {
            if (res.code === "0") {
              let data = res.data;
              this.$router.push({name:'MsgSuccess'})
            } else {
              this.$weui.alert(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  },
  created() {
    this.formData.utmSource = this.$request.utm_source || "jqxbm";
  },
  mounted() {
    this.changeImgcode();
  }
};
</script>

<style lang="stylus" scoped>
.h-tit {
  font-size: 14px;
  color: #333;
}

.form {
  padding: 25px 35px 50px;
}

.weui-icon-warn {
  font-size: 14px;
}

.icon-verify {
  font-size: 14px;
  color: #333;
}

.icon-disabled {
  color: #bbb;
}

.form-item {
  margin-top: 20px;
  display: flex;
  align-items: top;

  label {
    width: 84px;
    font-size: 13px;
    color: #333;
    margin-top: 3px;
  }

  .input-box {
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 5px;
    border: 1px solid #727171;
    border-radius: 5px;
    display: flex;
    align-items: center;

    input, p {
      width: 100%;
      height: 100%;
      font-size: 13px;
    }
  }
}

.img-code {
  width: 80px;
  margin-left: 12px;
  height: 24px;
}

.code-null {
  width: 80px;
  margin-left: 12px;
}

.switch-tab {
  border: 1px solid #727171;
  border-radius: 5px;
  font-size: 12px;
  height: 24px;

  span {
    float: left;
    width: 50%;
    height: 100%;
    line-height: 22px;
    color: #333;
    text-align: center;
    display: block;
    border-radius: 4px;

    &.cur {
      background: #333;
      color: #fff;
    }
  }
}

.code {
  width: 80px;
  margin-left: 12px;
  background: #333;
  color: #fff;
  height: 24px;
  line-height: 22px;
  text-align: center;
}

.sex {
  width: 80px;
  margin-left: 12px;
}

.testDrive {
  width: 145px;
}

.form-tip {
  padding: 15px 0 30px;

  p {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: #990004;

    a {
      color: #430002;
    }
  }
}

.submitBtn {
  width: 160px;
  height: 35px;
  line-height: 35px;
  background: #990004;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  margin: 0 auto;
  text-align: center;

  &.btn-disabed {
    background: #aaa;
    pointer-events: none;
  }
}

>>> .weui-cells {
  margin: 0;
  background: transparent;
}

>>> .weui-cell {
  padding: 0;
}

>>> .weui-uploader__bd {
  margin-bottom: -9px;
}

>>> .weui-uploader__input-box {
  width: 60px;
  height: 60px;
  border: 1px dashed #666;
  border-radius: 5px;
  background: #c8c8c8;
}

>>> .weui-uploader__file {
  width: 60px;
  height: 60px;
}

>>> .weui-uploader__input-box:before, >>> .weui-uploader__input-box:after {
  background: #333;
}

>>> .weui-uploader__input-box:before {
  height: 14px;
}

>>> .weui-uploader__input-box:after {
  width: 14px;
}
</style>