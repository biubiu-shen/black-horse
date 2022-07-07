<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="item in commitsList"
        :key="item.com_id"
        :item="item"
        @replay-show="$emit('replay-show', $event)"
      >
      </CommentItem>
    </van-list>
  </div>
</template>

<script>
import CommentItem from '@/components/CommentItem.vue'
import { getCommits } from '@/api/commit'
export default {
  props: {
    type: {
      type: String,
      required: true,
      validator (value) {
        // 只可以输入a或者c
        return ['a', 'c'].includes(value)
      }
    },
    source: {
      type: [Number, String],
      required: true
    },
    commitsList: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getCommits()
  },
  data () {
    return {
      loading: false,
      finished: false,
      paramsObj: {
        type: this.type,
        source: this.source,
        offset: null,
        limit: 3
      }
      // commitsList: []
    }
  },
  methods: {
    async getCommits () {
      try {
        const res = await getCommits(this.paramsObj)
        if (res.data.data.results.length === 0) {
          // 如果这一组长度未零，那么就结束加载
          // 不加，数据会无限循环，应为偏移量变成了null，就会重新请求
          this.finished = true
        }
        this.$emit('setCount', res.data.data.total_count)
        this.commitsList.push(...res.data.data.results)
        // 最后一组的id作为下此次的偏移量
        this.paramsObj.offset = res.data.data.last_id
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getCommits()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    CommentItem
  }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
