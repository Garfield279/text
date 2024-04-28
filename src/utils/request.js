import router from '@/router'
import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: 'http://localhost',
  timeout: 50000 // request timeout
  // timeout: 10000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // if (error.response.data.code === 401) {
    //   window.sessionStorage.removeItem('token')
    //   router.push('/login')
    // }
    // 错误统一处理
    Message.error('操作失败')
    return Promise.reject(error)
  }
)

export default service
