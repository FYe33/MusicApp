import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'

export default function useCD () {
  const cdRef = ref(null)
  const cdImageRef = ref(null)

  const store = useStore()
  const playing = computed(() => store.state.playing)

  const cdCls = computed(() => {
    return playing.value ? 'playing' : ''
  })

  watch(playing, newPlaying => {
    if (!newPlaying) {
      syncTransform(cdRef.value, cdImageRef.value)
    }
  })

  function syncTransform (wrapper, inner) {
    /*
      getComputedStyle 返回一个对象，
      该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有CSS属性的值。
    */

    // 通过动态获取内层图片旋转角度后同步外层wrapper的旋转角度
    /*
      内层image旋转角度由于是相对于外层wrapper的旋转角度，
      所以在外层旋转角度不为0时，同步外层wrapper旋转角度时需要叠加两者的旋转角度来达到内外层旋转角度同步
    */
    const wrapperTransform = getComputedStyle(wrapper).transform
    const innerTransform = getComputedStyle(inner).transform
    wrapper.style.transform = wrapperTransform === 'none'
      ? innerTransform
      : innerTransform.concat(' ', wrapperTransform)
  }

  return {
    cdCls,
    cdRef,
    cdImageRef
  }
}
