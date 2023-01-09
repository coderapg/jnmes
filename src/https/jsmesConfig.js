/**
 * 公共配置
 */
import { request } from 'https/request'

// 加载table数据和分页请求
export function getData (url, data) {
  return request({
    method: 'GET',
    url,
    data
  })
}
