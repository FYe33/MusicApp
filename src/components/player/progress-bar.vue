<template>
  <div
    class="progress-bar"
    @click="onClick"
  >
    <div class="bar-inner">
      <div
        class="progress"
        ref="progress"
        :style="progressStyle"
      ></div>

      <div
        class="progress-btn-wrapper"
        :style="btnStyle"
        @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend.prevent="onTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
const progressBtnWidth = 16
export default {
  name: 'progress-bar',
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  emits: ['progress-changing', 'progress-changed'],
  data () {
    return {
      offset: 0
    }
  },
  computed: {
    progressStyle () {
      return `width:${this.offset}px`
    },
    btnStyle () {
      return `transform:translate3d(${this.offset}px, 0, 0)`
    }
  },
  watch: {
    progress (newProgress) {
      const barWidth = this.$el.clientWidth - progressBtnWidth
      this.offset = barWidth * newProgress
    }
  },
  created () {
    /*
      在组件实例上绑定一个空对象
      如果只需要一个组件上下文共享对象而不用监测它的变化时(即对象和模板毫无关系)，可以用此方法
      若放在data中变成响应式对象，当对象数据变化时，会触发模板重新渲染，造成性能浪费
    */
    this.touch = {}
  },
  methods: {
    onTouchStart (e) {
      this.touch.x1 = e.touches[0].pageX
      this.touch.beginWidth = this.$refs.progress.clientWidth
    },
    onTouchMove (e) {
      // 偏移量
      const delta = e.touches[0].pageX - this.touch.x1
      // 计算移动后的已播放进度条宽度
      const tempWidth = this.touch.beginWidth + delta
      // 整个歌曲进度条宽度
      const barWidth = this.$el.clientWidth - progressBtnWidth
      // 进度条播放进度
      const progress = Math.max(0, Math.min(1, tempWidth / barWidth))

      this.offset = barWidth * progress

      this.$emit('progress-changing', progress)
    },
    onTouchEnd () {
      const barWidth = this.$el.clientWidth - progressBtnWidth
      const progress = this.$refs.progress.clientWidth / barWidth
      this.$emit('progress-changed', progress)
    },
    onClick (e) {
      // 返回元素的大小及其相对于视口的位置
      const rect = this.$el.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      const barWidth = this.$el.clientWidth - progressBtnWidth
      const progress = Math.max(0, Math.min(1, offsetWidth / barWidth))

      this.$emit('progress-changed', progress)
    }
  }
}
</script>

<style lang="scss" scoped>
  .progress-bar {
    height: 30px;
    .bar-inner {
      position: relative;
      top: 13px;
      height: 4px;
      background: rgba(0, 0, 0, 0.3);
      .progress {
        position: absolute;
        height: 100%;
        background: $color-theme;
      }
      .progress-btn-wrapper {
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;
        .progress-btn {
          position: relative;
          top: 7px;
          left: 7px;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border: 3px solid $color-text;
          border-radius: 50%;
          background: $color-theme;
        }
      }
    }
  }
</style>
