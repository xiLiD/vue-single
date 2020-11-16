
import Cookies from 'js-cookie'
// import store from '@/store'
const TokenKey = 'vToken'

export function getToken () {
  return Cookies.get(TokenKey)
}
export function setToken (token) {
  // console.log('最后setcookie', token)
  return Cookies.set(TokenKey, token)
  // return Cookies.set(TokenKey, token, { expires: 1 }) // 1天 / 24小时 = 1小时
  // return Cookies.set(TokenKey, token, { expires: 0.5 }) // 过期时间 半天
}
export function getUserInfo () {
  return JSON.parse(localStorage.getItem('BuserInfo'))
}
export function setUserInfo (data) {
  localStorage.setItem('BuserInfo', JSON.stringify(data))
}
export function removeUserInfo () {
  localStorage.removeItem('BuserInfo')
}
export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
