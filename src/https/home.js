/**
 * 首页模块相关请求封装
 */
import { request } from 'https/request'

// 总销售额与单笔销售均额
export function getTotalSales () {
  return request({
    method: 'GET',
    url: '/census/total'
  })
}
