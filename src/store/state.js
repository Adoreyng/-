let storage = function(value) {
	try {
		return JSON.parse(sessionStorage.getItem(value))
	} catch (e) {
		return false
	}
}

let state = {
	// 例
	// info: storage('info') || null
	// 用户信息
	userInfo: storage('userInfo') || {},
	token: storage('token') || null
}
export default state
