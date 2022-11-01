import request from '@/api/request.js'
let type = '/api'
let V = '/maas'

export const login = (data)=> {
	return request({url: type + V + '/deviceClass/deviceClassTree',method: 'GET',data})
}
// export function login2(data) {
// 	return request({
// 		url: type + V + '/api/maas/bearingFactory/bearingFactory',
// 		method: 'POST',
// 		data
// 	})
// }
