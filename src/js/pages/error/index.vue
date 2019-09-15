<template>
  <div :class="[$store.state.appPrefix + '-p-error']">
    <div class="pic">
      <img
        :src="errorPic"
        width="65%"
      />
    </div>
    <div class="info">
      <h1>抱歉，出错了！</h1>
    </div>
    <div class="btn">
      <mt-button
        type="primary"
        @click="$gotoHome()"
      >
        返回首页
      </mt-button>
    </div>
  </div>
</template>

<script>
import { CURRENT_MODULE } from 'store/mutation-types'

const envCfg = require('env.cfg')

export default {
  data() {
    return {
      title: 'this is the error page',
      errorPic: envCfg.publicPath + 'assets/images/404_pic@2x.png'
    }
  },

  created() {
    this.$store.commit(CURRENT_MODULE, '')
  },

  methods: {
    $gotoHome() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
