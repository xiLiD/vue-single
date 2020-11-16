export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') { return ['一', '二', '三', '四', '五', '六', '日'][value - 1] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

export function inputIntNum (value) {
  const value1 = value.toString().replace(/^(0+)|[^\d]+/g, '')
  return value1
}
export function formatTime (time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

// 格式化时间
export function getQueryObject (url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}
// 将秒数换成时分秒格式
export function formatSeconds (value) {
  if (value === null) {
    return null
  }
  var secondTime = parseInt(value)// 秒
  var minuteTime = 0// 分
  var hourTime = 0// 小时
  var dayTime = 0// 天
  if (secondTime > 60) { // 如果秒数大于60，将秒数转换成整数
    // 获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt(secondTime / 60)
    // 获取秒数，秒数取佘，得到整数秒数
    secondTime = parseInt(secondTime % 60)
    // 如果分钟大于60，将分钟转换成小时
    if (minuteTime > 59) {
      // 获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt(minuteTime / 60)
      // 获取小时后取佘的分，获取分钟除以60取佘的分
      minuteTime = parseInt(minuteTime % 60)
    }
    // 如果小时大于24，将小时转换成天
    if (hourTime > 23) {
      // 获取天，获取分钟除以60，得到整数天
      dayTime = parseInt(hourTime / 24)
      // 获取天后取佘的小时，获取小时除以24取佘的小时
      hourTime = parseInt(hourTime % 24)
    }
  }
  var result = ''
  if (secondTime >= 0) {
    if (parseInt(secondTime) < 10) {
      result = '' + '0' + parseInt(secondTime) + '秒'
    } else {
      result = '' + parseInt(secondTime) + '秒'
    }
  }
  if (minuteTime > 0) {
    result = '' + parseInt(minuteTime) + '分' + result
  }
  if (hourTime > 0) {
    result = '' + parseInt(hourTime) + '小时' + result
  }
  if (dayTime > 0) {
    result = '' + parseInt(dayTime) + '天' + result
  }
  return result
}
export function dayToSecond (val) {
  return Number(val) * 3600 * 24
}
export function hourToSecond (val) {
  return Number(val) * 3600
}
export function minToSecond (val) {
  return Number(val) * 60
}
export function secondToDay (val) {
  return Number(val) / (3600 * 24)
}
export function secondToHour (val) {
  return Number(val) / 3600
}
export function secondToMin (val) {
  return Number(val) / 60
}

export function cleanArray (actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param (json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

export function html2Text (val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge (target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function scrollTo (element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = (difference / duration) * 10
  setTimeout(() => {
    // console.log(new Date())
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function toggleClass (element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [
  {
    text: '今天',
    onClick (picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一周',
    onClick (picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一个月',
    onClick (picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近三个月',
    onClick (picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }
]

export function getTime (type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
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

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function uniqueArr (arr) {
  return Array.from(new Set(arr))
}

export function formatString (args) {
  var result = ''
  if (arguments.length > 1) {
    result = arguments[0]
    // if (arguments.length === 2 && typeof (args) === 'object') {
    //   for (var key in args) {
    //     if (args[key] !== undefined) {
    //       var reg = new RegExp('({' + key + '})', 'g')
    //       result = result.replace(reg, args[key])
    //     }
    //   }
    // } else {
    for (var i = 1; i < arguments.length; i++) {
      if (arguments[i] !== undefined) {
        var reg2 = new RegExp('({[' + (i - 1) + ']})', 'g')
        result = result.replace(reg2, arguments[i])
      }
    }
    // }
  }
  return result
}
export function timestampToDate5 (timestamp) {
  return timestampTo(timestamp, 'yyyy年MM月dd日')
}
export function timestampTo (timestamp, fmt) {
  if (!timestamp) {
    return ''
  }
  var date = new Date(timestamp * 1000)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
// export function timestampToTime (timestamp) {
//   if (!timestamp) {
//     return ''
//   }
//   var datetime = new Date()
//   datetime.setTime(timestamp)
//   var year = datetime.getFullYear()
//   var month = datetime.getMonth() + 1
//   var date = datetime.getDate()
//   var hour = datetime.getHours()
//   var minute = datetime.getMinutes()
//   var second = datetime.getSeconds()
//   // var mseconds = datetime.getMilliseconds()
//   return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
// }
export function timestampToDate (timestamp) {
  return timestampTo(timestamp, 'yyyy-MM-dd')
}
export function timestampToTime (timestamp) {
  return timestampTo(timestamp, 'yyyy-MM-dd hh:mm')
}
export function timestampToTime3 (timestamp) {
  return timestampTo(timestamp, 'yyyy年MM月dd日hh:mm')
}
export function timestampToTime4 (timestamp) {
  if (new Date(timestamp).getFullYear() === new Date().getFullYear()) {
    return timestampTo(timestamp, 'MM月dd日hh:mm')
  }
  return timestampTo(timestamp, 'yyyy年MM月dd日hh:mm')
}
// export function timestampToTime2 (timestamp) {
//   var today = new Date()
//   today = new Date(today.getFullYear(), today.getMonth(), today.getDate())
//   var date = new Date(timestamp)
//   var hour = date.getHours()
//   var minute = date.getMinutes()
//   var time = ' ' + (hour > 9 ? hour : '0' + hour) + ':' + (minute > 9 ? minute : '0' + minute)
//   date = new Date(date.getFullYear(), date.getMonth(), date.getDate())
//   var diff = (date - today) / 1000 / 60 / 60 / 24
//   if (diff >= -1 && diff < 0) {
//     return i18n.t('yestoday') + time
//   } else if (diff === 0) {
//     return i18n.t('today') + time
//   } else if (diff > 0 && diff <= 1) {
//     return i18n.t('tomorrow') + time
//   }
//   return timestampTo(timestamp, 'yyyy-MM-dd hh:mm')
// }
export function timestampToDateTime (timestamp) {
  return timestampTo(timestamp, 'yyyy-MM-dd hh:mm:ss')
}
export function dateTimeToTimestamp (dateTime) {
  var d = new Date(dateTime)
  return d.getTime() / 1000
}
export function dateDifference (timestamp) {
  var today = new Date()
  today = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  var date = new Date(timestamp)
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  var diff = (date - today) / 1000 / 60 / 60 / 24
  return diff
}
export function secondToHourMinuteSecond (second, hourStr, minuteStr, secondStr) {
  if (!second) {
    return null
  }
  var h = Math.floor(second / 3600)
  var m = Math.floor((second / 60 % 60))
  var s = Math.floor((second % 60))
  if (h > 0) {
    return h + hourStr + m + minuteStr + s + secondStr
  }
  if (m > 0) {
    return m + minuteStr + s + secondStr
  }
  return s + secondStr
}

export function getUrlParameter (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return (r[2])
  }
  return null
}
