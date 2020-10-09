---
title: Vue3.0体验
date: 2020-10-08
categories:
- Vue3
---

#### Vue3.0的改变

Vue3.0中不在使用data,储存数据,使用类似与React Hooks的形式搭建组件

#### setup和ref

* setup
* ref
* createApp
* nextTick
* is和v-is

```javascript

import { createApp } from 'vue'

const app = createApp({})


//挂载一个应用实例
import MyApp from './MyApp.vue'
const app = createApp(MyApp)
app.mount('#app')

//获取最新的DOM
import { nextTick } from 'vue'

nextTick(() => {
  // something DOM-related
})
```

#### 异步组件

```javascript
//2中使用import引入组件
const asyncPage = () => import('./NextPage.vue')

const asyncPage = {
  component: () => import('./NextPage.vue'),
  delay: 200,
  timeout: 3000,
  error: ErrorComponent,
  loading: LoadingComponent
}

//3中使用定义API

import { defineAsyncComponent } from 'vue'
import ErrorComponent from './components/ErrorComponent.vue'
import LoadingComponent from './components/LoadingComponent.vue'

// Async component without options
const asyncPage = defineAsyncComponent(() => import('./NextPage.vue'))

// Async component with options
const asyncPageWithOptions = defineAsyncComponent({
  loader: () => import('./NextPage.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})

// 2.x version
const oldAsyncComponent = (resolve, reject) => {
  /* ... */
}

// 3.x version
const asyncComponent = defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      /* ... */
    })
)

```

#### 自定义指令语法

```javascript

// <p v-highlight="yellow">Highlight this text bright yellow</p>
Vue.directive('highlight', {
  bind(el, binding, vnode) {
    el.style.background = binding.value
  }
})

const MyDirective = {
  beforeMount(el, binding, vnode, prevVnode) {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {}, // new
  unmounted() {}
}
```


#### 事件接口api被删除

```javascript
const eventHub = new Vue()

export default eventHub

import eventHub from './eventHub'

export default {
  mounted() {
    // adding eventHub listener
    eventHub.$on('custom-event', () => {
      console.log('Custom event triggered!')
    })
  },
  beforeDestroy() {
    // removing eventHub listener
    eventHub.$off('custom-event')
  }
}
```

#### filter已经被删除

```javascript
<template>
  <h1>Bank Account Balance</h1>
  <p>{{ accountBalance | currencyUSD }}</p>
</template>

<script>
  export default {
    props: {
      accountBalance: {
        type: Number,
        required: true
      }
    },
    filters: {
      currencyUSD(value) {
        return '$' + value
      }
    }
  }
</script>

```