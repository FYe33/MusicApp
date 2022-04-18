import { createRouter, createWebHashHistory } from 'vue-router'
import Recommend from '@/views/Recommend'
import Singer from '@/views/Singer'
import TopList from '@/views/TopList'
import Search from '@/views/Search'
import SingerDetail from '@/views/SingerDetail'

const routes = [
  {
    path: '/',
    redirect: '/Recommend'
  },
  {
    path: '/Recommend',
    component: Recommend
  },
  {
    path: '/Singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/TopList',
    component: TopList
  },
  {
    path: '/Search',
    component: Search
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
