/* global localStorage */
export default {
  loginOutRemoveAll() {
    localStorage.clear()
  },

  get(key) {
    let res = localStorage.getItem(key)

    res = res ? decodeURIComponent(res) : ''
    if ((/\{|\}|\[|\]/g).test(res)) {
      try {
        return JSON.parse(res)
      } catch (e) {
        return res
      }
    } else {
      return res
    }
  },

  set(key, value) {
    const objKeys = typeof value === 'string' ? [] : Object.keys(value)
    let str = value

    if (objKeys.length > 0) {
      str = JSON.stringify(value)
    } else {
      if (str === null || str === undefined) {
        str = ''
      }
    }

    str = encodeURIComponent(str)

    localStorage.setItem(key, str)
  },

  remove(key) {
    localStorage.removeItem(key)
  }
}
