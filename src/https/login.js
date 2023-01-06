/**
 * login相关模块封装
 */
import { request } from './request'

// 根据时间戳获取验证码
export function getVerificationCode (timeStamp) {
  return request({
    method: 'GET',
    url: `/sys/randomImage/${timeStamp}`
  })
}
