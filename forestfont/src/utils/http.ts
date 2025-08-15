// axios基础封装
import axios from 'axios'

import { message } from 'ant-design-vue'

// 创建axios实例
const httpInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})


httpInstance.interceptors.request.use(
  (config) => {
    // debugger
    const token = localStorage.getItem('accessToken')
    // 白名单路由（不需要token的接口）
    const whiteList = ['', 'http://localhost:8080/role/selects']

    // 获取请求URL（处理可能为undefined的情况）
    const requestUrl = config.url || ''

    // 检查是否在白名单
    const isWhiteList = whiteList.some(
      (api) =>
        requestUrl.startsWith(api) || // 匹配路径开头
        (config.baseURL && requestUrl.startsWith(`${config.baseURL}${api}`)),
    )

    // 非白名单请求需要token
    if (!isWhiteList) {
      if (!token) {
        const error = new Error('未提供token，请先登录')
        message.error(error.message)
        return Promise.reject(error)
      }
      console.log(token)
      // 确保 headers 对象存在
    }
    config.headers = config.headers || {}

    config.headers.Authorization = token
    return config
  },
  (error) => {
    // 请求配置错误的统一处理
    message.error('请求配置错误')
    return Promise.reject(error)
  },
)

httpInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      message.error('登录已过期，请重新登录')
    } else {
      message.error(error.response?.data?.message || '请求失败')
    }
    return Promise.reject(error)
  },
)

export default httpInstance
