import { httpData } from '@/utils/http'

class PageShowTable{
    getDriveList(params){
		return httpData({
			method:'post',
			url:'/front/drivefun/getDriveList',
			params:params,
		})
	}
	getExport(params){
		return httpData({
			method:'post',
			url:'/front/drivefun/export',
			params:params,
			isload:'false',
			headers:{responseType: 'arraybuffer'}
		})
	}
		
}

export { PageShowTable }