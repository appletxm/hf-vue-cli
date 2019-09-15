import axios from 'axios'
import { getTokenFromCookie } from 'common/auth'
import * as errorHandler from 'common/error-handler'

/* eslint-disable */
export function decorate() {
  axios.defaults.withCredentials = true
  axios.defaults.header = true
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  axios.defaults.headers.loginToken = getTokenFromCookie()

  axios.interceptors.request.use(function (config) {
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  axios.interceptors.response.use(function (response) {
    let resData = response.data
    if (resData.code === 200 || resData.code === '200') {
      return resData
    } else {
      if (errorHandler.errorCodeMatch[resData.code]) {
        errorHandler.errorCodeMatch[resData.code](resData)
      } else {
        throw ({code: resData.code, message: resData.detailMessage || resData.message})
      }
    }
  }, function (error) {
    return Promise.reject(error)
  })
}

export function setHttpHeaderCookie() {
  axios.defaults.headers.loginToken = auth.getTokenFromCookie()
}
/* eslint-enable */
