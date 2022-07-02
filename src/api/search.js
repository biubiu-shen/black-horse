/* eslint-disable camelcase */
import request from '@/utils/request'

export const searchSuggest = (q) => {
  return request({
    url: 'suggestion',
    params: { q }
  })
}
/**
 *
 * @param {页数} param0
 * @param {页面显示多少条数据} param1
 * @param {必选参数，keywords} param2
 * @returns
 */
export const getSearchResults = ({ page = 1, per_page, q }) => {
  return request({
    url: 'search',
    params: { page, per_page, q }
  })
}
