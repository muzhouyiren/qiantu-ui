<template>
  <form class="form" ref="form">
    <div class="form-box">
      <div class="form-item">
        <input
          type="text"
          placeholder="请输入姓名"
          v-model="formData.userName"
          v-validate="'required|isName'"
          data-vv-name="姓名"
          maxlength="32"
        />
      </div>
      <div class="form-item">
        <input
          type="tel"
          placeholder="请输入电话"
          v-model="formData.mobile"
          v-validate="'required|isMobile'"
          data-vv-name="电话"
          maxlength="11"
        />
      </div>
      <div class="form-item">
        <input
          type="text"
          placeholder="请输入城市"
          v-model="formData.city"
          v-validate="'required'"
          data-vv-name="城市"
          maxlength="32"
        />
      </div>
      <div class="form-item">
        <p @click="chooseTime" v-html="!formData.buyCarTime?'<i>计划购车时间</i>':txtData.buyCarTimeTxt"></p>
        <input
          type="hidden"
          v-model="formData.buyCarTime"
          v-validate="'required'"
          data-vv-name="计划购车时间"
        />
        <span class="fa fa-angle-down"></span>
      </div>
      <!-- <div class="form-tip">
        <span :class="['fa',isCheck?'fa-check-square':'fa-square-o']" @click='switchCheck'></span> 
        <router-link to="/authorization">&nbsp;《个人信息授权书》</router-link>
      </div> -->
      <div class='submitBtn' @click="submitInfo">确认提交</div>
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
      // btnFlag:true,
      // isCheck:true,
      formData: {
        userName: null,
        mobile: null,
        city: null,
        buyCarTime: null,
        utmSource: "renminwang"
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
    // switchCheck:function(){
    //   this.isCheck = !this.isCheck;
    //   this.btnFlag = !this.btnFlag;
    // },
    //选择计划购车时间
    chooseTime: function() {
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
    //提交验证
    submitInfo: function() {
      this.$validator.validateAll().then(res => {
        if (!res) {
          if (this.errors.items[0].rule == "required") {
            this.$weui.alert(`${this.errors.items[0].field}不能为空`);
            return;
          }
          this.$weui.alert(this.errors.items[0].msg);
          return;
        }
        pageIndex
          .roadshow(this.formData)
          .then(res => {
            if (res.code === "0") {
              this.$weui.toast("提交成功", {
                duration: 3000,
                callback: () => {
                  for (let i in this.formData) {
                    if (i !== "utmSource") {
                      this.formData[i] = null;
                    }
                  }
                }
              });
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
  created() {},
  mounted() {}
};
</script>

<style lang="stylus">
  p i {
    color: #a59b8d;
  }
</style>
<style lang="stylus" scoped>
input::-webkit-input-placeholder {
  color: #a59b8d;
}

.form-item {
  margin-bottom: 20px;
  border: 1px solid #bfbfbf;
  border-radius: 3px;
  position: relative;

  input, p {
    line-height: 24px;
    font-size: 14px;
    padding: 6px 10px;
    width: 100%;
  }
}

.submitBtn {
  display: block;
  text-align: center;
  background: #b42a1e;
  color: #fff;
  height: 45px;
  line-height: 45px;
  border:0;
  border-radius:3px;
  font-size:18px;
  &.btn-disabed{
    background:#aaa;
    pointer-events:none;
  }
}

.fa-angle-down {
  position: absolute;
  top: 12px;
  right: 8px;
}
.form-tip{
  font-size:12px;
  color:#3c9aff;
  margin-bottom:22px;
}
</style>