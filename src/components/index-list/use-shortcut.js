import { computed, ref } from 'vue'

export default function useShortcut (props, groupRef) {
  const ANCHOR_HEIGHT = 18
  // 拿到scroll组件的实例
  const scrollRef = ref(null)

  const shortcutList = computed(() => {
    return props.data.map(group => {
      return group.title
    })
  })

  const touch = {}

  function onShortcutTouchStart (e) {
    // 获取事件目标，通过 dataset 方式拿到事件目标对应的 index
    const anchorIndex = parseInt(e.target.dataset.index)
    // 获取点击时的坐标值
    touch.y1 = e.touches[0].pageY

    touch.anchorIndex = anchorIndex

    scrollTo(anchorIndex)
  }

  function onShortcutTouchMove (e) {
    // 实时获取手指在屏幕上的坐标值
    touch.y2 = e.touches[0].pageY
    // 求得手指现在位置与开始位置的差并除以元素高度(向下取整)
    const delta = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0
    // 算出现在处于的标题下标
    const anchorIndex = touch.anchorIndex + delta

    scrollTo(anchorIndex)
  }

  function scrollTo (index) {
    if (isNaN(index)) { return }
    // 设置下标范围，防止越界
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index))

    // 通过 ul 的实例拿到里面的 li 实例
    const targetEl = groupRef.value.children[index]

    // 通过 scroll 组件实例拿到里面的 BetterScroll 插件的实例
    const scroll = scrollRef.value.scroll

    scroll.scrollToElement(targetEl, 0)
  }

  return {
    shortcutList,
    scrollRef,
    onShortcutTouchStart,
    onShortcutTouchMove
  }
}
