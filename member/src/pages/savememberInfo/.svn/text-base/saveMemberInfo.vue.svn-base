<template>
  <div>
    <h2 class="title">完善信息，获取更多礼遇</h2>
		<form action="" ref="form-info">
			<div class="item">
				<label>&#12288;&#12288;<span>*</span>姓名</label>
				<div class="item-input">
					<input v-validate="'required|isName'" type="text" data-vv-name="姓名" name="userName" v-blur>
				</div>
			</div>
			<div class="item">
				<label><span>*</span>您的称呼</label>
				<div class="item-input" @click.prevent="chooseSex">
					<p>{{formData.sex.label}}</p>
					<span class="fa fa-caret-up"></span>
					<span class="fa fa-caret-down"></span>
				</div>
				<input v-validate="'required'" data-vv-name="您的称呼" type="hidden" :value="formData.sex.value" name="sex" isnum="true">
			</div>
			<div class="item">
				<label><span>*</span>最高学历</label>
				<div class="item-input" @click.prevent="chooseDegree">
					<p>{{formData.degree.label}}</p>
					<span class="fa fa-caret-up"></span>
					<span class="fa fa-caret-down"></span>
				</div>
				<input v-validate="'required'" data-vv-name="最高学历" type="hidden" :value="formData.degree.value" name="degree">
			</div>
			<div class="item">
				<label for=""><span>*</span>收件地址</label>
				<div class="item-input">
					<input v-validate="'required'" data-vv-name="收件地址" type="text" name="adress" v-blur>
				</div>
			</div>
			<div class="item">
				<label class="know-new"><span>*</span>是否了解过接触过新能源汽车</label>
				<div class="item-input" @click.prevent="chooseNew">
					<p>{{formData.newEnergyCarCognitive.label}}</p>
					<span class="fa fa-caret-up"></span>
					<span class="fa fa-caret-down"></span>
				</div>
				<input type="hidden" v-validate="'required'" data-vv-name="是否了解过接触过新能源汽车" :value="formData.newEnergyCarCognitive.value" name="newEnergyCarCognitive">
			</div>
			<div class="item">
				<label class="label-m">现在车辆数量</label>
				<div class="item-input" @click.prevent="chooseHaveCarNum">
					<p>{{formData.haveCarNum.label}}</p>
					<span class="fa fa-caret-up"></span>
					<span class="fa fa-caret-down"></span>
				</div>
				<input type="hidden" :value="formData.haveCarNum.value" name="haveCarNum">
			</div>
			<div class="item">
				<label class="label-m">现在汽车品牌</label>
				<div class="item-input" @click.prevent="chooseCar">
					<p>{{formData.haveCarBrand}}</p>
					<span class="fa fa-caret-up"></span>
					<span class="fa fa-caret-down"></span>
				</div>
			</div>
			<input type="hidden" :value="formData.haveCarBrand" name="haveCarBrand">
			<div class="types">
				<p>您希望参与前途驿的什么活动？</p>
				<ul class="clearfix">
					<li v-for="item of confData.interest" :key="item.value">
						<div class="checkbox" @click="chooseFavor(item)">
							<span>	
								<i :class="['fa',!item.checked?'fa-square-o uncheck':'fa-check-square-o checked']"></i>
							</span>
							{{item.name}}
						</div>
					</li>
					<input type="hidden" :value="interest" name="interest">
				</ul>
			</div>
			<p class="save-btn"><button type="button" @click="saveAllInfo">保 存</button></p>
		</form>
  </div>
</template>

