/* global Vue, vant */
import { decorate } from 'common/axio-decorate'
import vantInit from 'common/vant-init'
import uiAdapt from 'utils/mobile-adapt'
import styles from '../css/index.scss'
import router from './router'
import { setInitialStates } from './store/state'
import { getStore } from './store'
import App from './app'

const { appPrefix } = styles
const state = setInitialStates({ appPrefix })
const store = getStore(state)

vantInit(Vue, vant)
uiAdapt(window, document, 750)
decorate()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
