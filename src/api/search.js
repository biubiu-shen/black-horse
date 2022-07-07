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
/**
 *
 * @param {获取文章} article_ids
 * @returns
 */
export const getArticles = (article_id) => {
  return request({
    url: `/articles/${article_id}`
  })
}
/**
 * 关注接口
 */
export const followMethod = (target) => {
  return request({
    url: 'user/followings',
    method: 'post',
    data: { target }
  })
}
/**
 *取消关注
 * @param {*} target
 * @returns
 */
export const delFollow = (target) => {
  return request({
    method: 'delete',
    url: `user/followings/${target}`
  })
}
/**
 *收藏文章
 * @param {*} target
 * @returns
 */
export const collectMethod = (target) => {
  return request({
    method: 'post',
    url: 'article/collections',
    data: { target }
  })
}
/**
 * 取消收藏
*/
export const delCollect = (target) => {
  return request({
    method: 'delete',
    url: `article/collections/${target}`

  })
}
