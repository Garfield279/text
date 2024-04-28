import request from '@/utils/request'

/**
 * 文件上传
 * @returns
 */
export const uploadApi = (params) => {
  return request.post('/upload', params)
}

/**
 * 根据id获取
 * @param {*} id 
 * @returns 
 */
export const getByIdApi = (id) => {
  return request.get(`/admin/${id}`)
}

/**
 * 修改
 * @param {*} params 
 * @returns 
 */
export const updateApi = (params) => {
  return request.put('/admin', params )
}
