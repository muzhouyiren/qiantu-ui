

import { httpData } from '@/utils/http'
class PageIndex{
	tripInfo(params){
		return httpData({
			method:'post',
			url:'/mobile/api/jiaquxing',
			params:params,
		})
	}

	checkImage(params){
		let str = JSON.stringify(params);
		let jsonStr = `{"map":${str}}`;
		return httpData({
			method:'get',
			url:'/front/api/checkImage',
			params:{
				jsonParam:jsonStr
			},
			isload:'false'//穿字符串false
		})
	}

	sendMobileCode(sendMobile,verificationCode,res){
		let jsonStr = `{"map":{"state":"3","sendMobile":"${sendMobile}","verificationCode":"${verificationCode}","res":"${res}"}}`;
		return httpData({
			method:'get',
			url:`/front/api/sendMobileCode`,
			params:{
				jsonParam:jsonStr
			}
		})
	}
}

export { PageIndex }
