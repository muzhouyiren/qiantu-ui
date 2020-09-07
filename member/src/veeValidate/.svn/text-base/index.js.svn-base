import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'

Vue.use(VeeValidate)

//验证手机号
Validator.extend('isMobile', {
	getMessage: (field, args) => {
		return '手机号码格式不正确';
	},
	validate: (value, args) => {
		return /^1(3|4|5|6|7|8|9)\d{9}$/.test(value)
	}
});

//验证姓名
Validator.extend('isName', {
	getMessage: (field, args) => {
		return '姓名格式不正确';
	},
	validate: (value, args) => {
		return /^[\u4E00-\u9FA5A-Za-z]+$/.test(value)
	}
});