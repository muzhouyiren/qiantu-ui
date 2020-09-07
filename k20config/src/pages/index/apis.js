

import { httpData } from '@/utils/http'
class PageIndex{
	getIndexData(params){
		return httpData({
			method: "post",
			url: '/front/material/index',
			params:params,
		})
	}
	getChangeData(params){
		return httpData({
			method: "post",
			url: '/front/material/change',
			params:params,
		})
	}
}

export { PageIndex }
