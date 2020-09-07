import axios from 'axios'

//获取验证码
export const smscode = (params) => {
	return axios.post('/front/member/smscode', params)
}

//激活接口
export const registByMobile = (params) => {
	return axios.post('/front/member/registByMobile', params)
}
        
//获取code
export const getopenid = (param) => {
	return axios.get('/front/member/openidbycode',{
		params: {
			code: param.code
		}
	})
}
