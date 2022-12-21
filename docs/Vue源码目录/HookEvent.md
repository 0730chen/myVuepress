---
title: Vue源码中的Hook Event
date: 2022-10-19
---

#### 钩子函数

* Vue 提供了一些生命周期钩子函数，供开发者在特定的逻辑点添加额外的处理逻辑，比如：在组件挂载阶段提供了 beforeMount 和 mounted 两个生命周期钩子，供开发者在组件挂载阶段执行额外的逻辑处理，比如为组件准备渲染所需的数据。

* Hook Event 是 Vue 的自定义事件结合生命周期钩子实现的一种从组件外部为组件注入额外生命周期方法的功能

```html
<template>
  <div class="wrapper">
    <comp @hook:mounted="hookMounted" />
  </div>
</template>

<script>
// 这就是上面的那个第三方业务组件
import Comp from '@/components/Comp.vue'

export default {
  components: {
    Comp
  },
  methods: {
    hookMounted() {
      console.log('loading ...')
    }
  }
}
</script>

```

#### 自定义生命周期钩子实现原理


```javascript
export function callHook (vm: Component, hook: string) {
  // 在执行生命周期钩子函数期间禁止依赖收集
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget()
  // 从实例配置对象中获取指定钩子函数，比如 mounted
  const handlers = vm.$options[hook]
  // mounted hook
  const info = `${hook} hook`
  if (handlers) {
    // 通过 invokeWithErrorHandler 执行生命周期钩子
    for (let i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info)
    }
  }
  // Hook Event，如果设置了 Hook Event，比如 <comp @hook:mounted="method" />，则通过 $emit 触发该事件
  // vm._hasHookEvent 标识组件是否有 hook event，这是在 vm.$on 中处理组件自定义事件时设置的
  if (vm._hasHookEvent) {
    // vm.$emit('hook:mounted')
    vm.$emit('hook:' + hook)
  }
  // 关闭依赖收集
  popTarget()
}
```

#### 什么是Hook Event

* 通过@hook自定义生命周期函数，然后vue中有检测相关的注册函数，如果存在则通过$emit去触发该函数，使用$on去监听该函数
* 在组件生命周期方法被触发的时候，内部会通过 callHook 方法来执行这些生命周期函数，在生命周期函数执行之后，如果发现 vm._hasHookEvent 为 true，则表示当前组件有 Hook Event，通过 vm.$emit('hook:xx') 触发 Hook Event 的执行


