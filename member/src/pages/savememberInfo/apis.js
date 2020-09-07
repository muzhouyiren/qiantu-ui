import axios from 'axios'

export const saveInfo = function (params) {
	return axios.post('/front/member/update', params)
}
