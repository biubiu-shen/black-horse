<template>
  <van-loading v-if="loading" size=".53333rem"></van-loading>
  <van-icon
    v-else
    color="#777"
    :name="is_collect ? 'star' : 'star-o'"
    @click="onClick"
  />
</template>

<script>
import { collectMethod, delCollect } from '@/api/search'
export default {
  name: 'Collect',
  props: {
    is_collect: {
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
      loading: false
    }
  },
  methods: {
    async onClick () {
      this.loading = true
      if (this.is_collect) {
        try {
          // 也可以使用文章路径自带的id，通过 $router.params.article_id获取target值
          const res = await delCollect(this.target)
          this.$emit('update:is_collect', !this.is_collect)
          console.log(res)
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          const res = await collectMethod(this.target)
          this.$emit('update:is_collect', !this.is_collect)
          console.log(res)
        } catch (err) {
          console.log(err)
        }
      }
      this.loading = false
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
