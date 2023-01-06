// 二次封装axios
import axios from 'axios'

export function request (config) {
  // 配置公共信息
  const instance = axios.create({
    baseURL: 'http://192.168.124.14:8080/sales-management-system',
    timeout: 5000
  })

  // 添加请求拦截器
  axios.interceptors.request.use(req => {
    return req
  }, err => {
    return Promise.reject(err)
  })

  // 添加响应拦截器
  axios.interceptors.response.use(res => {
    // 在2xx范围内的任何状态代码都会触发此函数
    return res
  }, err => {
    // 任何超出2xx范围的状态代码都会触发此函数
    return Promise.reject(err)
  })
  // 返回实例
  return instance(config)
}
