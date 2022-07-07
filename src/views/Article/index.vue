<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="黑马头条">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <template v-else>
        <!-- 加载完成-文章详情 -->
        <div class="article-detail" v-if="!!list.art_id">
          <!-- 文章标题 -->
          <h1 class="article-title">{{ list.title }}</h1>
          <!-- /文章标题 -->

          <!-- 用户信息 -->
          <van-cell class="user-info" center :border="false">
            <van-image
              class="avatar"
              slot="icon"
              round
              fit="cover"
              :src="list.aut_photo"
            />
            <div slot="title" class="user-name">{{ list.aut_name }}</div>
            <div slot="label" class="publish-date">
              {{ list.pubdate | dateFormat }}
            </div>
            <FollowUser
              v-model="list.is_followed"
              :target="list.aut_id"
            ></FollowUser>
          </van-cell>
          <!-- /用户信息 -->

          <!-- 文章内容 -->
          <!-- 报错404 -->
          <div
            class="article-content markdown-body"
            v-html="list.content"
          ></div>
          <van-divider>正文结束</van-divider>
          <ArticleComment
            :source="list.art_id"
            type="a"
            @setCount="count = $event"
            :commitsList="commitsList"
            @replay-show="
              commit = $event;
              isReplayShow = true;
            "
          />
        </div>
        <!-- /加载完成-文章详情 -->

        <!-- 加载失败：404 -->
        <div class="error-wrap" v-else-if="is404">
          <van-icon name="failure" />
          <p class="text">该资源不存在或已删除！</p>
        </div>
        <!-- /加载失败：404 -->

        <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
        <div class="error-wrap" v-else>
          <van-icon name="failure" />
          <p class="text">内容加载失败！</p>
          <van-button class="retry-btn">点击重试</van-button>
        </div>
        <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
      </template>
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom" v-if="!isLoading && !!list.art_id">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="writeCom"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="count" color="#777" />
      <Collect
        :is_collect.sync="list.is_collected"
        :target="list.art_id"
      ></Collect>
      <van-icon color="#777" name="good-job-o" />
      <van-icon
        name="share"
        color="#777777"
        @click="showShare = true"
      ></van-icon>
    </div>
    <!-- /底部区域 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
    <van-popup v-model="bottomshow" position="bottom">
      <AddComment
        v-if="bottomshow"
        :target="article_id"
        @add-comment="
          commitsList.unshift($event);
          bottomshow = false;
        "
      ></AddComment>
    </van-popup>
    <van-popup v-model="isReplayShow" position="bottom" style="height: 100%">
      <!-- pop内部使用的是v-show，导致钩子函数只执行依次，拿到的评论也只有第一次执行的评论 -->
      <ReplayCom @isReplay="isReplayShow = $event" :commit="commit" v-if="isReplayShow"></ReplayCom>
    </van-popup>
  </div>
</template>

<script>
import 'github-markdown-css'
import { ImagePreview } from 'vant'
import { getArticles } from '@/api/search'
import FollowUser from '@/components/FollowUser.vue'
import Collect from '@/components/Collcet.vue'
import ArticleComment from '@/components/ArticleComment.vue'
import AddComment from './addcComment.vue'
import ReplayCom from './Replaysss.vue'

export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    Collect,
    ArticleComment,
    AddComment,
    ReplayCom
  },
  props: {
    article_id: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      isReplayShow: false,
      bottomshow: false,
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ],
      isLoading: true,
      list: {},
      is404: false,
      count: null,
      commitsList: [],
      commit: []

    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticle()
  },
  mounted () { },
  methods: {
    async getArticle () {
      try {
        const res = await getArticles(this.article_id)
        this.list = res.data.data
        console.log(this.list)
      } catch (err) {
        if (err.response?.status === 404) {
          this.is404 = true
        }
      }
      this.isLoading = false
      // 获取文章内所有图片，但由于更新是异步的 所以需要写在nexttick中
      // 点击图片可以放大观看，左右滑动的效果
      this.$nextTick(() => {
        const arr = document.querySelectorAll('.article-content img')
        if (arr.length === 0) return
        const arr1 = []
        arr.forEach((img, index) => {
          arr1.push(img.src)
          img.onclick = function () {
            ImagePreview({
              images: arr1,
              startPosition: index
            })
          }
        })
      })
    },
    writeCom () {
      this.bottomshow = true
    }

  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      // font-size: 18px;
      // /deep/ p {
      //   text-align: justify;
      // }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
