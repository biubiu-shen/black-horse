<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isShow">
        <span @click="$store.commit('delHistory')">全部删除</span>
        <span @click="isShow = false">完成</span>
      </template>
      <van-icon name="delete" @click="isShow = true" v-else/>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in $store.state.searchHistory"
      :key="index"
      @click.stop="$emit('search',item)"
    >
      <van-icon name="close" @click.stop="removeHistory(index)" v-if="isShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {},
  data () {
    return {
      isShow: false
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    removeHistory (index) {
      // console.log(item)
      this.$store.commit('removeHistory', index)
    }
  }
}
</script>

<style scoped lang="less">
.van-cell {
  span {
    padding: 0 15px;
    font-size: 18px;
  }
}
</style>
