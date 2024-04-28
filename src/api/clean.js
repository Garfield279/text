import request from '@/utils/request'

/**
 * 条件分页查询
 * @param {*} params
 * @returns
 */
export const getPageApi = (params) => {
  return request.get('/clean/page', { params })
}

/**
 * 获取图表数据
 * @returns
 */
export const getEchartsApi = () => {
  return request.get('/clean/getEcharts')
}

/**
 * 新增卫生记录
 * @param {*} params
 * @returns
 */
export const saveCleanApi = (params) => {
  return request.post('/clean', params)
}

/**
 * 修改卫生记录
 * @param {*} params
 * @returns
 */
export const updateCleanApi = (params) => {
  return request.put('/clean', params)
}

/**
 * 根据id查询卫生记录
 * @param {*} id
 * @returns
 */
export const getByIdApi = (id) => {
  return request.get(`/clean/${id}`)
}

/**
 * 根据id删除信息
 * @param {*} id
 * @returns
 */
export const delCleanApi = (id) => {
  return request.delete(`/clean/${id}`)
}
