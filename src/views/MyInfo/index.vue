<template>
  <div>
    <div class="header login" v-if="$store.state.user.token">
      <div class="top">
        <div class="avater">
          <img :src="list.photo" alt="" />
          <p>{{list.name}}</p>
        </div>
        <button>编辑资料</button>
      </div>
      <ul class="list">
        <li>
          <span>{{list.art_count}}</span>
          <p>头条</p>
        </li>
        <li>
          <span>{{list.fans_count}}</span>
          <p>粉丝</p>
        </li>
        <li>
          <span>{{list.follow_count}}</span>
          <p>关注</p>
        </li>
        <li>
          <span>{{list.like_count}}</span>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <div class="header nologin" v-else>
      <img src="@/assets/mobile.png" alt="" @click="loginInTo" />
      <p @click="loginInTo">登录 &nbsp;/&nbsp; 注册</p>
    </div>
    <van-grid :column-num="2">
      <van-grid-item text="收藏">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="历史">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <van-button
      type="default"
      block
      class="logout"
      v-if="user && user.token"
      @click="removeToken"
      >立即退出</van-button
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/login'
export default {
  created () {
    this.getUser()
  },
  data () {
    return {
      list: {}
    }
  },
  methods: {
    async removeToken () {
      // window.localStorage.removeItem('vuex')直接改变vuex中的值可以达到刷新当前页面的效果，原生的话不行
      try {
        // 这里加await是如果不加，在提示框跳出的时候，已经清空了user直接执行了下面的代码
        await this.$dialog.confirm({ message: '确定退出登录吗？' })
        this.$store.commit('getUserToken', {})
      } catch (err) {
        console.log(err)
      }
    },
    loginInTo () {
      this.$router.push('/login')
    },
    async getUser () {
      if (this.user && this.user.token) {
        try {
          const res = await getUserInfo()
          this.list = res.data.data
          console.log(this.list)
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.header {
  width: 750px;
  height: 401px;
  // opacity: 0.8;会影响子元素
  background: rgba(50, 150, 250, 0.8) url("@/assets/banner.png") no-repeat;
  background-size: contain;
}
.login {
  padding-top: 116px;
  .top {
    padding: 0 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 55px;
    .avater {
      display: flex;
      align-items: center;
      img {
        width: 132px;
        height: 132px;
        border-radius: 50%;
      }
      p {
        padding-left: 22px;
        font-size: 20px;
        color: #fff;
      }
    }
    button {
      color: #666;
      text-align: center;
      width: 115px;
      height: 32px;
      border: none;
      border-radius: 16px;
      background-color: #fff;
      font-size: 20px;
      font-weight: 400;
    }
  }
  .list {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      font-size: 36px;
      color: #fff;
      p {
        font-size: 23px;
      }
    }
  }
}
.nologin {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 132px;
    height: 132px;
    border-radius: 50%;
  }
  p {
    font-size: 30px;
    font-weight: 400;
    color: #fff;
  }
}
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
/deep/ .van-grid-item__text {
  font-size: 28px;
}
.van-cell-group {
  margin: 9px 0;
}
.logout {
  color: #d86262;
}
</style>
