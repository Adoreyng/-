import states from '@/store/state.js';

let mutations = {
	// 例
	// setInfo(state, data){
	// 	state.info = data
	// 	sessionStorage.setItem('info', JSON.stringify(state.info))
	// },
	// 用户信息设置
	setUserInfo(data){
		states.userInfo = data
		sessionStorage.setItem('userInfo', JSON.stringify(states.userInfo))
	},
	// 登录之后的token
	setToken(data){
		states.token = data
		sessionStorage.setItem('token', JSON.stringify(states.token))
	},

}
export default mutations
