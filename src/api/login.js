import request from '@/utils/request'
// import store from '@/store'
/**
 *
 * @param {mobile,code} param0
 * @returns promise对象
 */
export const LoginApi = ({ mobile, code }) => {
  return request({
    method: 'post',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}
/**
 *
 * @param {*} mobile 手机参数
 * @returns
 */
export const SendCode = (mobile) => {
  return request({
    method: 'get',
    url: `/sms/codes/${mobile}`
  })
}
/**
 *详细的个人资料
 * @returns
 */
export const getUserInfo = () => {
  return request({
    url: 'user'
    // headers: {
    //   Authorization: 'Bearer ' + store.state.user.token
    // }
  })
}
/**
 * 用户编辑页面的数据，照片生日等等
 */
export const getUserProfile = () => {
  return request({
    url: 'user/profile'
  })
}
/**
 *
 * @param {修改个人信息} profile
 * @returns
 */
export const patchProfile = (profile) => {
  return request({
    method: 'patch',
    url: 'user/profile',
    data: profile
  })
}
/**
 *修改头像
 * @param {*} data
 * @returns
 */
export const changeAvaImg = (data) => {
  return request({
    method: 'patch',
    url: 'user/photo',
    data
  })
}
