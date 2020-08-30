---
title: Vue版本
date: 2019-10-10
tags: 
  -Vue
---

#### Vue 两个版本

![微信图片_20200107172041.png](https://i.loli.net/2020/01/07/c6w91BWR7fATp52.png)

- 完整版：同时包含编译器和运行时的版本
- 运行时：用来创建 Vue 实例，渲染并处理虚拟 Dom,基本除去编译器就是运行时版本

#### 两个版本之间的对比

1. new Vue 的参数不同
   如果你需要在客户端编译模板 (比如传入一个字符串给 template 选项，或挂载到一个元素上并以其 DOM 内部的 HTML 作为模板)，就将需要加上编译器，即完整版：

```javascript
//需要编译器
new Vue({
  template: "<div>{{hi}}</div>",
});
//不需要编译器，但是需要render函数
new Vue({
  render(h) {
    return h("div", this.hi);
  },
});
```

当使用 vue-loader 或 vueify 的时候，\*.vue 文件内部的模板会在构建时预编译成 JavaScript。你在最终打好的包里实际上是不需要编译器的，所以只用运行时版本即可。

- 因为运行时版本相比完整版体积要小大约 30%，所以应该尽可能使用这个版本。如果你仍然希望使用完整版，则需要在打包工具里配置一个别名
  在 webpack 中使用完整版

```javascript
module.exports = {
  // ...
  resolve: {
    alias: {
      vue$: "vue/dist/vue.common.js", //此时就是使用完整版
    },
  },
};
```

或者通过使用 CDN 链接

```javascript
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```
