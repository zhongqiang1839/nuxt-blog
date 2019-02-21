import { ARTICLE_SOURCE, FN_CATEGORYS } from '~/utils/constant'
/**
 *
 * @export
 * @param {any} time 输入需要转化的时间参数
 * @param {any} format 需要转化的格式
 * @returns 返回处理后的时间格式
 */
export function dateFormat (times, format) {
  let time = Date.parse(times);
  const between = (Date.now() - Number(time)) / 1000;
  if (between < 3600 && ((between / 60) < 1)) {
    return '刚刚'
  } else if (between < 3600) {
    return pluralize(~~(between / 60), '分钟')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), '小时')
  }
  if (!time) return null;
  let date = new Date(time);
  let o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    'S': date.getMilliseconds() // millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

export function sourceFormat(value) {
  return ARTICLE_SOURCE.filter(item => {
    return value === item.value
  })[0].label;
}

export function sourceStyle(value) {
  return ARTICLE_SOURCE.filter(item => {
    return value === item.value
  })[0].code;
}

export function typeFormat(type) {
  return FN_CATEGORYS.filter(item => {
    return type === item.value
  })[0].label;
}

function pluralize (time, label) {
  return time + label + '以前'
}

// 文字长度
export function text (text, length = text.lenth) {
  const cansub = text && text.length > length;
  return cansub ? text.substr(0, length) + '...' : text
}

