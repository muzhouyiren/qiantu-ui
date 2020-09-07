

import { httpData } from '@/utils/http'
class PageIndex{
	buyCarTime(){
		return [
			{"label":"1周内","value":"1"},
			{"label":"1周-1月","value":"2"},
			{"label":"1-3月","value":"3"},
			{"label":"3个月以上","value":"4"},
			{"label":"未知","value":"0"},
		]
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
	addBookDrive(params){
		let str = JSON.stringify(params);
		let jsonStr = `{"map":${str}}`;
		return httpData({
			method:'get',
			url:'/front/api/clue/addBookDrive',
			params:{
				jsonParam:jsonStr
			}
		})
	}
	checkImage(params){
		let str = JSON.stringify(params);
		let jsonStr = `{"map":${str}}`;
		console.log(jsonStr)
		return httpData({
			method:'get',
			url:'/front/api/checkImage',
			params:{
				jsonParam:jsonStr
			},
			isload:'false'
		})
	}
}

export { PageIndex }
