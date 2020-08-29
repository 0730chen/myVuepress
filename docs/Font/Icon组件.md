---
title: 封装Icon组件
date: 2020-12-24
tags:
  - 组件
categories:
  - 自定义组件
---

### 使用 webpack 插件封装 Icon 组件

在使用阿里 Iconfont 图标封装 icon 组件

1.下载 svg-sprite-loader

```shell script
npm install svg-sprite-loader --save-dev
```

2.配置 vue.config.js 配置 webpack

```javascript
module.exports = {
  chainWebpack: (config) => {
    const dir = path.resolve(__dirname, "src/assets/icons"); //引入下载全部的icon文件
    config.module
      .rule("svg-sprite")
      .test(/\.(svg)(\?.*)?$/)
      .include.add(dir)
      .end()
      .use("svg-sprite-loader-mod")
      .loader("svg-sprite-loader-mod")
      .options({ extract: false })
      .end()
      .use("svgo-loader")
      .loader("svgo-loader")
      .tap((options) => ({
        ...options,
        plugins: [{ removeAttrs: { attrs: "fill" } }],
      }))
      .end();
    config
      .plugin("svg-sprite")
      .use(require("svg-sprite-loader-mod/plugin"), [{ plainSprite: true }]);
    config.module.rule("svg").exclude.add(dir);
  },
};
```

3.引入通用代码

```css
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
```

4.封装 Icon.vue 组件

```vue
<template>
  <div @click="$emit('click', $event)">
    <svg class="icon">
      <use :xlink:href="'#' + IconName"></use>
    </svg>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
//这里是引入Icon文件中的全部svg文件
const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context("../assets/icons", true, /\.svg$/));
} catch (error) {
  console.log(error);
}

@Component
export default class Icons extends Vue {
  @Prop() IconName: string | undefined;
  name: "Icons" | undefined;
}
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
```

5.使用

```vue
<Icon IconName="name"></Icon>
<script>
//name就是icon文件的名字，使用prpos传入name参数
</script>
```
