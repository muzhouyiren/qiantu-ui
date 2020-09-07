<template>
  <form class="form" ref="form">
    <div class="form-box">
      <div class="form-item">
        <input
          type="text"
          placeholder="姓名"
          v-model="formData.userName"
          v-validate="'required|isName'"
          data-vv-name="姓名"
          maxlength="32"
        >
      </div>
      <div class="form-item">
        <input
          type="tel"
          placeholder="手机号码"
          v-model="formData.mobile"
          v-validate="'required|isMobile'"
          data-vv-name="手机号码"
          maxlength="11"
        >
      </div>
      <div class="form-item">
        <input
          type="text"
          placeholder="城市"
          v-model="formData.city"
          v-validate="'required'"
          data-vv-name="城市"
          maxlength="32"
        >
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
      <div class="form-item submitBtn" @click="submitInfo">确&nbsp;认&nbsp;提&nbsp;交</div>
    </div>
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
        userName: null,
        mobile: null,
        city: null,
        buyCarTime: null,
        utmSource: "baidufeed"
      },
      txtData: {
        buyCarTimeTxt: ""
      },
      buyTimeArr: [
        { label: "1周内", value: "1" },
        { label: "1周-1月", value: "2" },
        { label: "1-3月", value: "3" },
        { label: "3个月以上", value: "4" },
        { label: "未知", value: "0" }
      ]
    };
  },
  methods: {
    //选择计划购车时间
    chooseTime: function() {
      let _this = this;
      this.weui.picker(_this.buyTimeArr, {
        onConfirm: function(result) {
          _this.formData.buyCarTime = result[0].value;
          _this.txtData.buyCarTimeTxt = result[0].label;
        },
        defaultValue: [1],
        id: "buytimePicker"
      });
    },
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
          .roadshow(this.formData)
          .then(res => {
            if (res.code === "0") {
              this.weui.toast("提交成功", {
                duration: 2000,
                callback: () => {
                  for (let i in this.formData) {
                    if (i !== "utmSource") {
                      this.formData[i] = null;
                    }
                  }
                }
              });
            } else {
              this.weui.alert(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="stylus" scoped>
input::-webkit-input-placeholder {
  color: #a59b8d;
}

form {
  padding: 0 20px 50px;
}

.form-item {
  background: #222a2f;
  margin-top: 17px;

  input, p {
    line-height: 24px;
    font-size: 12px;
    color: #a59b8d;
    padding: 6px 10px;
    width: 100%;
  }
}

.submitBtn {
  display: block;
  text-align: center;
  background: #cfa972;
  color: #191e21;
  height: 35px;
  line-height: 35px;
}
</style>