<template>
	<div>
		<div class="logo_box">
			<img class="logo" src="../../assets/images/logo.png" alt="" />
		</div>
		<form action="" ref="formParams">
			<div class="item">
				<span style="padding-right: 8px;">手机号码</span>
				<input type="tel" v-model="formParams.mobile" v-validate="'required|isMobile'" data-vv-name="手机号码" v-blur/>
			</div>
			<div class="item">
				<span style="padding-right: 24px;">验证码</span>
				<div class="item-input">
					<input type="tel" v-model="formParams.code" v-validate="'required'" data-vv-name="验证码" ref="codeInput" v-blur/>
				</div>
				<i @click="getCode">{{ verificationCode }}</i>
			</div>
			<div class="protocal">
				<input type="checkbox" v-model="isAgree"><span>已同意 <router-link to="/protocal">《微信公众号用户服务协议》</router-link></span>
			</div>
			<button type="button" :class="['btn_submit', isAgree?'':'noclick']" @click="handleSubmit">提交</button>
		</form>
	</div>
</template>

<script>
	import weui from 'weui.js';
	import { smscode,registByMobile,getopenid } from './apis.js'  //获取验证码
	export default {
		name:'Register',
		data() {
			return {
				formParams: {
					mobile: '',
					code: '',
					openid: ''
				},
				code: '',
				status: true,
				timer: 60,
				verificationCode: "获取验证码",
				codeFocus:false,
				isAgree:true
			}
		},
		methods: {
			getCode() {	
				if(this.formParams.mobile == ""){
					weui.alert("手机号码不能为空");
				}else{
					if(this.errors.items.length !=0 && this.errors.items[0].field == "手机号码"){
						weui.alert(this.errors.items[0].msg);
						return;
					}
					if(this.status) {	
						this.status = false;
						var count = this.timer;
						this.verificationCode = count + "s后重新获取";
						var timer = setInterval(() => {
							if(count === 0) {
								clearInterval(timer);
								this.verificationCode = "获取验证码";
								this.status = true;
							} else {
								count--;
								this.verificationCode = count + "s后重新获取";
							}
						}, 1000);
						this.$refs.codeInput.focus();
						this.getSmsCode();
					}
				}
			},
			async getSmsCode(){//获取验证码
				try {
					let param = {
						"mobile": this.formParams.mobile
					}
					let {data} = await smscode(param);
					if(data.success == true){
						weui.toast(data.msg,1000);
					}
				} catch(err) {
					console.log(err);
				}
			},
			handleSubmit() {
				this.$validator.validateAll().then((res)=>{
					if(res){
						this.registByMobile();
						return
					}
					if(this.errors.items[0].rule == 'required'){
						weui.alert(`${this.errors.items[0].field}不能为空`)
						return
					}
					if(this.errors.items.length !=0 && this.errors.items[0].field == "手机号码"){
						weui.alert(this.errors.items[0].msg);
						return;
					}
				})
			},
			async registByMobile(){
				try {
        			let loading = this.showloading();
					this.formParams.openid = localStorage.getItem("openId") || this.$cookies.get("openId");
					let {data, status} = await registByMobile(this.formParams);
					let _this = this;
					if (status == 200) {
		          		loading.hide(() => {
		          			if(data.success == true){
								_this.$router.push({path:'/ActivateSuccess',query:{security:data.data.id}});
							}else{
								weui.alert(data.msg);
							}
				        });
				    }
				} catch(err) {
					console.log(err);
				}
			},
			showloading(){
				return weui.loading("loading");	
			},
		},
	}
</script>

<style>
.weui-dialog__bd:first-child{
	max-height: 300px;
	overflow: auto;
	-webkit-overflow-scrolling:touch;
}
</style>

<style lang="stylus" scoped>
	.protocal{
		margin-top:-20px;
		span{
			font-size 12px;
			color #999;
			vertical-align middle;
			margin-left 6px;
		}
	}
	.btn_submit.noclick{
		background #ccc;
		pointer-events none;
	}
	.logo_box {
		width: 100%;
		text-align: center;
		.logo {
			width: 137px;
			height: 99px;
			margin: 70px auto 85px;
		}
	}
	
	form {
		margin-bottom:40px;
		padding: 0 44px;
	}
	
	.item {
		display: flex;
		margin: 0 auto 30px;
		color: #292929;
		border-bottom: 1px solid #D1D1D1;
		height: 30px;
		line-height: 30px;
		span{
			word-break: keep-all;
			font-size: 15px;
			color: #292929;
		}
		input {
			width: 100%;
			padding: 0 5px;
			font-size: 15px;
		}
	
		i {
			color: #D1D1D1;
			font-size: 12px;
		}
	}
	.item-input {
		position: relative;
		flex: 1;
		width: 0;
	}
	
	.btn_submit {
		display: block;
		width: 219px;
		height: 38px;
		line-height: 38px;
		color: #fff;
		font-size: 13px;
		background-color: #D4A668;
		border-radius: 20px;
		text-align: center;
		margin: 70px auto 0;
	}
</style>