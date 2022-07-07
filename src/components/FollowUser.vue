<template>
  <van-button
    :disabled="isAjax"
    :loading="isAjax"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    :icon="value ? '' : 'plus'"
    :plain="value"
    @click="onClick"
    >{{ value ? "已关注" : "关注" }}</van-button
  >
</template>

<script>
import { followMethod, delFollow } from '@/api/search'
export default {
  name: 'FolllowUser',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    target: {
      type: [String, Number],
      required: true
    }
  },
  created () { },
  data () {
    return {
      isAjax: false
    }
  },
  methods: {
    async onClick () {
      this.isAjax = true
      if (this.value) {
        try {
          const res = await delFollow(this.target)
          this.$emit('input', !this.value)
          console.log(res)
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          const res = await followMethod(this.target)
          this.$emit('input', !this.value)
          console.log(res)
        } catch (err) {
          console.log(err)
        }
      }
      this.isAjax = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
