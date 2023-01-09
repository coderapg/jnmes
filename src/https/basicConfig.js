/**
 * 配置模块相关请求
 */
import { request } from 'https/request'

// 基础配置数据请求
export function basicConfigData (url, params) {
  return request({
    method: 'GET',
    url,
    params
  })
}
