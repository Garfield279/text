import request from '@/utils/request'

/**
 * 分页查询
 * @param {*} params
 * @returns
 */
export const maintenancePageApi = (params) => {
  return request.get('/maintenance/page', { params })
}

/**
 * 新增
 * @param {*} params
 * @returns
 */
export const saveMaintenanceApi = (params) => {
  return request.post('/maintenance', params)
}

/**
 * 根据id查询
 * @param {*} id
 * @returns
 */
export const getByIdApi = (id) => {
  return request.get(`/maintenance/${id}`)
}

/**
 * 修改
 * @param {*} params
 * @returns
 */
export const updateMaintenanceApi = (params) => {
  return request.post('/maintenance', params)
}

/**
 * 删除
 * @param {*} id
 * @returns
 */
export const delMaintenanceApi = (id) => {
  return request.delete(`/maintenance/${id}`)
}
