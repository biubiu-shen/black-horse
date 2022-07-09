
<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link @click="imgChange">
      <van-image
        class="avatar"
        fit="cover"
        round
        width=".8rem"
        height=".8rem"
        :src="userInfo.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="userInfo.name"
      is-link
      @click="nickNameShow = true"
    />
    <van-cell
      title="性别"
      :value="userInfo.gender === 1 ? '男' : '女'"
      is-link
    />
    <van-cell
      title="生日"
      :value="userInfo.birthday"
      is-link
      @click="isBrith = true"
    />
    <van-popup position="bottom" style="height: 100%" v-model="nickNameShow">
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        class="navNick"
        @click-left="onCancel"
        @click-right="onComfirm"
      ></van-nav-bar>
      <van-field
        :value="userInfo.name"
        rows="2"
        autosize
        @input="name = $event"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-popup>
    <van-popup position="bottom" v-model="isBrith">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="saveB"
      />
    </van-popup>
    <input
      type="file"
      style="display: none"
      accept="image/png,image/jpg,image/jpeg"
      ref="imgAva"
      @change="onChange"
    />
    <van-popup v-model="isAvaShow" style="height: 100%" position="bottom">
      <UpdateAvatar
        :imgSrc="imgSrc"
        @isAva="
          isAvaShow = false;
          userInfo.photo = $event;
        "
      ></UpdateAvatar>
    </van-popup>
  </div>
</template>
<script>
import { getUserProfile, patchProfile } from '@/api/login'
import UpdateAvatar from './components/UpdateAvatar.vue'
export default {
  created () {
    this.getUserProfile()
  },
  data () {
    return {
      userInfo: {},
      nickNameShow: false,
      isBrith: false,
      name: '',
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(2025, 10, 1),
      birth: '',
      isAvaShow: false,
      imgSrc: ''
      // currentDate: new Date(2021, 0, 17)
      // profile: {}
    }
  },
  methods: {
    async getUserProfile () {
      try {
        const res = await getUserProfile()
        this.userInfo = res.data.data
        console.log(this.userInfo)
      } catch (err) {
        console.log(err)
      }
    },
    onCancel () {
      this.nickNameShow = false
    },
    onComfirm () {
      this.userInfo.name = this.name
      this.save()
      this.nickNameShow = false
    },
    async save () {
      try {
        const res = await patchProfile(this.userInfo)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    saveB () {
      this.userInfo.birthday = this.birth
      this.save()
      this.isBrith = false
      console.log(11)
    },
    imgChange () {
      this.$refs.imgAva.click()
    },
    onChange () {
      // 将上传的图片建立起一个临时路径
      const url = window.URL.createObjectURL(this.$refs.imgAva.files[0])
      console.log(url)
      this.imgSrc = url
      this.isAvaShow = true
    }
  },
  computed: {
    currentDate: {
      get () {
        return new Date(this.userInfo.birthday)
      },
      set (newval) {
        this.birth = newval.getFullYear() + '-' + (newval.getMonth() + 1) + '-' + newval.getDate()
      }
    }
  },
  watch: {},
  filters: {},
  components: {
    UpdateAvatar
  }
}
</script>

<style scoped lang="less">
/deep/ .navNick {
  background-color: #fff;
  .van-nav-bar__title {
    color: #000;
  }
}
</style>
