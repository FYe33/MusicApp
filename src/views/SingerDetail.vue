<template>
  <div class="singer-detail">
    <MusicList
      :songs="songs"
      :title="title"
      :pic="pic"
      :loading="loading"
    ></MusicList>
  </div>
</template>

<script>
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'
import MusicList from '@/components/music-list/music-list'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'
export default {
  name: 'SingerDetail',
  components: {
    MusicList
  },
  props: {
    singer: Object
  },
  data () {
    return {
      songs: [],
      loading: true
    }
  },
  computed: {
    computedSinger () {
      let ret = null
      const singer = this.singer
      if (singer) {
        ret = singer
      } else {
        const cachedSinger = storage.session.get(SINGER_KEY)
        if (cachedSinger && cachedSinger.mid === this.$route.params.id) {
          // 若缓存id和当前路由id相同说明是当前页刷新
          ret = cachedSinger
        }
      }
      return ret
    },
    pic () {
      const singer = this.computedSinger
      return singer && singer.pic
    },
    title () {
      const singer = this.computedSinger
      return singer && singer.name
    }
  },
  async created () {
    const data = this.computedSinger
    if (!data) {
      const path = this.$route.matched[0].path
      // 当不是由父级路由进入此页面，且当当前路由mid和缓存数据mid不同时则返回一级路由
      this.$router.push({
        path
      })
      return
    }
    const result = await getSingerDetail(data)
    this.songs = await processSongs(result.songs)
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
  .singer-detail {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
  }
</style>
