<template>
  <div class="Singer" v-loading="!singers.length">
    <IndexList
      :data="singers"
      @select="selectdSinger"
    >
    </IndexList>

    <!-- 路由过渡动画 -->
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/index-list/index-list'

import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'

export default {
  name: 'singer',
  components: {
    IndexList
  },
  data () {
    return {
      singers: [],
      selectedSinger: null
    }
  },
  async created () {
    const result = await getSingerList()
    this.singers = result.singers
  },
  methods: {
    selectdSinger (singer) {
      this.selectedSinger = singer
      this.cacheSinger(singer)
      this.$router.push({
        path: `/Singer/${singer.mid}`
      })
    },
    cacheSinger (singer) {
      storage.session.set(SINGER_KEY, singer)
    }
  }
}
</script>

<style lang="scss" scoped>
  .Singer {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
</style>
