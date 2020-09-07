

import { httpData } from '@/utils/http'
class PageIndex{
	openDoor(params){
		return httpData({
			method:'post',
			url:'/api/ctl/opendoor',
			params:params,
		})
	}

	closeDoor(params){
		return httpData({
			method:'post',
			url:'/api/ctl/closedoor',
			params:params,
		})
	}

	seekcar(params){
		return httpData({
			method:'post',
			url:'/api/ctl/seekcar',
			params:params
		})
	}

	awake(params){
		return httpData({
			method:'post',
			url:'/api/ctl/awake',
			params:params
		})
	}

	flashlight(params){
		return httpData({
			method:'post',
			url:'/api/ctl/flashlight',
			params:params
		})
	}

	whistle(params){
		return httpData({
			method:'post',
			url:'/api/ctl/whistle',
			params:params
		})
	}

	openheadlight(params){
		return httpData({
			method:'post',
			url:'/api/ctl/openheadlight',
			params:params
		})
	}

	closeheadlight(params){
		return httpData({
			method:'post',
			url:'/api/ctl/closeheadlight',
			params:params
		})
	}

	risewindow(params){
		return httpData({
			method:'post',
			url:'/api/ctl/risewindow',
			params:params
		})
	}

	dropwindow(params){
		return httpData({
			method:'post',
			url:'/api/ctl/dropwindow',
			params:params
		})
	}

	openair(params){
		return httpData({
			method:'post',
			url:'/api/ctl/openair',
			params:params
		})
	}

	closeair(params){
		return httpData({
			method:'post',
			url:'/api/ctl/closeair',
			params:params
		})
	}

	charge(params){
		return httpData({
			method:'post',
			url:'/api/ctl/charge',
			params:params
		})
	}

	uncharge(params){
		return httpData({
			method:'post',
			url:'/api/ctl/uncharge',
			params:params
		})
	}

	setBatterytemp(params){
		return httpData({
			method:'post',
			url:'/api/ctl/batterytemperature',
			params:params
		})
	}

	seeBatterytemp(params){
		return httpData({
			method:'get',
			url:'/api/ctl/batterytemperature',
			params:params
		})
	}

	delBatterytemp(params){
		return httpData({
			method:'delete',
			url:'/api/ctl/batterytemperature',
			params:params
		})
	}
}

export { PageIndex }
