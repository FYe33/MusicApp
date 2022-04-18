import { ref, watch, computed, nextTick } from 'vue'

export default function useFixed (props) {
  const TITLE_HEIGHT = 30
  const groupRef = ref(null)
  const listHeights = ref([])
  // scroll 组件派发的滚动位置
  const scrollY = ref(0)
  // 当前标题的 index
  const currentIndex = ref(0)
  // 当前标题距离下一个标题的高度
  const distance = ref(0)

  // 计算当前位置的标题并返回
  const fixedTitle = computed(() => {
    // 如果滚动区间小于等于0，不返回标题且不渲染吸顶
    if (scrollY.value <= 0) return ''

    const currentGroup = props.data[currentIndex.value]

    return currentGroup ? currentGroup.title : ''
  })

  const fixedStyle = computed(() => {
    const distanceVal = distance.value
    // 如果高度差大于 0 且小于标题高度，则设置偏移量
    const diff = (distanceVal > 0 && distanceVal < TITLE_HEIGHT) ? distanceVal - TITLE_HEIGHT : 0

    return {
      transform: `translateY(${diff}px)`
    }
  })

  // 监测数据变化重新计算各 title 的 clientHeight
  watch(() => props.data, async () => {
    // 数据发生变动后，在回调函数内 dom 依旧无发生变化，等待一个 tick
    await nextTick()
    calculate()
  })

  // 监听变动的滚动位置
  watch(scrollY, (newY) => {
    const listHeightsVal = listHeights.value

    // 判断当前处于哪一个标题区间
    for (let i = 0; i < listHeightsVal.length - 1; i++) {
      // 当前标题
      const heightTop = listHeightsVal[i]
      // 下一个标题
      const heightBottom = listHeightsVal[i + 1]

      // 判断是否处于此区间
      if (newY >= heightTop && newY < heightBottom) {
        currentIndex.value = i

        // 获取当前标题的下一个标题与滚动高度的距离
        distance.value = heightBottom - newY
      }
    }
  })

  function calculate () {
    // 获取歌手列表
    const list = groupRef.value.children
    // 初始化歌手列表标题关于 clientHeight 的数组
    const listHeightsVal = listHeights.value
    let height = 0

    // 第一个标题(热)的高度设置为0
    listHeightsVal.length = 0
    listHeightsVal.push(height)

    for (let i = 0; i < list.length; i++) {
      // 累加从 1 ~ n-1 个的标题的 clientHeight 得到第 n 个标题的 clientHeight
      height += list[i].clientHeight
      listHeightsVal.push(height)
    }
  }

  function onScroll (pos) {
    // 派发的滚动位置为负数，再取负值为正
    scrollY.value = -pos.y
  }

  return {
    groupRef,
    fixedTitle,
    fixedStyle,
    currentIndex,
    onScroll
  }
}
