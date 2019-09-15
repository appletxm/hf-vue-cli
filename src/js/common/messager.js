/* global Vue */
const messager = new Vue()
let msgObj
let loadingObj

export default {
  showMsg(type, msg, duration) {
    msgObj = messager.$toast({
      duration: duration || 2000,
      forbidClick: true,
      message: msg
    })
  },

  closeMsg() {
    msgObj.clear()
  },

  showLoading() {
    loadingObj = messager.$toast.loading({
      duration: 0,
      forbidClick: true,
      loadingType: 'spinner'
    })
  },

  closeLoading() {
    if (loadingObj) {
      loadingObj.clear()
    }
  }
}
