/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios'
import QS from 'qs'
// 环境的切换
if (process.env.NODE_ENV === 'development') { //开发环境
	axios.defaults.baseURL = 'http://chengyf.com:8082/shdx/';
} else if (process.env.NODE_ENV === 'debug') {
	axios.defaults.baseURL = 'https://aiv.sh.189.cn:8002/shdx/';
} else if (process.env.NODE_ENV === 'production') { //生产环境
	axios.defaults.baseURL = 'http://aiv.sh.189.cn:8002/shdx/';
	axios.defaults.baseURL = 'http://47.116.76.20:8002/shdx/'
	// }
	// 请求超时时间
	axios.defaults.timeout = 20000
	// post请求头
	axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
	// 请求拦截器
	axios.interceptors.request.use(
		config => {
			// 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
			// 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
			const token = window.localStorage.getItem('token')
			token && (config.headers.Authorization = token)
			return config
		},
		error => {
			return Promise.error(error)
		})
	// 响应拦截器
	axios.interceptors.response.use(
		response => {
			if (response.status === 200) {
				return Promise.resolve(response)
			} else {
				return Promise.reject(response)
			}
		},
		// 服务器状态码不是200的情况
		error => {
			if (error.response.status) {
				switch (error.response.status) {
					// 401: 未登录
					// 未登录则跳转登录页面，并携带当前页面的路径
					// 在登录成功后返回当前页面，这一步需要在登录页操作。
					// case 401:
					//     router.replace({
					//         path: '/login',
					//         query: { redirect: router.currentRoute.fullPath }
					//     });
					//     break;
					// 403 token过期
					// 登录过期对用户进行提示
					// 清除本地token和清空vuex中token对象
					// 跳转登录页面
					case 403:
						//  alert('登录过期，请重新登录')
						// location.href='/weapp/login'
						break
				}
				return Promise.reject(error.response)
			}
		}
	)
	
	/**
	 * get方法，对应get请求
	 * @param {String} url [请求的url地址]
	 * @param {Object} params [请求时携带的参数]
	 */
	export function get(url, params) {
		return new Promise((resolve, reject) => {
			axios.get(url, {
					params: params
				})
				.then(res => {
					resolve(res.data)
				})
				.catch(err => {
					reject(err.data)
				})
		})
	}
	
	/**
	 * post方法，对应post请求
	 * @param {String} url [请求的url地址]
	 * @param {Object} params [请求时携带的参数]
	 */
	export function post(url, params) {
		return new Promise((resolve, reject) => {
			axios.post(url, QS.stringify(params))
				.then(res => {
					resolve(res.data)
				})
				.catch(err => {
					reject(err.data)
				})
		})
	}
}
