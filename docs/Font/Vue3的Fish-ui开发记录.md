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
* 使用const  {value} = context.attrs 进行解析赋值获取
* 组件的样式不能使用scoped属性，否则会有css样式不方便覆盖的问题

#### attrs和props的区别

* props需要先声明才能使用，attrs不用先声明
* props不包含事件，attrs包含事件
* props没有声明的属性会跑到attrs中
* props支持string以外的类型，attrs只支持string类型

#### 动态挂载组件

引用组件dialog.vue，主要是dialog的节点及样式内容


* 如何动态挂载一个组件,h函数可以进行虚拟Dom的创建，动态创建div，使用div去挂载组件

```javascript
import Dialog from "./Dialog.vue";
import { createApp, h } from "vue";
export const openDialog = (options) => {
    const { title, content, ok, cancel } = options;
    const div = document.createElement("div");
    document.body.appendChild(div);
    const close = () => {
        app.unmount(div);
        div.remove();
    };
    const app = createApp({
        render() {
            return h(
                Dialog,
                {
                    visible: true,
                    "onUpdate:visible": (newVisible) => {
                        if (newVisible === false) {
                            close();
                        }
                    },
                    ok, cancel
                },
                {
                    title,
                    content,
                }
            );
        },
    });
    app.mount(div);
};
```