<template>
  <div class="homeMain">
    <van-nav-bar title="标题" fixed>
      <template #title>
        <van-button
          type="info"
          icon="search"
          round
          class="search-btn"
          @click="$router.push('/search')"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 频道 -->
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in ChannelList" :key="item.id">
        <!-- 内容 -->
        <ArtList :id="item.id"></ArtList>
      </van-tab>
      <template #nav-right>
        <div class="setMenu1"></div>
        <div class="setMenu" @click="Pannel">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isChannelShow"
      position="bottom"
      :style="{ height: '95%', paddingTop: '1rem' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelPannel
        :channelPannelList="ChannelList"
        :active="active"
        @changeActive="isChangeActive($event)"
        @del="active = $event"
      ></ChannelPannel>
    </van-popup>
  </div>
</template>

<script>
import ChannelPannel from './ChannelPannel.vue'
import { getChannel } from '@/api/home'
import { getItem } from '@/utils/stroge'
const CHANNEL = 'channel'
export default {
  name: 'Home',
  created () {
    this.getMyChanls()
  },
  data () {
    return {
      active: 0,
      ChannelList: [],
      isChannelShow: false
    }
  },
  methods: {
    async getMyChanls () {
      const channel = getItem(CHANNEL)
      // 如何没有登录且本地有操作历史，就从本地拿到数据
      if (!(this.$store.state.user && this.$store.state.user.token) && channel) {
        this.ChannelList = channel
      } else {
        // 本地登录过，从端口那数据
        // 本地没登录且没有操作过，也从端口拿数据，单两个端口数据不一样，一个是更新过的，一个是未更新的
        try {
          const res = await getChannel()
          this.ChannelList = res.data.data.channels
          console.log(this.ChannelList)
        } catch (err) {
          console.log(err)
        }
      }
    },
    Pannel () {
      this.isChannelShow = true
    },
    isChangeActive (index) {
      this.active = index
      this.isChannelShow = false
    }
  },
  computed: {},
  watch: {

  },
  filters: {},
  components: {
    ChannelPannel
  }
}
</script>

<style scoped lang="less">
.search-btn {
  width: 555px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
}
/deep/.van-nav-bar__title {
  max-width: unset;
}
/deep/ .van-tab {
  // padding: 0 39px;
  width: 192px;
  border-right: 1px solid #edeff3;
}
/deep/.van-tab--active {
  font-weight: 600;
}
/deep/ .van-tabs__line {
  width: 31px;
  background-color: #3296fa;
}
.setMenu {
  //flex布局会让width设置无效，所以需要使用min-width
  min-width: 66px;
  height: 82px;
  position: fixed;
  background-color: rgba(255, 255, 255, 0.9);
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.setMenu1 {
  min-width: 66px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
}
.toutiao-gengduo {
  font-size: 33px;
}
/deep/.van-tab__text {
  font-size: 28px !important;
}
/deep/.van-tabs__wrap {
  width: 100%;
  position: fixed;
  top: 92px;
  z-index: 1;
  border-bottom: 1px solid #edeff3;
}
.homeMain {
  padding-top: 180px;
}
</style>
