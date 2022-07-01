/**
 *获取
 * @param {*} key
 * @returns
 */
export const getItem = (key) => {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (err) {
    return res
  }
}
/**
 *设置
 * @param {*} key
 * @param {*} value
 * @returns
 */
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    return window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    return window.localStorage.setItem(key, value)
  }
}
/**
 *清除某一个数据
 * @param {*} key
 */
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
/**
 * 清除所有数据
 */
export const clearItem = () => {
  window.localStorage.clearItem()
}
