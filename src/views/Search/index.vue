<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.go(-1)"
        autofocus
        @focus="isSearch = false"
        background="#3296fa"
      />
      <search-histroy v-if="value.trim().length === 0" @search="onSearch($event)"></search-histroy>
      <template v-else>
        <search-result v-if="isSearch" :searchText="value"></search-result>
        <suggest
          v-else
          :searchText="value"
          @search="onSearch($event)"
        ></suggest>
      </template>
    </form>
  </div>
</template>

<script>
import SearchHistroy from './SearchHistroy.vue'
import suggest from './suggest.vue'
import SearchResult from './SearResult.vue'
export default {
  created () { },
  data () {
    return {
      value: '',
      isSearch: false
    }
  },
  methods: {
    onSearch (str) {
      // 在搜索框中回车事件，默认传参是value，此时str就是输入的value值
      // console.log(str)
      this.value = str
      this.isSearch = true
      this.$store.commit('setSearchHistory', this.value)
    }
    // search (str) {
    // }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    SearchHistroy,
    suggest,
    SearchResult
  }
}
</script>

<style scoped lang="less">
/deep/.van-search__action {
  color: #fff;
}
/deep/.van-search__action:active {
  background-color: unset;
}
</style>
