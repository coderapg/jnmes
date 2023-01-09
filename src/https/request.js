// 二次封装axios
import axios from 'axios'

import { JNMES_TOKEN, JNMES_USER_INFO } from 'utils/jsmesconst'

export function request (config) {
  // 配置公共路径信息
  const instance = axios.create({
    baseURL: 'https://www.jnsms.cn/sales-management-system',
    // baseURL: 'http://192.168.124.14:8080/sales-management-system',
    timeout: 5000
  })

  // 添加请求拦截器
  instance.interceptors.request.use(req => {
    const token = JSON.parse(window.localStorage.getItem(JNMES_TOKEN))
    const userInfo = JSON.parse(window.localStorage.getItem(JNMES_USER_INFO))
    // 统一设置token
    if (token) {
      req.headers['X-Access-Token'] = token.value
      req.headers['tenant-id'] = userInfo.tenantId
    }
    return req
  }, err => {
    return Promise.reject(err)
  })

  // 添加响应拦截器
  instance.interceptors.response.use(res => {
    // 在2xx范围内的任何状态代码都会触发此函数
    return res
  }, err => {
    // 任何超出2xx范围的状态代码都会触发此函数
    // console.log('状态码1', err)
    return Promise.reject(err)
  })
  // 返回实例
  return instance(config)
}
