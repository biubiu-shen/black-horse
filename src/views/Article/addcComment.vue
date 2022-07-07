<template>
  <van-field
    class="add-field"
    ref="field"
    center
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
  >
    <template #extra>
      <van-button :disabled="message.length === 0" @click="sendComment"
        >发布</van-button
      >
    </template></van-field
  >
</template>

<script>
import { addComments } from '@/api/commit'
export default {
  props: {
    target: {
      type: [Number, String],
      required: true
    },
    art_id: {
      type: [Number, String]
    }
  },
  created () { },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async sendComment () {
      try {
        const res = await addComments({ target: this.target, content: this.message, art_id: this.art_id })
        console.log(res)
        this.$emit('add-comment', res.data.data.new_obj)
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    this.$refs.field.$el.querySelector('textarea').focus()
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.add-field {
  .van-button {
    border: none;
  }
}
</style>
