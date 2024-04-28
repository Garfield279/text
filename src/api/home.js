import request from '@/utils/request'

/**
 * 获取card信息
 * @returns
 */
export const getCardApi = () => {
  return request.get('/home/card')
}

/**
 * 获取图表一信息
 * @returns
 */
export const getChartOneApi = () => {
  return request.get('/home/chartOne')
}

/**
 * 获取图表二信息
 * @returns
 */
export const getChartTwoApi = () => {
  return request.get('/home/chartTwo')
}

/**
 * 获取图表三信息
 * @returns
 */
export const getChartThreeApi = () => {
  return request.get('/home/chartThree')
}

/**
 * Excel
 * @param {*} params 
 * @returns 
 */
export const getExport = (params) => {
  return request.get('/home/export', { params, responseType: "blob" } )
}