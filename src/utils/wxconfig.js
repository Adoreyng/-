import axios from 'axios'
import qs from 'qs'

axios.defaults.withCredentials = true

const wxConfig = (title, desc, picUrl, url) => {
  axios({
    method: 'post',
    url: 'http://wechat.mypeugeot.com.cn/wxapi/Home/index/getJsInfo',
    data: qs.stringify({
    'public_key': '8vx2j8j78hykyr7npm9q76r8wt9u6duk',
    'secret_key': '8ed6a8a147c83e8e9205f20701c1ebc3',
    'url': encodeURIComponent(location.href.split('#')[0]),
    'project_name': '聚合平台'})
  }).then(data => {
    wx.ready(function () {
      wx.hideOptionMenu()
      wx.showMenuItems({
        menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline']
      })
      share(title, desc, picUrl, url)
    })
    wx.config({
      debug: false,
      appId: data.data.data.appId,
      timestamp: data.data.data.timestamp,
      nonceStr: data.data.data.nonceStr,
      signature: data.data.data.signature,
      jsApiList: [
        'onMenuShareTimeline', 'onMenuShareAppMessage', 'showMenuItems', 'hideOptionMenu', 'chooseImage', 'uploadImage', 'previewImage'
      ]
    })
  }).catch(res => {
    // console.log(res)
  })
}
function share (title, desc, picUrl, url) {
  let sharePic = picUrl
  var urls = url
  wx.onMenuShareTimeline({
    title: title,
    link: urls,
    imgUrl: sharePic,
    success: function () {
		// alert('wx.onMenuShareTimeline -- success')
    },
    cancel: () => { 
		// alert('wx.onMenuShareTimeline -- cancel')
	}
  })
  wx.onMenuShareAppMessage({
    title: title,
    desc: desc,
    link: urls,
    imgUrl: sharePic,
    success: function () {
		// alert('wx.onMenuShareAppMessage -- success')
    },
    cancel: () => { 
		// alert('wx.onMenuShareAppMessage -- cancel')
	}
  })
}

export default wxConfig
