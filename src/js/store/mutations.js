import * as actionTypes from './mutation-types'

export default {
  [actionTypes.ANNOUNCEMENT_LIST](state, value) {
    state.announcementList = value
  },

  [actionTypes.NAVIGATOR_LIST](state, value) {
    state.navigatorList = value
  },

  [actionTypes.CURRENT_MODULE](state, value) {
    state.currentModule = value
  },

  [actionTypes.USER_INFO](state, value) {
    state.userInfo = value
  },

  [actionTypes.NEED_SHOW_LOGIN_POP](state, value) {
    state.needShowLoginPop = value
  }
}
