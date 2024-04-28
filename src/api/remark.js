import request from '@/utils/request'

/**
 * 获取学生
 * @returns
 */
export const getRemarkStudentsApi = (roomNumber) => {
  return request.get(`/remark/${roomNumber}`)
}

/**
 * 获取宿舍
 * @returns
 */
export const getRemarkDorListApi = () => {
  return request.get('/remark')
}

/**
 * 修改
 * @returns
 */
export const updateRemarkApi = (roomNumber) => {
  return request.put(`/remark/${roomNumber}`)
}
