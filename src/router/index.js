import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/Recommend'
  },
  {
    path: '/Recommend',
    component: () => import('@/views/Recommend'),
    children: [
      {
        path: ':id',
        component: () => import('@/views/Album')
      }
    ]
  },
  {
    path: '/Singer',
    component: () => import('@/views/Singer'),
    children: [
      {
        path: ':id',
        component: () => import('@/views/SingerDetail')
      }
    ]
  },
  {
    path: '/TopList',
    component: () => import('@/views/TopList'),
    children: [
      {
        path: ':id',
        component: () => import('@/views/TopDetail')
      }
    ]
  },
  {
    path: '/Search',
    component: () => import('@/views/Search')
  },
  {
    path: '/user',
    components: {
      user: () => import('@/views/user-center')
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
