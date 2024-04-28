import request from '@/utils/request'

/**
 * 测试获取信息
 * @returns
 */
export const getPaymentListApi = () => {
  return request.get('/payment/getList')
}

/**
 * 分页查询
 * @param {*} params
 * @returns
 */
export const paymentPageApi = (params) => {
  return request.get('/payment/page', { params })
}

/**
 * 新增
 * @param {*} params
 * @returns
 */
export const savePaymentApi = (params) => {
  return request.post('/payment', params)
}

/**
 * 根据id查询
 * @param {*} id
 * @returns
 */
export const getByIdApi = (id) => {
  return request.get(`/payment/${id}`)
}

/**
 * 修改
 * @param {*} params
 * @returns
 */
export const updatePaymentApi = (params) => {
  return request.put('/payment', { params })
}
