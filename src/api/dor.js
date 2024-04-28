import request from '@/utils/request'

/**
 * 测试获取信息
 * @returns
 */
export const getDorListApi = () => {
  return request.get('/dor')
}

/**
 * 条件分页查询
 * @param {*} params
 * @returns
 */
export const getPageApi = (params) => {
  return request.get('/dor/page', { params })
}

/**
 * 新增宿舍信息
 * @param {*} params
 * @returns
 */
export const saveDorApi = (params) => {
  return request.post('/dor', params)
}

/**
 * 修改宿舍信息
 * @param {*} params
 * @returns
 */
export const updateDorApi = (params) => {
  return request.put('/dor', params)
}

/**
 * 根据宿舍号查询信息
 * @param {*} roomNumber
 * @returns
 */
export const getRoomApi = (roomNumber) => {
  return request.get(`/dor/room/${roomNumber}`)
}

/**
 * 根据宿舍号查询人员
 * @param {*} roomNumber
 * @returns
 */
export const getStudentListApi = (roomNumber) => {
  return request.get(`/dor/${roomNumber}`)
}
