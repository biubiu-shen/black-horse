<template>
  <div>
    <img :src="imgSrc" ref="img" />
    <van-button @click="onConfirm">确定</van-button>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { changeAvaImg } from '@/api/login'
let cropper
export default {
  props: {
    imgSrc: {
      type: String,
      required: true
    }
  },
  created () { },
  mounted () {
    const image = this.$refs.img
    cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
    console.log(cropper)
  },
  data () {
    return {
      photo: ''
    }
  },
  methods: {
    onConfirm () {
      cropper.getCroppedCanvas().toBlob(async (file) => {
        console.log(file)
        // formdata 用于传递二进制的代码，多用于图片上传
        const fd = new FormData()
        // photo是接口要求的字段
        fd.append('photo', file)
        try {
          const res = await changeAvaImg(fd)
          this.photo = res.data.data.photo
          console.log(res)
        } catch (err) {
          console.log(err)
        }
      })
      this.$emit('isAva', this.photo)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
