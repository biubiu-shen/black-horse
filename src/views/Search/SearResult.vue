<template>
  <div class="main">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="(item, index) in list" :key="index">
          <ArticleItem :article="item"></ArticleItem>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
    // console.log('res', this.searchText)
    this.getSearchResults()
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      per_page: 10,
      page: 1,
      isLoading: false
    }
  },
  methods: {
    async getSearchResults () {
      try {
        const res = await getSearchResults({ page: this.page, pre_page: this.pre_page, q: this.searchText })
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        this.list.push(...res.data.data.results)
        this.loading = false
        this.isLoading = false
        console.log(this.list)
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.page++
      this.getSearchResults()
    },
    onRefresh () {
      this.list = []
      this.page = 1
      this.getSearchResults()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    // ArtList
    ArticleItem
  }
}
</script>

<style scoped lang="less">
.main {
  height: calc(100vh - 108px);
  overflow: auto;
}
</style>
