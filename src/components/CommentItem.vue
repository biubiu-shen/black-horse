<template>
  <van-cell>
    <van-image
      slot="icon"
      round
      width="30"
      height="30"
      style="margin-right: 10px"
      :src="item.aut_photo"
    />
    <span style="color: #466b9d" slot="title">hello</span>
    <div slot="label">
      <p style="color: #363636">{{ item.content }}</p>
      <p>
        <span style="margin-right: 10px">{{ item.pubdate | dateFormat }}</span>
        <van-button
          size="mini"
          type="default"
          @click="$emit('replay-show', item)"
          >回复</van-button
        >
      </p>
    </div>
    <van-loading v-if="iSloading"></van-loading>
    <van-icon
      v-else
      slot="right-icon"
      :name="item.is_liking ? 'like' : 'like-o'"
      :color="item.is_liking ? 'red' : ''"
      @click="isLike"
      >{{ item.like_count > 0 ? item.like_count : "赞" }}</van-icon
    >
  </van-cell>
</template>

<script>
import { likeMethod, delLike } from '@/api/commit'
export default {
  props: {
    item: {
      type: [Object, Array],
      required: true
    }
  },
  created () { },
  data () {
    return {
      iSloading: false
    }
  },
  methods: {
    async isLike () {
      this.iSloading = true
      if (this.item.is_liking) {
        try {
          await delLike(this.item.com_id)
          this.item.like_count--
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await likeMethod(this.item.com_id)
          this.item.like_count++
        } catch (err) {
          console.log(err)
        }
      }
      this.item.is_liking = !this.item.is_liking
      this.iSloading = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
