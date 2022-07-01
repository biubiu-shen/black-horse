<template>
  <van-cell-group>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      ref="pullrefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in artList"
          :key="index"
          :title="item.title"
          value="内容"
          label="描述信息"
        /> -->
        <Art v-for="(item, index) in artList" :key="index" :article="item"></Art>
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>
import { getArtList } from '@/api/home'
import Art from '@/components/ArticleItem.vue'
let ele
let scrollT = 0
export default {
  name: 'ArtList',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getArtList1()
  },
  mounted () {
    // refs还需要加上￥el才可以获取到元素本身
    // console.log(this.$refs.pullrefresh.$el)
    ele = this.$refs.pullrefresh.$el
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      scrollT = this.scrollTop
      // console.log(this.scrollTop)
    })
  },
  activated () {
    // 解决切换路由，记不住之前浏览的位置问题
    ele.scrollTop = scrollT
  },
  data () {
    return {
      timestamp: Date.now(),
      artList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getArtList1 () {
      // refreshing表示是否下拉，如果用户下拉，这个值自动会变成true
      // 就会执行if中的函数体
      if (this.refreshing) {
        this.artList = []
        this.refreshing = false
      }
      try {
        const res = await getArtList({ channel_id: this.id, timestamp: this.timestamp })
        this.timestamp = res.data.data.pre_timestamp
        console.log(this.timestamp)
        // 最后一页数据是timestamp值为null，所以需要将finished值改为true意思是加载完成
        if (this.timestamp === null) {
          this.finished = true
        }
        this.artList.push(...res.data.data.results)
        this.loading = false// 申请完一次就需要将loading状态改为false，不然一直会有小圈圈
        console.log(this.artList)
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getArtList1()
    },
    onRefresh () {
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.finished = false
      this.loading = true
      // 需要获得最新的时间戳，来获取最新数据
      this.timestamp = Date.now()
      this.getArtList1()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    Art
  }
}
</script>

<style scoped lang="less">
/deep/.van-pull-refresh {
  //负号前后要加空格，严谨
  height: calc(100vh - 274px);
  overflow: auto;
  //解决滚动条共享的错误，给包裹加载页面的最上一级的父级加
}
</style>
