<template>
  <div class="Singer" v-loading="!singers.length">
    <IndexList
      :data="singers"
      @select="selectdSinger"
    >
    </IndexList>
    <router-view :singer="selectedSinger"></router-view>
  </div>
</template>

<script>
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/base/index-list/index-list'
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
      this.$router.push({
        path: `/Singer/${singer.mid}`
      })
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
