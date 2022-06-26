import request from '@/utils/request'
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
