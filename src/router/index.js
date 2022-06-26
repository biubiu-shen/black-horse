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
        component: () => import('@/views/MyInfo')

      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
