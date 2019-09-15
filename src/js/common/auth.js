import * as uiUtils from 'utils/ui-utils'

const ACCESS_TOKEN = 'loginToken'
const cookieTime = 1000 * 60 * 60 * 24 * 7

export function checkUserLogin() {
  let hasToken
  hasToken = false
  if (uiUtils.uiCookie.get(ACCESS_TOKEN)) {
    hasToken = true
  }

  return hasToken
}

export function setTokenToCookie(value) {
  uiUtils.uiCookie.set(ACCESS_TOKEN, value, cookieTime)
}

export function getTokenFromCookie() {
  return uiUtils.uiCookie.get(ACCESS_TOKEN)
}

export function removeAllCookie() {
  uiUtils.uiCookie.delete(ACCESS_TOKEN)
}
