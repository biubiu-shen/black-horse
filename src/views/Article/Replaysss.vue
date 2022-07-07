<template>
  <div class="mainB">
    <van-nav-bar :title="title" fixed>
      <template #left>
        <van-icon name="cross" @click="$emit('isReplay', false)" />
      </template>
    </van-nav-bar>
    <CommentItem :item="commit" class="commit"></CommentItem>
    <van-cell title="全部回复"></van-cell>
    <CommentItem v-for="(it, ind) in arr" :key="ind" :item="it"></CommentItem>
    <div class="bottom">
      <van-button type="primary" block round plain @click="isAddShow = true"
        >回复</van-button
      >
    </div>
    <van-popup position="bottom" v-model="isAddShow">
      <AddComment
        :target="commit.com_id"
        :art_id="$route.params.article_id"
        v-if="isAddShow"
        @add-comment="
          arr.unshift($event);
          isAddShow = false;
        "
      ></AddComment>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from '@/components/CommentItem.vue'
import { getCommits } from '@/api/commit'
import AddComment from './addcComment.vue'
export default {
  name: 'replay',
  props: {
    commit: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    this.getCommits()
  },
  data () {
    return {
      offset: null,
      limit: 50,
      arr: [],
      isAddShow: false
    }
  },
  methods: {
    async getCommits () {
      try {
        const res = await getCommits({ type: 'c', source: this.commit.com_id, offset: this.offset, limit: this.limit })
        this.arr = res.data.data.results
        console.log(this.arr)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    title () {
      // if (this.commit.reply_count === 0) {
      //   return '暂无回复'
      // } else {
      //   return this.commit.reply_count + '条评论'
      // }
      if (this.arr.length === 0) {
        return '暂无回复'
      } else {
        return this.arr.length + '条评论'
      }
    }
  },
  watch: {
    // arr: {
    //   handler () {
    //     this.commit.reply_count++
    //   },
    //   depp: true
    // }
  },
  filters: {},
  components: {
    CommentItem,
    AddComment
  }
}
</script>

<style scoped lang="less">
.mainB {
  padding-bottom: 110px;
}
.commit {
  margin-top: 92px;
}
.bottom {
  width: 750px;
  height: 110px;
  position: fixed;
  bottom: 0;
  padding: 10px 30px;
  box-sizing: border-box;
  background-color: pink;
}
</style>
