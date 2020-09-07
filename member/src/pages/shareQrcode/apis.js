import axios from 'axios'
//获取用户基本信息
export const getUserInfo = function (params) {
	return axios.get('/front/IntegraRecord/userIntegral', {params:params})
}
//获取code
export const getCode = function (params){
	return axios.get('/front/wxapi/getCode', {params:params})
}