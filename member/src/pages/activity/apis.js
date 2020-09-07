import axios from 'axios'
//获取下拉数据信息
export const getConfData = function (params) {
	return axios.get('~@/assets/json/signInfo.json', { params })
}
//获取验证码
export const smscode = (params) => {
	return axios.post('/front/member/smscode', params)
}
//获取活动详情
export const getActivity = (id,openid) => {
	return axios.post(`/front/activity/getActivity/${id}/${openid}`)
}

//校验手机号
export const checkSignUp = (params) =>{
	return axios.post('/front/activity/checkSignUp',params)
}

//用户报名
export const signUp = (params) =>{
	return axios.post('/front/activity/signUp',params)
}

//获取用户基本信息
export const getUserInfo = function (params) {
	return axios.get('/front/IntegraRecord/userIntegral', {params:params})
}