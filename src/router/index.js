import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  routes: [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/layout.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        meta: { title: '沪法云普法平台' },
        component: () => import('@/views/home.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: '/home'
  }
]
})

export default router