import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: 'video',
        component: () => import('@/views/Video')

      },
      {
        path: 'question',
        component: () => import('@/views/Question')

      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/MyInfo')

      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/article/:article_id',
    name: 'article',
    component: () => import('@/views/Article'),
    props: true// params相关的路由加上这个可以 让路由和组件解耦
  }, {
    path: '/userinfo',
    component: () => import('@/views/User/index.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
