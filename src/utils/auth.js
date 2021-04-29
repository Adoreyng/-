
// // 东雪获取code认证
// let redirectUri = encodeURIComponent(window.location.href)
// if (redirectUri.indexOf('#') > 0) {
// 	let page = redirectUri.split('#')[1].split('/')[1]
// 	redirectUri = redirectUri.split('#')[0] + `?page=${page}`
// }
// const appid = 'wx3c9d4d38a047cab4' // APPID
// const code = 'code'
// export default () => {
// 	location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUri}&response_type=${code}&scope=snsapi_userinfo#wechat_redirect`
// }



// // 东标获取code认证
// let redirectUri = encodeURIComponent(window.location.href)
// if (redirectUri.indexOf('#') > 0) {
// 	let page = redirectUri.split('#')[1].split('/')[1]
// 	redirectUri = redirectUri.split('#')[0] + `?page=${page}`
// }
// const appid = 'wx3c9d4d38a047cab4'
// const code = 'code'
// export default () => {
// 	window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUri}&response_type=${code}&scope=snsapi_userinfo#wechat_redirect`
// }



// // 东雪获取用户信息openid
// export default () => {
// 	var dfUrl = encodeURIComponent(`http://oauth.df-citroenclub.com.cn/wx/new-auth?redirectUrl=${location.href}`)
// 	let appid = 'wxa0d59d5a3705a608'
// 	location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${dfUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
// }



// 东标获取用户信息openid
export default () => {
	let dfUrl = encodeURIComponent(`http://wechat.mypeugeot.com.cn/wxapi/Home/index/getUserInfoNew?redirectUrl=${location.href}`)
	let appid = 'wx245794c7f7c4e531'
	location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${dfUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
}
