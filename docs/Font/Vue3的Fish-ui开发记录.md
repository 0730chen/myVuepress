---
title: Vue3的Fish-ui开发记录
date: 2020-11-22
tags:
- vue3
- UI组件
---

#### Vue3.0中的双向数据绑定

使用v-model:value 代替了:value @update:value="e===$event"

使用v-model:value语法给value设置双向数据绑定,@update:value="e===$event"

```vue
<template>
<div v-model="xxxx" ><div>
</template>
```

```javascript

this.$emit('update:xxx',{x})
```

* 可以有多个根标签

* 使用函数 computed(), watchEffect()

* context.emit ===> this.emit()

#### 如何去设计一个组件

* 需求分析，有关于组件的外观，配色（你要做一个什么样的组件）

* 组件的功能，接受值和改变值（一般是使用props进行传递和状态更新）

* 写代码 html-css-js-测试-html-css-js-测试。一直改动

#### $event

$event是emit()方法的第二个参数

#### Button组件

* 使用inheritAttrs:false,禁止div内部属性继承
* 使用$attrs或者context.attrs获取全部的属性
* 使用v-bind:attrs批量将属性绑定
