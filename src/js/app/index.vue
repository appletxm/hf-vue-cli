<template>
  <div :class="[$store.state.appPrefix + '-my-app']">
    <navigator></navigator>
    <div :class="[$store.state.appPrefix + '-module-all']">
      <router-view></router-view>
    </div>
    <van-dialog
      v-model="isPopLoginShow"
      title="请登录"
      :show-confirm-button="false"
    >
      <user-login
        :close-cb="closeLoginCb"
        :success-cb="loginSuccessCb"
      ></user-login>
    </van-dialog>
  </div>
</template>

<script>
import navigator from 'components/navigator'
import userLogin from 'components/user-login'
import {
  checkUserLogin
} from 'common/auth'
import {
  NAVIGATOR_LIST,
  NEED_SHOW_LOGIN_POP
} from 'store/mutation-types'
import {
  getNavigatorList,
  runEventQueue
} from './models'

export default {
  components: {
    navigator,
    userLogin
  },
  data() {
    return {
      isPopLoginShow: false,
      dialogVisible: true
    }
  },
  watch: {
    // '$store.state.needShowLoginPop'(val) {
    //   console.info('====', val)
    // }
  },
  created() {
    const navigatorList = getNavigatorList()
    this.$store.commit(NAVIGATOR_LIST, navigatorList)
    if (!checkUserLogin()) {
      this.$store.commit(NEED_SHOW_LOGIN_POP, true)
      this.isPopLoginShow = true
    }
  },
  mounted() {
  },
  methods: {
    closeLoginCb() {
      this.isPopLoginShow = false
    },
    loginSuccessCb() {
      this.$store.commit(NEED_SHOW_LOGIN_POP, false)
      this.closeLoginCb()
      runEventQueue(this.$route)
    }
  }
}
</script>
