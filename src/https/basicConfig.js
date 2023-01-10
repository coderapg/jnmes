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

// 基础配置-添加
// export function addConfig () {
//   return request({})
// }

// 基础配置-编辑
export function editConfig (data) {
  return request({
    method: 'PUT',
    url: '/basicConfiguration/basicConfiguration/edit',
    data
  })
}
