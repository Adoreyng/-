// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import router from './router'
Vue.config.productionTip = false
// 引入公共组件js
import './components'
// 引入element-ui
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';

// 引入swiper样式
import 'swiper/css/swiper.css'
import './assets/iconFont/iconfont.css'

// 视频插件
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
// 引入vuex
import store from '@/store'
Vue.prototype.$store = store

// 引入储存数据
import state from '@/store/state.js';
import mutations from '@/store/mutations.js';

// 引入rem单位
// import rem from '@/utils/rem.js'
// Vue.use(rem)

// 把数据请求挂载在全局
import request from '@/utils/request'
Vue.prototype.request = request

// 光标失去焦点返回顶部
import inputBlur from '@/utils/inputBlur'
Vue.prototype.inputBlur = inputBlur

// 获取URL信息
import getQueryString from '@/utils/url'
Vue.prototype.getQueryString = getQueryString

// 认证
import auth from '@/utils/auth'
// 登录文件
import login from '@/utils/login'


// 路由监控
router.beforeEach((to, from, next) => {
  let flag = true
  // 判断是否是以?传参，因为微信分享不让带#号
  if (getQueryString('page') && flag) {
    flag = false
    window.location.href = `/#/${getQueryString('page').split('#/')[0]}`
  } else {
    // 设置当前页面的title
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next()
  }
})


// ios手机点击失灵方案
// import FastClick from 'fastclick'
// FastClick.attach(document.body)
// FastClick.prototype.needsClick = function (target) {
//   // 下面这句
//   // 这是jq写法
//   // if ($(target).parents('.needsclick').length) return true
//   while (target.tagName !== 'BODY') {
//     // 放在本地插件库, 请将includes换成indexOf判断
//     if (target.className.indexOf('needsclick')) return true
//     target = target.parentNode
//   }
//   switch (target.nodeName.toLowerCase()) {
//     // Don't send a synthetic click to disabled inputs (issue #62)
//     case 'button':
//     case 'select':
//     case 'textarea':
//       if (target.disabled) {
//         return true
//       }
//       break
//     case 'input':
//       // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
//       // if ((deviceIsIOS && target.type === 'file') || target.disabled) {
//       //   return true
//       // }
//       if ((deviceIsIOS && target.type === 'file') || target.disabled) {
//         return true
//       }
//       break
//     case 'label':
//     case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
//     case 'video':
//       return true
//   }
//   return (/\bneedsclick\b/).test(target.className)
// }
// FastClick.prototype.focus = function (targetElement) {
//   var length
//   if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('data')) {
//     length = targetElement.value.length
//     targetElement.setSelectionRange(length, length)
//     targetElement.focus()
//   } else {
//     targetElement.focus()
//   }
// }

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
