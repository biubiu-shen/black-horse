import request from '@/utils/request'
/**
 *
 * @returns 我的频道
 */
export const getChannel = () => {
  return request({
    url: '/user/channels'
  })
}
/**
 *
 * @param {频道id,时间戳} param0
 * @returns
 */
// eslint-disable-next-line camelcase
export const getArtList = ({ channel_id, timestamp }) => {
  return request({
    url: '/articles',
    params: { channel_id, timestamp }
  })
}
export const getAllArtList = () => {
  return request({
    url: '/channels'
  })
}
export const setChannels = (channels) => {
  return request({
    method: 'PUT',
    url: 'user/channels',
    data: {
      channels
    }
  })
}
