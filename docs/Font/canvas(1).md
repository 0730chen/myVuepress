---
title: canvas基本API学习
data: 2020-08-26
categories:
- DOM
tags: 
- canvas
- Font
---

#### 在移动端如何将一个页面生成图片并保存

* 使用现在的npm插件html2canvas [文档](http://html2canvas.hertzen.com/)

```shell script
npm install html2canvas --save
```

* 在普通页面中使用,需要用到DOM提供的API获取dom元素生成图片

```html
<div id="capture" style="padding: 10px; background: #f5da55">
    <h4 style="color: #000; ">Hello world!</h4>
</div>

```

```javascript

html2canvas(document.querySelector("#capture")).then(canvas => {
    document.body.appendChild(canvas)
});

```

* 在Vue中使用

```html
<div id="app" ref="body"></div>
```

```javascript
   createPicture(){
      let dom = this.$refs['body']
      html2canvas(dom,{ useCORS:true}).then((canvas)=> {
        let url = canvas.toDataURL(canvas)
        // document.body.remove(dom
        this.src = url
        console.log(url);
      });
    }
```

html2canvas()，接受一个dom元素，第二个参数是代表是否跨域，它是一个Promise对象，所以可以使用.then()获取处理后的图片信息

#### canvas介绍

canvas是一块画布，开发者可以使用js在画布上制作动画，图片等效果
使用 canvas元素不是非常难，但你需要一些基本的HTML和JavaScript知识。除一些过时的浏览器不支持canvas 元素外，所有的新版本主流浏览器都支持它。Canvas 的默认大小为300像素×150像素（宽×高，像素的单位是px）。但是，可以使用HTML的高度和宽度属性来自定义Canvas 的尺寸。为了在 Canvas 上绘制图形，我们使用一个JavaScript上下文对象，它能动态创建图像（ creates graphics on the fly)来自MDN的介绍

##### 基本用法

* 首先你的页面中需要有一个canvas元素
* canvas的宽高在css设置是无法使用的，在你创建canvas元素的时候就指定宽高

```html
<canvas id="canvas" width="100%" height="100%"><canvas>
```
