import axios from 'axios'
import router from '../router'
import 'weui'
import weui from 'weui.js'


export const httpData = async function ({method, url, params,headers,isload}) {
	var isloading = isload || true;
	var headers = headers || '';
	if(isloading !== 'false'){
		var loading = weui.loading("加载中");
	}
	
	try {
		var res;
		if(method == 'get'){
			res = await axios[method](url, { params: params });
		}else{
			res = await axios[method](url, params ,headers);
		}
		
		let {data,status} = res;
		
		if (status == 200) {
			if(isloading !== 'false'){
				loading.hide();
			}
			
			return Promise.resolve(data)
		}
	} catch (error) {
		if(isloading !== 'false'){
			loading.hide();
		}
		return Promise.reject('调用接口失败')
	}
}

	axios.defaults.withCredentials = true;
	// http request 拦截器
	axios.interceptors.request.use(
		config => {
			if (config.method == 'get') {
				if (!config.params) {
					config.params = {};
				}
				config.params.time = new Date().getTime();
			}
			return config;
		},
		error => {
			return Promise.reject(error);
		}
	);

	axios.interceptors.response.use(
		response => { // 响应成功关闭loading
			return response
		}, error => {
			if (error.response && router.currentRoute.path != "/") {
				switch (error.response.status) {
					case 401:
						// 返回 401 清除token信息并跳转到登录页面
						//					store.commit(types.LOGOUT);
						router.replace({
							path: '/',
							query: {
								redirect: router.currentRoute.fullPath
							}
						})
						return;
					case 402:
						// 返回 402 清除token信息并跳转到登录页面
						//					store.commit(types.LOGOUT);
						router.replace({
							path: '/',
							query: {
								redirect: router.currentRoute.fullPath,
								warn: "userout"
							}
						})
						return;
				}
			}
			return Promise.reject(error.response.data) // 返回接口返回的错误信息
		}
	)


