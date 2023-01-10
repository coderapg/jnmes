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

// 基础配置-新增
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

// 基础配置-删除
export function deleteConfig (params) {
  return request({
    method: 'DELETE',
    // url: '/basicConfiguration/basicConfiguration/delete?id=1557195379858538498',
    url: '/basicConfiguration/basicConfiguration/delete',
    params
  })
}
