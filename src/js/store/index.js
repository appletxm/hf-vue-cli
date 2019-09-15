/* global Vuex */
import mutations from './mutations'

export const getStore = (state) => new Vuex.Store({
  state,
  getters: {},
  actions: {},
  mutations
})
