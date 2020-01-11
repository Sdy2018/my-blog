import axios from 'axios'
import router from '@/router/index'

const instance = axios.create({

});
instance.interceptors.request.use(
	config => {

		if (sessionStorage.user) {
			let token = JSON.parse(sessionStorage.user).token
			config.headers.authorization = token
		} //请求头加上token
		return config
	},
	err => {
		return Promise.reject(err)
	})

instance.interceptors.response.use(
	response => {
		//拦截响应，做统一处理 
		if(response.data&&response.data.code==401){
			router.push({
				name:'login'
			})
			response.data.msg="token过期,请重新登录"
		}
		return response
	},
	//接口错误状态处理，也就是说无响应时的处理
	error => {
		return Promise.reject(error.response.status) // 返回接口返回的错误信息
	})
export default instance
