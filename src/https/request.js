// 二次封装axios
import axios from 'axios'

export function request (config) {
  const instance = axios.create({
    baseURL: 'http://192.168.124.14:8080/sales-management-system',
    timeout: 5000
  })
  return instance(config)
}
