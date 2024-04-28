import request from '@/utils/request'

/**
 * 测试获取信息
 * @returns
 */
export const getStudentListApi = () => {
  return request.get('/student')
}

/**
 * 分页查询
 * @param {*} params
 * @returns
 */
export const getPageApi = (params) => {
  return request.get('/student/page', { params })
}

/**
 * 获取班级名
 * @returns
 */
export const getClassNameApi = () => {
  return request.get('/student/className')
}

/**
 * 获取班主任名
 * @returns
 */
export const getClassTeacherApi = () => {
  return request.get('/student/classTeacher')
}

/**
 * 根据id获取学生信息
 * @param {*} id
 * @returns
 */
export const getStudentApi = (id) => {
  return request.get(`/student/${id}`)
}

/**
 * 修改学生信息
 * @returns
 */
export const updateStudentApi = (params) => {
  return request.put('/student', params)
}

/**
 * 根据id删除学生信息
 * @param {*} id
 * @returns
 */
export const delStudentApi = (id) => {
  return request.delete(`/student/${id}`)
}

/**
 * 新增学生信息
 * @param {*} params
 * @returns
 */
export const saveStudentApi = (params) => {
  return request.post('/student', params)
}
