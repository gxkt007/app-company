/**
 * uni.request请求封装、ip地址或域名
 */
// 生产
// let configUrl = "/"
// 开发
// 开发服务器 图表数据
// let configUrl = "http://47.101.209.126:11900/"
// 丁传旺 本地调试接口
// let configUrl = "http://192.168.0.101:44358/"
// 测试 开发接口
let configUrl = "http://47.101.209.126:19005";
	
	
const request = ({url, data, method = "GET", contentType = 1}) => {
	// 配置请求头
	let header = {
		"content-type": contentType === 1 ? "application/json" : "application/x-www-form-urlencoded"
	}
	// // 如果从本地存储得到有token,请求的时候加上token
	// if (uni.getStorageSync('token')) {
	// 	//! 请求参数加入token值
	// 	header.authorization = uni.getStorageSync('token').token.access_token;
		
	// }
	
	
	// 只有请求结果返回 200 的时候，才会resolve，否则reject
	return new Promise((resolve, reject) => {
		uni.request({
			url: configUrl + url,
			data,
			method,
			header,
			success: (res) => {
				const status = res.status
				let msg = ''


				if (status < 200 || status >= 300) {
					// 处理http错误，抛到业务代码
					msg = showStatus(status)
					if (typeof res.data === 'string') {
						res.data = {msg}
					} else {
						res.data.message = msg
					}
				}
				
				
				//  if(res.data.code && res.data.code == '401') {
				//         // store.commit("tokenInfo", '')
				//         // localStorage.setItem('token', '');
				//         // store.commit('UserInfo', {});
				//         // store.commit('ifRouterWatch', false);
				//         // store.commit('PermissionsList', []);
				//         // store.commit('InfoRouterLists', []);
				//         // store.commit('InfoRoles', []);
				//         ElNotification({
				//             title: '错误',
				//             message: "账户授权失败，请重新登录。",
				//             type: 'error'
				//         });
				//         window.location.href = "/Login";
				//     }
				//     return res
				// }, (error) => {
				//     // 错误抛到业务代码
				//     error.data = {}
				//     error.data.message = '请求超时或服务器异常，请检查网络或联系管理员！'
				//     return Promise.resolve(error)
				// })
				
				

			}
			
		})
	})
}

const showStatus = (status) => {
	let message = ''
	switch (status) {
		case 400:
			message = '请求错误(400)'
			break
		case 401:
			message = '未授权，请重新登录(401)'
			break
		case 403:
			message = '拒绝访问(403)'
			break
		case 404:
			message = '请求出错(404)'
			break
		case 408:
			message = '请求超时(408)'
			break
		case 500:
			message = '服务器错误(500)'
			break
		case 501:
			message = '服务未实现(501)'
			break
		case 502:
			message = '网络错误(502)'
			break
		case 503:
			message = '服务不可用(503)'
			break
		case 504:
			message = '网络超时(504)'
			break
		case 505:
			message = 'HTTP版本不受支持(505)'
			break
		default:
			message = `连接出错(${status})!`
	}
	return `${message}，请检查网络或联系管理员！`
}

export default request;