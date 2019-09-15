/* global moment */
/**
 * 获取 url 中 search 的参数
 * @param {String} name 参数的名字
 * @param {String} search url 中的 search，或指定的 类似 ?val=1&id=11 的字符串
 */
export const getQueryString = (name, search = window.location.search) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = search.substr(1).match(reg)
  if (r !== null) {
    return unescape(r[2])
  } else {
    return null
  }
}

/**
 * 更换页面 title
 * @param {String} pageTitle
 */
export const changeTitle = (pageTitle) => {
  document.title = pageTitle
  return pageTitle
}

/**
 * 时间戳转时间
 * @param {String} timestamp
 */
export const timestampToTime = (timestamp) => moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
/**
 * 除去字符串最后一个字符
 * @param {String} str
 */
export const subStringLastStr = (str) => str.substring(0, str.length - 1)

export const scrollAnimate = (outer) => {
  const inner = outer.querySelector('ul')
  const stepGap = outer.offsetHeight
  const maxHeight = inner.offsetHeight
  let top = inner.getAttribute('top')

  top = top ? parseInt(top, 10) : 0

  setInterval(() => {
    top = top - stepGap
    // console.info(stepGap, maxHeight, top)
    if (Math.abs(top) >= maxHeight) {
      top = 0
    }
    inner.setAttribute('top', top)
    inner.style.top = top + 'px'
  }, 3000)
}

/**
 * cookie
 */
export const uiCookie = {
  set(name, value, time) {
    const exp = new Date()
    exp.setTime(exp.getTime() + (+time)) // 过期时间以毫秒为单位
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
  },

  get(name) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    const arr = document.cookie.match(reg)

    if (arr && arr.length >= 3) {
      return (arr[2])
    } else {
      return null
    }
  },

  delete(name) {
    const exp = new Date()
    exp.setTime(exp.getTime() - 1)
    const cval = this.get(name)
    if (cval != null) {
      document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/'
    }
  }
}

export const checkType = {
  isFunction(fun) {
    return fun && typeof fun === 'function'
  }
}
