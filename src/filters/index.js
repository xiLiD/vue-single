// set function parseTime,formatTime to filter
// export { parseTime, formatTime } from '@/utils'

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}
export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化 */
export function numberFormatter (num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandslsFilter (num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function renderSize (value) {
  if (value === null || value === '') {
    return null
  }
  if (value === undefined) {
    return null
  }
  var unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  var index = 0
  var srcsize = parseFloat(value)
  index = Math.floor(Math.log(srcsize) / Math.log(1024))
  var size = srcsize / Math.pow(1024, index)
  //  保留的小数位数
  size = size.toFixed(2)
  return size + unitArr[index]
}

export function clearHtml (value) {
  var inputBoolean = ''
  if (value === null) {
    return inputBoolean
  }
  inputBoolean = value.replace(/<[^>]+>/g, '')
  inputBoolean = inputBoolean.replace(/&nbsp;/ig, '')
  return inputBoolean
}

export function componentBTopic (value) {
  var componentType = ''
  if (value === 'choice') {
    componentType = 'BSingleQuestion'
  } else if (value === 'choice_multi') {
    componentType = 'BMoreQuestion'
  } else if (value === 'true_false') {
    componentType = 'BJudgQuestion'
  } else if (value === 'fill_blank') {
    componentType = 'BBlankQuestion'
  } else if (value === 'question') {
    componentType = 'BAnswerQuestion'
  }
  return componentType
}
export function BTopicType (value) {
  var componentType = ''
  if (value === 'choice') {
    componentType = '单选题'
  } else if (value === 'choice_multi') {
    componentType = '多选题'
  } else if (value === 'true_false') {
    componentType = '判断题'
  } else if (value === 'fill_blank') {
    componentType = '填空题'
  } else if (value === 'question') {
    componentType = '问答题'
  }
  return componentType
}
export function componentBFilter (value) {
  var componentType = ''
  if (value === 'single') {
    componentType = 'BSingleQuestionStatistics'
  } else if (value === 'more') {
    componentType = 'BMoreQuestionStatistics'
  } else if (value === 'judg') {
    componentType = 'BJudgQuestionStatistics'
  } else if (value === 'blank') {
    componentType = 'BBlankQuestionStatistics'
  } else if (value === 'answer') {
    componentType = 'BAnswerQuestionStatistics'
  }
  return componentType
}
export function colFilter (value) {
  var colType = ''
  if (value === '1') {
    colType = 'colOne box-start'
  } else if (value === '2') {
    colType = 'colTwo box-start-wrap'
  } else if (value === '3') {
    colType = 'colThree box-start-wrap'
  } else if (value === '4') {
    colType = 'colFour box-start-wrap'
  } else if (value === '5') {
    colType = 'colFive box-start-wrap'
  } else if (value === '6') {
    colType = 'colSix box-start-wrap'
  } else if (value === null) {
    colType = 'colOne box-start'
  }
  return colType
}
export function clearHtmlWithImg (value) {
  var inputBoolean = ''
  if (value === null || value === undefined) {
    return inputBoolean
  }
  inputBoolean = value.replace(/<img.+?>/g, '[图片]')
  inputBoolean = inputBoolean.replace(/<[^>]+>/g, '')
  inputBoolean = inputBoolean.replace(/&nbsp;/ig, '')
  if (inputBoolean.length > 12) {
    inputBoolean = inputBoolean.substr(0, 12) + '...'
  }
  return inputBoolean
}

export function clearHtmlWithImgNoEnd (value) {
  var inputBoolean = ''
  if (value === null || value === undefined) {
    return inputBoolean
  }
  inputBoolean = value.replace(/<img.+?>/g, '[图片]')
  inputBoolean = inputBoolean.replace(/<[^>]+>/g, '')
  inputBoolean = inputBoolean.replace(/&nbsp;/ig, '')
  return inputBoolean
}
export function ellipsis (value, num) {
  if (value === null) {
    return null
  } else {
    if (value.length > num) {
      return value.substr(0, num) + '...'
    } else {
      return value
    }
  }
}
export function analysisComponentFilter (value) {
  var componentType = ''
  if (value === 'SINGLE_CHOICE') {
    componentType = 'analysis-single'
  } else if (value === 'MULTIPLE_CHOICE') {
    componentType = 'analysis-more'
  } else if (value === 'DROP_DOWN') {
    componentType = 'analysis-single'
  } else if (value === 'TEXT') {
    componentType = 'analysis-singleInput'
  } else if (value === 'TEXTAREA') {
    componentType = 'analysis-moreText'
  } else if (value === 'GAUGE') {
    componentType = 'analysis-gauge'
  } else if (value === 'CHAINED_DROP_DOWN') {
    componentType = 'analysis-cascade'
  } else if (value === 'FILE') {
    componentType = 'analysis-attachment'
  }
  return componentType
}
export function ascomponentFilter (value) {
  let componentType = ''
  if (value === 'SINGLE_CHOICE') {
    componentType = 'as-single'
  } else if (value === 'MULTIPLE_CHOICE') {
    componentType = 'as-more'
  } else if (value === 'DROP_DOWN') {
    componentType = 'as-dropDown'
  } else if (value === 'TEXT') {
    componentType = 'as-singleInput'
  } else if (value === 'TEXTAREA') {
    componentType = 'as-moreText'
  } else if (value === 'GAUGE') {
    componentType = 'as-gauge'
  } else if (value === 'PARAGRAPH_DESC') {
    componentType = 'as-paragraph'
  } else if (value === 'CHAINED_DROP_DOWN') {
    componentType = 'as-cascade'
  } else if (value === 'FILE') {
    componentType = 'as-attachment'
  }
  return componentType
}
export function backCategoryTreeName (value) {
  if (value === null || value === undefined) {
    return ''
  }
  try {
    var tempArr = JSON.parse(value)
  } catch (error) {
    return ''
  }
  var tempArr2 = []
  for (let i = 0; i < tempArr.length; i++) {
    tempArr2.push(tempArr[i].name)
  }
  return tempArr2.join('/')
}
export function backPositionNames (value) {
  if (value[0] === null) {
    return '所有岗位'
  } else {
    return value
  }
}
export function signStatus (value) {
  if (value === 0) {
    return '未签到'
  } else if (value === 1) {
    return '已签到'
  } else {
    return '迟到'
  }
}
export function trainStatus (value) {
  if (value === 'published') {
    return '发布中'
  } else if (value === 'unpublished') {
    return '未发布'
  } else {
    return '已完成'
  }
}
export function BtestStatus (value) {
  if (value === 'published') {
    return '已发布'
  } else if (value === 'unpublished') {
    return '未发布'
  } else {
    return '已结束'
  }
}
export function questionType (value) {
  if (value === 'CHOICE') {
    return '单选题'
  } else if (value === 'CHOICE_MULTI') {
    return '多选题'
  } else if (value === 'TRUE_FALSE') {
    return '判断题'
  } else if (value === 'FILL_BLANK') {
    return '填空题'
  } else if (value === 'QUESTION') {
    return '问答题'
  } else {
    return value
  }
}
export function questionbType (value) {
  if (value === 'choice') {
    return '单选题'
  } else if (value === 'choice_multi') {
    return '多选题'
  } else if (value === 'true_false') {
    return '判断题'
  } else if (value === 'fill_blank') {
    return '填空题'
  } else if (value === 'question') {
    return '问答题'
  } else {
    return value
  }
}
export function createWay (value) {
  if (value === 1) {
    return '选题组卷'
  } else if (value === 2) {
    return '随机组卷'
  } else if (value === 3) {
    return '从excel导入'
  }
}
export function classStatus (value) {
  if (value === -1) {
    return '删除'
  } else if (value === 0) {
    return '未发布'
  } else if (value === 1) {
    return '发布中'
  }
}
export function courseType (value) {
  if (value === 1) {
    return '一般面授课'
  } else if (value === 2) {
    return '认证课程'
  } else if (value === 10) {
    return '外部课程'
  }
}
export function tagListFilter (value) {
  if (value === null) {
    return null
  } else {
    return JSON.parse(value).join('；')
  }
}
export function teacherType (value) {
  if (value === 1) {
    return '普通讲师'
  } else if (value === 2) {
    return '认证讲师'
  } else if (value === 10) {
    return '外部讲师'
  }
}
export function testResult (value) {
  if (value === 'doing') {
    return '未开始'
  } else if (value === 'paused') {
    return '考试中'
  } else if (value === 'reviewing') {
    return '批阅中'
  } else if (value === 'finished') {
    return '已完成'
  }
}
// 0待发布，1未开始，2进行中，3待判卷，4判卷中，5判卷完成，6已结束，7已取消
// export function testStatus (value) {
//   if (value === 0) {
//     return '待发布'
//   } else if (value === 1) {
//     return '未开始'
//   } else if (value === 2) {
//     return '进行中'
//   } else if (value === 3) {
//     return '待判卷'
//   } else if (value === 4) {
//     return '判卷中'
//   } else if (value === 5) {
//     return '判卷完成'
//   } else if (value === 6) {
//     return '已结束'
//   } else {
//     return '已取消'
//   }
// }
export function signType (value) {
  if (value === 'NOTICE') {
    return '通知'
  } else if (value === 'PROJECT') {
    return '项目'
  } else if (value === 'PUBLIC_COURSE') {
    return '公开课'
  } else if (value === 'EXAM') {
    return '考试'
  } else if (value === 'QUESTIONNAIRE') {
    return '问卷'
  } else if (value === 'COURSE') {
    return '课程'
  } else if (value === 'TEACHER_COURSE') {
    return '授课'
  } else if (value === 'TEACHING') {
    return '带教'
  } else {
    return '已取消'
  }
}
export function paperStatus (value) {
  if (value === 0) {
    return '未提交'
  } else if (value === 1) {
    return '待判卷'
  } else if (value === 2) {
    return '判卷中'
  } else if (value === 3) {
    return '判卷完成'
  } else if (value === 4) {
    return '缺考'
  }
}
export function courseTypeName (value) {
  if (value === 1) {
    return '公开课'
  } else if (value === 2) {
    return '面授课'
  } else if (value === 13 || value === 14) {
    return '线上课程'
  } else if (value === 15) {
    return '组合课程'
  } else if (value === 11) {
    return '文档课程'
  }
}
export function messageType (value) {
  if (value === 1) {
    return '通知消息'
  } else if (value === 2) {
    return '待办通知'
  } else if (value === 3) {
    return '互动通知'
  }
}
export function judge (value) {
  if (value === 1) {
    return '待判卷'
  } else if (value === 2) {
    return '判卷中'
  } else if (value === 3) {
    return '已完成'
  }
}
export function workStatus (value) {
  if (value === 0) {
    return '未使用'
  } else if (value === 1) {
    return '使用中'
  } else if (value === 2) {
    return '失效'
  }
}
export function componentQuestion (value) {
  if (value === 1) {
    return 'singleQuestion'
  } else if (value === 2) {
    return 'moreQuestion'
  } else if (value === 3) {
    return 'judgeQuestion'
  } else if (value === 4) {
    return 'blankQuestion'
  } else if (value === 5) {
    return 'answerQuestion'
  }
}
export function componentQuestionLook (value) {
  if (value === 1) {
    return 'singleQuestionLook'
  } else if (value === 2) {
    return 'moreQuestionLook'
  } else if (value === 3) { // 判断题的查看跟单选题是一样的
    return 'singleQuestionLook'
  } else if (value === 4) {
    return 'blankQuestionLook'
  } else if (value === 5) {
    return 'answerQuestionLook'
  }
}
export function componentQuestionPreview (value) {
  if (value === 1) {
    return 'singleQuestionPreview'
  } else if (value === 2) {
    return 'moreQuestionPreview'
  } else if (value === 3) { // 判断题的查看跟单选题是一样的
    return 'singleQuestionPreview'
  } else if (value === 4) {
    return 'blankQuestionPreview'
  } else if (value === 5) {
    return 'answerQuestionPreview'
  }
}
export function convert (num) {
  return num <= 26 ? String.fromCharCode(num + 64) : convert(~~((num - 1) / 26)) + convert(num % 26 || 26)
}

export function convertArr (value) {
  var tempArr2 = []
  var tempArr
  if (typeof value === 'string') {
    tempArr = JSON.parse(value)
  } else {
    tempArr = value
  }
  for (let i = 0; i < tempArr.length; i++) {
    tempArr2.push(tempArr[i] + 1 <= 26 ? String.fromCharCode(tempArr[i] + 65) : convert(~~((tempArr[i]) / 26)) + convert((tempArr[i] + 1) % 26 || 26))
  }
  return tempArr2.join('、')
}

export function projectStatus (value) {
  if (value === 0) {
    return '待发布'
  } else if (value === 3) {
    return '进行中'
  } else if (value === 4) {
    return '已完成'
  } else if (value === 5) {
    return '已取消'
  }
}
export function coursesStatus (value) {
  if (value === 'closed') {
    return '已关闭'
  } else if (value === 'published') {
    return '已发布'
  } else if (value === 'draft') {
    return '未发布'
  }
}
export function taskProjectStatus (value) {
  if (value === 0) {
    return '待发布'
  } else if (value === 1) {
    return '待创建'
  } else if (value === 2) {
    return '未开始'
  } else if (value === 3) {
    return '进行中'
  } else if (value === 4) {
    return '已完成'
  } else if (value === 5) {
    return '已取消'
  }
}

export function assignStatus (value) {
  if (value === 0) {
    return '待分派'
  } else if (value === 1) {
    return '待确认'
  } else if (value === 2) {
    return '实施中'
  } else if (value === 3) {
    return '已结束'
  }
}

export function releaseStatus (value) {
  if (value === 0) {
    return '待下达'
  } else if (value === 1) {
    return '完成中'
  } else if (value === 2) {
    return '已结束'
  }
}

export function executeStatus (value) {
  if (value === 0) {
    return '未开始'
  } else if (value === 1) {
    return '实施中'
  } else if (value === 2) {
    return '已完成'
  }
}
export function isOutTime (value) {
  const timestamp = Date.parse(new Date()) / 1000
  if (value < timestamp) {
    return '已过期'
  } else {
    return '正在使用'
  }
}

export function roleFilter (value) {
  if (value === 'role_super_admin') {
    return '超级管理员'
  } else if (value === 'role_enterprise_admin') {
    return '管理员'
  } else if (value === 'enterprise_hr') {
    return '联合hr'
  } else if (value === 'teacher') {
    return '讲师'
  } else if (value === 'student') {
    return '学员'
  }
}
export function categoryName (arr) {
  if (arr.length === 0) {
    return null
  } else {
    return arr[arr.length - 1].name
  }
}
export function blankFilter (value) {
  return value.replace(/{{}}/g, '_______')
}
export function formName (value) {
  return value.replace(/\|/g, '、')
}
export function numFilter (value) {
  if (value < 10) {
    return '0' + value
  } else {
    return value
  }
}

export function countdownFilter (value) {
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
    if (secondTime > 9) {
      result = '' + parseInt(secondTime)
    } else {
      result = '' + '0' + parseInt(secondTime)
    }
  }
  if (minuteTime >= 0) {
    if (minuteTime > 9) {
      result = '' + parseInt(minuteTime) + ':' + result
    } else {
      result = '' + '0' + parseInt(minuteTime) + ':' + result
    }
  }
  if (hourTime >= 0) {
    if (hourTime > 9) {
      result = '' + parseInt(hourTime) + ':' + result
    } else {
      result = '' + '0' + parseInt(hourTime) + ':' + result
    }
  }
  if (dayTime > 0) {
    result = '' + parseInt(dayTime) + ':' + result
  }
  return result
}

export function testStatus (value) {
  if (value === 'unpassed') {
    return '未通过'
  } else if (value === 'passed') {
    return '通过'
  }
}

export function payStatus (value) {
  if (value === 'success') {
    return '已付款'
  } else if (value === 'topay') {
    return '待支付'
  }
}

export function appointStatus (value) {
  if (value === 'appointment') {
    return '预约成功'
  } else {
    return '处理中'
  }
}
