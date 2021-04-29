import axios from 'axios'
import qs from 'qs'
import { Loading, Message } from 'element-ui';
import state from '@/store/state.js';


// // console.log(process.env.BASE_API);

// 创建一个axios实例
var instance = axios.create({
  // baseURL: process.env.BASE_API,
  baseURL: process.env.NODE_ENV === 'development' ? '' : process.env.BASE_API,
  timeout: 120000,
  headers: {
    // 'cookie': 'cookie',   // 此处添加cookie
    // 'Content-Type': 'application/json', // 请求体中的数据会以  json字符串  的形式发送到后端  axios默认的请求数据类型
    // 'Content-Type': 'application/x-www-form-urlencoded', //请求体中的数据会以  普通表单  形式（键值对）发送到后端
    // 'Content-Type': 'multipart/form-data', // 它会将请求体的数据处理为一条消息，以标签为单元，用分隔符分开。既可以上传键值对，也可以上传文件。
  },
  withCredentials: true	// 跨域时如果要带上cookie话则需要设置withCrendentials
});


// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做的动作
  //   // console.log(config.data);

  // 如果是post请求对data处理   字符串格式
  // if (config.method === 'post') {
  //   config.data = qs.stringify(config.data);
  // }

  // // 是否需要添加token
  // if (store.getters.getToken) {
  //   config.headers['Authorization'] = store.getters.getToken // 让每个请求携带自定义token 请根据实际情况自行修改
  // }

  // // 是否需要添加header
  // config.headers = {
  //   'Content-Type': 'application/x-www-form-urlencoded' //设置header覆盖content-type
  // }
  // // console.log(config)

  // 请求参数的时候
  // 开启loding加载提示
  // Loading.service()
  return config;
}, function (error) {
  // 对请求错误做些什么
  Message.warning({
    message: '错误的传参'
  })
  return Promise.reject(error);
});


// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  // 关闭loding加载提示
  // loadingInstance.close()
  /**
  * code为非200是抛错
  */
  if (response.data.code != 200 && response.data.code != 201) {
    // // console.log(response);
    if (response.data.code == 403) {
      Message.warning({
        message: response.data.errMsg
      })
      return response.data
    } else if (response.data.code == 500) {
      Message.warning({
        message: response.data.errMsg
      })
      return response.data
      // return Promise.reject(response.data)
    } else if (response.data.code == 401) {
      Message.warning({
        message: response.data.errMsg
      })
      return Promise.reject(response.data)
    }
    return response.data.data
  } else {
    return response.data
  }
}, function (error) {
  // 响应错误
  loadingInstance.close()
  Message.warning({
    message: '系统繁忙'
  })
  return Promise.reject(error);
});


export default function request(url, method = 'get', data = {}, axiosConfig) {
  // // console.log(process.env.BASE_API);

  // 如果需要请求不同的项目地址需要开启
  // if (url.indexOf('esProduct') != -1 || url.indexOf('productCategory') != -1) {
  //   instance.defaults.baseURL = 'http://cshop.mypeugeot.com.cn/search-backend'
  // } else if (url.indexOf('openApi') != -1) {
  //   instance.defaults.baseURL = 'http://hx.mypeugeot.com.cn'
  // } else if (url.indexOf('xcx') != -1) {
  //   instance.defaults.baseURL = 'https://bk.eventsboom.com/wxapp-backend/m'
  // } else {
  //   instance.defaults.baseURL = 'http://cshop.mypeugeot.com.cn/portal-backend'
  // }
  try {
    if (state.userInfo.openid) {
      data.openid = state.userInfo.openid
    }
  } catch (error) {}

  if (method == 'post') {
    return instance({
      url: url,
      method: 'post',
      data: data,
      ...axiosConfig
    })
  } else if (method == 'get') {
    return instance({
      url: url,
      method: 'get',
      params: data,
      ...axiosConfig
    })
  }
}
