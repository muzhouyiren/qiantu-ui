import axios from 'axios'
//获取积分列表
export const getPoint = function (params) {
	return axios.get('/front/IntegraRecord/userIntegralRecord', {params:params})
}