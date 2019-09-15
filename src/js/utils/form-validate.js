export default {
  normal(value, min, max) {
    let regStr = '[\\u4e00-\\u9fa5|\\x00-\\xff|\\d|\\w|_|\\$]'

    if (min && max) {
      regStr += '{' + min + ',' + max + '}'
    } else if (max) {
      regStr += '{,' + max + '}'
    } else if (min) {
      regStr += '{' + min + ',}'
    }

    regStr = '^' + regStr + '$'
    const regexp = new RegExp(regStr)

    return regexp.test(value)
  },

  text(value, min, max) {
    let regStr

    if (typeof value !== 'string' && typeof value !== 'number') {
      return false
    }

    regStr = '[\\u4e00-\\u9fa5|\\x00-\\xff|\\d|\\w|_|\\$|\\.|。|,|，|（|）|\\(|\\)]'
    if (min && max) {
      regStr += '{' + min + ',' + max + '}'
    } else if (max) {
      regStr += '{,' + max + '}'
    } else if (min) {
      regStr += '{' + min + ',}'
    }

    regStr = '^' + regStr + '$'
    const regexp = new RegExp(regStr)

    return regexp.test(value)
  },

  phone(value) {
    let regStr

    regStr = '1[3|4|5|7|8|9]\\d{9}'

    regStr = '^' + regStr + '$'
    const regexp = new RegExp(regStr)

    // console.info('phone:', regStr, regexp, value, regexp.test(value))

    return regexp.test(value)
  },

  telephone(value) {
    let regStr

    regStr = '\\d{3,4}-\\d{7,8}'
    regStr = '^' + regStr + '$'
    const regexp = new RegExp(regStr)

    // console.info('telephone:', regStr, regexp, value, regexp.test(value))

    return regexp.test(value)
  },

  password(value, min, max) {
    let regStr = '.'

    if (min && max) {
      regStr += '{' + min + ',' + max + '}'
    } else if (max) {
      regStr += '{,' + max + '}'
    } else if (min) {
      regStr += '{' + min + ',}'
    }

    regStr = '^' + regStr + '$'
    const regexp = new RegExp(regStr)

    return regexp.test(value)
  },

  validateCode(value, min, max) {
    let regStr = '\\d'

    if (min && max) {
      regStr += '{' + min + ',' + max + '}'
    } else if (max) {
      regStr += '{,' + max + '}'
    } else if (min) {
      regStr += '{' + min + ',}'
    }

    regStr = '^' + regStr + '$'
    const regexp = new RegExp(regStr)

    return regexp.test(value)
  },

  checkNameHasCall(value) {
    let res = true

    if (value.match('先生')) {
      res = false
    } else if (value.match('女士')) {
      res = false
    } else if (value.match('小姐')) {
      res = false
    } else if (value.match('匿名')) {
      res = false
    }

    return res
  },

  checkExistName(value) {
    let res = true

    const regStr = /^[\u2E80-\u9FFF]+$/
    const regexp = new RegExp(regStr)
    if (!this.normal(value, 2, 8) || !regexp.test(value) || !this.checkNameHasCall(value)) {
      res = false
    }
    return res
  }
}
