import request from '@/utils/request'

/**
 * 登录
 * @returns
 */
export const loginApi = (params) => {
  return request.post('/admin/login', params)
}
