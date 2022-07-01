<template>
  <div>
    <div class="top">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          plain
          type="danger"
          size="mini"
          round
          @click="isShow = !isShow"
          >{{ isShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row gutter="12">
        <van-col
          span="6"
          v-for="(item, index) in channelPannelList"
          :key="item.id"
        >
          <div
            class="inner"
            :style="{ color: active === index ? 'red' : '' }"
            @click="actPannel(index)"
          >
            {{ item.name }}
            <van-icon
              name="close"
              v-if="index !== 0"
              v-show="isShow"
              @click="removeList(item.id)"
            />
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="top">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row gutter="12">
        <van-col span="6" v-for="item in AllList" :key="item.id">
          <div class="inner van-ellipsis" @click="add(item.id)">
            +{{ item.name }}
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getAllArtList, setChannels } from '@/api/home'
import { setItem } from '@/utils/stroge'

const CHANNEL = 'channel'

export default {
  props: {
    channelPannelList: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getAllList()
  },
  data () {
    return {
      AllList: [],
      isShow: false
    }
  },
  methods: {
    async getAllList () {
      try {
        const res = await getAllArtList()
        // 对数据进行筛选，去除这个数组中含有其他数组的项
        // 使用filter函数。返回满足条件的项，作为新数组的项，在过滤条件中再次之前的数组，去除两个数组的重复项
        // 使用every函数只要有一项和res的数组重复就不满足筛选条件
        this.AllList = res.data.data.channels.filter(item => this.channelPannelList.every(item1 => item1.id !== item.id))
        // console.log(this.AllList)
      } catch (err) {
        console.log(err)
      }
    },
    add (youid) {
      // console.log(youid)
      const index = this.AllList.findIndex(item => item.id === youid)
      // eslint-disable-next-line vue/no-mutating-props
      this.channelPannelList.push(this.AllList[index])
      this.AllList.splice(index, 1)
    },
    removeList (id) {
      // if (this.isShow) {
      const index = this.channelPannelList.findIndex(item => item.id === id)
      // console.log(index)
      this.AllList.unshift(this.channelPannelList[index])
      // eslint-disable-next-line vue/no-mutating-props
      this.channelPannelList.splice(index, 1)
      if (index < this.active) {
        this.$emit('del', this.active - 1)
      }
      // }
    },
    actPannel (index) {
      if (!this.isShow) {
        this.$emit('changeActive', index)
      }
    }
  },
  computed: {},
  watch: {
    channelPannelList: {
      async handler (newval) {
        // console.log('newval', newval)
        if (this.$store.state.user && this.$store.state.user.token) {
          // console.log('ss')
          const arr = []
          newval.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          // console.log(arr)
          try {
            const res = await setChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else {
          setItem(CHANNEL, newval)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.top {
  padding-left: 24px;
  padding-right: 16px;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 48px;
    padding-top: 52px;
    h3 {
      font-size: 32px;
    }
    .van-button {
      width: 104px;
      height: 48px;
      // font-size: 18px;
      border-color: #f85a5a;
      color: #f85a5a;
    }
  }
  .inner {
    text-align: center;
    line-height: 86px;
    width: 160px;
    height: 86px;
    background-color: #f4f5f6;
    border-radius: 6px;
    font-size: 28px;
    font-weight: normal;
    letter-spacing: 1px;
    color: #222222;
    margin-bottom: 29px;
    position: relative;
    .van-icon {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
    }
  }
}
</style>