<script>
import weui from "weui.js";
import { formser } from "@/plugins/func.js";
import { saveInfo } from "./apis.js";
import { memberInfo } from '@json/memberInfo'
export default {
  name: "SaveMemberInfo",
  data() {
    return {
      confData: memberInfo,
      formData: {
        sex: { label: null, value: null },
        degree: { label: null, value: null },
        newEnergyCarCognitive: { label: null, value: null },
        haveCarNum: { label: null, value: null },
        haveCarBrand: ""
			},
			id:null,
			isClick:true,
    };
  },
  computed: {
    interest() {
      let str = "";
      if (!this.confData.interest) {
        return "";
      }
      this.confData.interest.forEach((v, i) => {
        if (v.checked) {
          str += v.name + ",";
        }
      });
      str = str.slice(0, str.length - 1);
      return str;
    }
  },
  methods: {
    async saveInfo(params) {
      try {
        let loading = this.showloading();
				let { data,status } = await saveInfo(params);
				if(status == 200){
						loading.hide();
						this.isClick = true;
				}
				if (data.success) {
					weui.alert(
						`<div class="success-tip">
								<p class="icon"><i class="weui-icon-success weui-icon_msg"></i></p>
								<p>尊敬的用户，您好！</p>
								<p>&#12288;&#12288;您已成功注册前途驿会员！恭喜您获取40积分奖励！</p>
								</div>`,
						() => {
							this.$router.push("/member");
						}
					);
				} else {
					weui.alert(data.msg);
				}
      } catch (error) {
        console.log(error);
      }
    },
    saveAllInfo() {
      this.$validator.validateAll().then(res => {
        if (res && this.isClick) {
          let formData = formser(this.$refs["form-info"]);
					formData.id = this.id; //测试id，
					formData.openid = this.openid;
					let data = this.saveInfo(formData);
					this.isClick = false;
          return;
        }
        if (this.errors.items[0].rule == "required") {
          weui.alert(`${this.errors.items[0].field}项不能为空`);
				}else{
					weui.alert(this.errors.items[0].msg);
				}
      });
    },
    showloading() {
      return weui.loading("loading");
    },
    chooseSex() {
      this.singlePicker(this.confData.sex, this.formData["sex"], "sexPicker");
    },
    chooseDegree() {
      this.singlePicker(
        this.confData.degree,
        this.formData["degree"],
        "degreePicker"
      );
    },
    chooseNew() {
      this.singlePicker(
        this.confData.newEnergyCarCognitive,
        this.formData["newEnergyCarCognitive"],
        "newEnergyCarCognitivePicker"
      );
    },
    chooseHaveCarNum() {
      this.singlePicker(
        this.confData.haveCarNum,
        this.formData["haveCarNum"],
        "haveCarNumPicker"
      );
    },
    chooseCar() {
      var _this = this;
      weui.picker(this.confData.haveCarBrand, {
        onConfirm: function(result) {
          if (result[0].value == 0) {
            _this.formData["haveCarBrand"] = "";
            return;
          }
          // let str = "";
          // for (let item of result) {
          //   str += item.label + "-";
          // }
          // str = str.slice(0, str.length - 1);
          _this.formData["haveCarBrand"] = result[0].label;
        },
        depth: 1,
        defaultValue: [1],
        id: "CarPicker"
      });
    },
    singlePicker(apiData, data, id) {
      var _this = this;
      weui.picker(apiData, {
        onConfirm: function(result) {
          if (result[0].value == 0) {
            data = "";
            return;
          }
          data.label = result[0].label;
          data.value = result[0].value;
        },
        defaultValue: [1],
        id: id
      });
    },
    chooseFavor(item) {
      item.checked = !item.checked;
		}
	},
	created(){
		this.id = this.$route.query.security || '';
		this.openid = localStorage.getItem("openId") || this.$cookies.get("openId");
	}
};
</script>

<style lang="stylus">
@import '~@styles/varibles.styl';
.success-tip{
  text-align left;
  p{
    line-height 1.8;
		color:#333;
  }
	p.icon{
    text-align center;
    margin-bottom 30px;
    .weui-icon_msg{
      font-size 60px;
      color $color;
    }
  }
}
.weui-picker__hd{
	z-index 100;
}
</style>
<style lang="stylus" scoped>
@import '~@styles/varibles.styl';
@import '~@styles/mixins.styl';

h2.title {
	text-align: center;
	font-size: 18px;
	font-weight: bold;
	color: #282828;
	padding: 30px;
}

form {
	padding: 0 40px 60px;
}

.item {
	display: flex;
	color: #282828;
	align-items: center;
	margin-bottom: 12px;

	label {
		width: 55px;
		font-size: 12px;
		margin-right: 15px;
		display: block;
		span{
			color red;
		}
		&.know-new {
			width: 163px;
		}

		&.label-m {
			width: 75px;
		}
	}

	.item-input {
		width: 0;

		.fa-caret-up {
			position: absolute;
			right: 5px;
			top: 3px;
		}

		.fa-caret-down {
			position: absolute;
			right: 5px;
			bottom: 3px;
		}
	}

	.item-input p {
		ellipsis(100%);
		height: 100%;
	}

	.item-input input {
		display: block;
		width: 100%;
		height: 100%;
	}

	.item-input {
		display: block;
		flex: 1;
		height: 30px;
		padding: 4px;
		border: 1px solid #7e7e7e;
		border-radius: 3px;
		position: relative;
	}
}

.save-btn {
	text-align: center;

	button {
		width: 220px;
		height: 38px;
		line-height: 38px;
		font-size: 13px;
		color: #fff;
		border-radius: 30px;
		background-color: #d4a667;
		box-shadow: 2px 4px 6px 0px rgba($color, 0.3);
		transition: all 0.5s ease;

		&:active {
			transform: scale(0.98);
		}
	}
}

.types {
	color: #282828;
	font-size: 12px;
	padding: 6px 0 30px;

	ul {
		padding-top: 15px;

		li {
			width: 33.33%;
			float: left;
			margin-bottom: 5px;

			.checkbox {
				display: inline-block;
			}

			span {
				padding-right: 5px;
			}

			i {
				font-size: 18px;
				vertical-align: middle;
			}

			.uncheck {
				color: #7e7e7e;
			}

			.checked {
				color: $color;
			}
		}
	}
}
</style>