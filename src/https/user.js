/**
 * 用户相关请求模块
 */
import { request } from './request'

// 上传头像
export function updateAlbum (data) {
  return request({
    method: 'POST',
    url: '/sales-management-system/sys/common/upload',
    data
  })
}
