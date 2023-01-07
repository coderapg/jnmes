// 二次封装axios
import axios from 'axios'

import { JNMES_TOKEN } from 'utils/jsmesconst'

export function request (config) {
  // 配置公共路径信息
  const instance = axios.create({
    baseURL: 'https://www.jnsms.cn',
    // baseURL: 'http://192.168.124.14:8080',
    timeout: 5000
  })

  // 添加请求拦截器
  instance.interceptors.request.use(req => {
    const token = window.localStorage.getItem(JNMES_TOKEN)
    // 统一设置token
    if (token) {
      instance.headers['X-Access-Token'] = token
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
    return Promise.reject(err)
  })
  // 返回实例
  return instance(config)
}
