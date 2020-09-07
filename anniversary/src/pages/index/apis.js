

import { httpData } from '@/utils/http'
class PageIndex{
	roadshow(params){
		return httpData({
			method:'post',
			url:'/mobile/api/roadshow',
			params:params
		})
	}
}

export { PageIndex }
