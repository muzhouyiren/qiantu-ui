import Vue from 'vue'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VeeValidate, { Validator } from 'vee-validate'
import VueI18n from 'vue-i18n';
Vue.use(VueI18n)

const i18n = new VueI18n({
	locale: 'zh_CN',
})

const config = {
	events: 'blur',
	i18n,
	i18nRootKey: 'validation',
	dictionary: {
		zh_CN
	}
};

Vue.use(VeeValidate, config)
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
		return /^([\u4E00-\u9FA5A-Za-z]+|[a-zA-Z\\.\\s·]+)$/.test(value)
	}
});