<template src="./template.html"></template>

<script>
import { setTokenToCookie } from 'common/auth'
import messager from 'common/messager'
import models from './models'

export default {
  components: {},
  props: {
    closeCb: {
      type: Function,
      default: null
    },
    successCb: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      userName: '',
      password: ''
    }
  },
  computed: {},

  watch: {},

  created() {},

  mounted() {
  },

  methods: {
    $cancel() {
      if (this.closeCb) {
        this.closeCb()
      }
    },

    $doLogin() {
      messager.showLoading()
      models.doLogin(this.userName, this.password).then((res) => {
        messager.closeLoading()
        setTokenToCookie(res.data)
        if (this.successCb) {
          this.successCb(res.data)
        }
      }).catch((err) => {
        messager.closeLoading()
        console.warn('doLogin:', err)
      })
    }
  }
}
</script>
