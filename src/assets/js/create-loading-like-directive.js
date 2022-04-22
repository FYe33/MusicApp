import { createApp } from 'vue'
import { addClass, removeClass } from '@/assets/js/dom'

const relativeCls = 'g-relative'

export default function createLoadingLikeDirective (Comp) {
  return {
    // el: 组件挂载的 dom 对象
    mounted (el, binding) {
      // 创建一个组件实例
      const app = createApp(Comp)

      // 将组件实例添加到动态创建的 div 元素中
      const instance = app.mount(document.createElement('div'))

      // 防止其他instanc覆盖之前保存的instance
      const name = Comp.name
      if (!el[name]) {
        el[name] = {}
      }
      // 在 el 对象上保留 这个 dom 对象
      el[name].instance = instance

      // 设置组件的 title
      const title = binding.arg
      if (typeof title !== 'undefined') { instance.setTitle(title) }

      if (binding.value) {
        append(el)
      }
    },

    // 当是否绑定的判断改变时
    updated (el, binding) {
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    }
  }

  function append (el) {
    const name = Comp.name
    // 如果挂载对象没有以下样式，则设置临时样式
    const style = getComputedStyle(el)
    if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) { addClass(el, relativeCls) }
    // 将组件的 dom 对象添加到 el 对象上
    el.appendChild(el[name].instance.$el)
  }

  function remove (el) {
    const name = Comp.name
    // 移除临时的 ClassName
    removeClass(el, relativeCls)

    // 将组件的 dom 对象从 el 上移除
    el.removeChild(el[name].instance.$el)
  }
}
