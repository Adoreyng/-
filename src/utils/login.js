import request from "./request"
import getQueryString from './url'
import state from '@/store/state.js';
import mutations from '@/store/mutations.js';

export default async function login() {
  try {
    const params = {
      ...state.userInfo
    }
    // 后台不需要的的冗余字段
    delete params.openid  // 接口同一封装的有openid
    delete params.city
    delete params.province
    let res = await request('/m/wx/login', 'post', params)
    mutations.setToken(res.data.token)
  } catch (e) {
  }
}