<template>
  <div class="Search">
    <div class="search-input-wrapper">
      <SearchInput v-model="query"></SearchInput>
    </div>
    <div class="search-content" v-show="!query">
      <div class="hot-keys">
        <h1 class="title">热门搜素</h1>
        <ul>
          <li
            class="item"
            v-for="item in hotKeys"
            :key="item.id"
            @click="addQuery(item.key)"
          >
            <span>{{item.key}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <Suggest :query="query"></Suggest>
    </div>
  </div>
</template>

<script>
import SearchInput from '@/components/search/serach-input'
import Suggest from '@/components/search/suggest'
import { ref } from 'vue'
import { getHotKeys } from '@/service/search'

export default {
  name: 'Search',
  components: {
    SearchInput,
    Suggest
  },
  setup () {
    const query = ref('')
    const hotKeys = ref([])

    getHotKeys().then(result => {
      hotKeys.value = result.hotKeys
    })

    function addQuery (s) {
      query.value = s
    }

    return {
      query,
      hotKeys,
      addQuery
    }
  }
}
</script>

<style lang="scss" scoped>
  .Search {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    display: flex;
    flex-direction: column;
    .search-input-wrapper {
      margin: 20px;
    }
    .search-content {
      flex: 1;
      overflow: hidden;
      .hot-keys {
        margin: 0 20px 20px 20px;
        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
        }
        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }
      .search-history {
        position: relative;
        margin: 0 20px;
        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          color: $color-text-l;
          .text {
            flex: 1;
          }
          .clear {
            @include extend-click();
            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
    }
    .search-result {
      flex: 1;
      overflow: hidden;
    }
  }
</style>
