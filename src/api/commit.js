import request from '@/utils/request'
/**
 *
 * @param  type 评论类型
 * @param  source id
 * @param  offset 第几页 有默认值
 * @param  limit 评论数 有默认值
 * @returns
 */
export const getCommits = ({ type, source, offset, limit }) => {
  return request({
    url: 'comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}
/**
 *点赞评论
 * @param {评论id} target
 * @returns
 */
export const likeMethod = (target) => {
  return request({
    method: 'post',
    url: 'comment/likings',
    data: {
      target
    }
  })
}
/**
 *取消点赞评论
 * @param {*} target
 * @returns
 */
export const delLike = (target) => {
  return request({
    method: 'delete',
    url: `comment/likings/${target}`
  })
}
/**
 *发表评论
 target（用户id）,art-id(对文章评论不用加，回复别人必须加),content（文章内容）
 * @param {*} data
 * @returns
 */
export const addComments = (data) => {
  return request({
    url: 'comments',
    method: 'post',
    data
  })
}
