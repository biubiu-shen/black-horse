<template>
  <div>
    <van-nav-bar title="登录">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 正则插件anyrule 可以按住f1然后输入想要的正则即可 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        type="number"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '手机号错误' },
        ]"
      >
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model.trim="code"
        type="number"
        name="code"
        placeholder="请输入验证码"
        maxlength="6"
        :rules="[
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码错误' },
        ]"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"> </i>
        </template>
        <template #button>
          <van-count-down
            class="countDown"
            :time="3 * 1000"
            v-if="show"
            format="ss s"
            @finish="show = false"
          />
          <van-button
            size="small"
            class="yzm"
            round
            native-type="button"
            v-else
            @click="CodeSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- {{$store.state.user}} -->
  </div>
</template>

<script>
import { SendCode, LoginApi } from '@/api/login'
export default {
  created () { },
  data () {
    return {
      mobile: '',
      code: '',
      show: false
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await LoginApi(values)
        // console.log(res)
        // 将身份标识交给vuex存储，其他组件也可以使用这个身份标识
        this.$store.commit('getUserToken', res.data.data)
        this.$toast.success('登录成功')
      } catch (err) {
        this.$toast.fail('登录失败')
        // console.log(err)
      }
    },
    async CodeSms () {
      try {
        // validate会触发表单的某一项rules进行验证，具体项用name决定
        // 如果await这句话错误，不会执行try里面的语句，会直接进入catch中
        await this.$refs.form.validate('mobile')
        this.show = true
        try {
          await SendCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('发送失败')
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('手机号格式不对')
      }
      // this.show = true
    },
    finished () {
      this.show = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
}
.yzm {
  position: fixed;
  right: 26px;
  width: 152px;
  height: 46px;
  background-color: #ededed;
  color: #666;
  .van-button__text {
    // font-size: 22px;
    zoom: 0.96 //缩小放大的功能
;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  color: #fff;
  font-size: 30px;
}
// 输入框高度没写死，倒计时和验证码切换会导致屏幕抖动
//需要让他们脱离文档流
.countDown {
  position: fixed;
  right: 30px;
}
</style>
