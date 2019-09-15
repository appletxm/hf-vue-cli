<template>
  <ul :class="[$store.state.appPrefix + '-c-navigator']">
    <li
      v-for="item in $store.state.navigatorList"
      :key="item.id"
      :class="[$store.state.currentModule === item.module && 'actived']"
      @click="(event) => {gotoPage(event, item)}"
    >
      <span :class="[item.icon]"></span>{{ item.label }}
    </li>
  </ul>
</template>

<script>
import { CURRENT_MODULE } from 'store/mutation-types'

export default {
  components: {},
  data() {
    return {}
  },
  computed: {},

  watch: {},

  created() {},

  mounted() {
  },

  methods: {
    gotoPage(event, item) {
      event.stopPropagation()

      if (item.module === this.$store.state.currentModule) {
        return false
      }

      this.$router.push({
        path: item.url
      })

      this.$store.commit(CURRENT_MODULE, item.module)
    }
  }
}
</script>
