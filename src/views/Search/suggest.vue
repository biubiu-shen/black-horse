<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in suggestList"
      :key="index"
      @click="search(item)"
    >
      <template #title>
        <span v-html="highLight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { searchSuggest } from '@/api/search'
let timer = null
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {
      suggestList: []
    }
  },
  methods: {
    highLight (str) {
      // console.log('str', str)
      const reg = new RegExp(this.searchText, 'g')
      // 需要返回
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    },
    search (item) {
      this.$emit('search', item)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newv) {
        clearTimeout(timer)
        timer = setTimeout(async () => {
          // console.log(newv)
          try {
            const res = await searchSuggest(newv)
            this.suggestList = res.data.data.options
            console.log(this.suggestList)
          } catch (err) {
            console.log(err)
          }
        }, 500)
      },
      immediate: true
    }
  },
  beforeDestroy () {
    // 防止组件被销毁了，定时器还在运行，防止内存泄漏
    clearTimeout(timer)
  },
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
