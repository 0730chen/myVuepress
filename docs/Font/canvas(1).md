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
* 使用Canvas2Image将canvas转换成img图片

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
  createPicture(){
      let dom = this.$refs['body']
      let width = dom.offsetWidth
      let height = dom.offsetHeight
      let canvasdom = document.createElement('canvas')
      let  scale = 2
      //先放大
      canvasdom.width = width*scale
      canvasdom.height = width*scale
      //在缩小
      canvasdom.getContext('2d').scale(scale,scale)

      console.log(width,height);
      //html2canvas配置
      let opts={
        scale:1,
        canvas:canvasdom,
        width:width,
        height:height,
        useCORS: true
      }

      html2canvas(dom,opts).then((canvas)=> {
        let context = canvas.getContext('2d');
        // 【重要】关闭抗锯齿
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        let img = Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height);
        let u = navigator.userAgent
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
          //这个是安卓操作系统
          img.src = canvas.toDataURL() ;
        }
        if (isIOS) {
          //这个是ios操作系统
          img.src = canvas.toDataURL() .replace("data:image/png;base64,","");
        }
        img.id = 'oImg';
        img.className = 'o-img';
        console.log(img);
        document.body.appendChild(img)
      });
    }

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

* 获取canvas的上下文

```javascript
let canvas = document.getElementById('canvas')
//创建一个上下文格式
//2d,建立一个二维渲染上下文
//"webgl" (或"experimental-webgl") 这将创建一个 WebGLRenderingContext 三维渲染上下文对象。只在实现WebGL 版本1(OpenGL ES 2.0)的浏览器上可用。
//"webgl2" (或 "experimental-webgl2") 这将创建一个 WebGL2RenderingContext 三维渲染上下文对象。只在实现 WebGL 版本2 (OpenGL ES 3.0)的浏览器上可用。
//"bitmaprenderer" 这将创建一个只提供将canvas内容替换为指定ImageBitmap功能的ImageBitmapRenderingContext  。

let ctx = canvas.getContext('2d')

```

##### 检查支持性

```javascript
var canvas = document.getElementById('tutorial');

if (canvas.getContext){
  var ctx = canvas.getContext('2d');
  // drawing code here
} else {
  // canvas-unsupported code here
}

```

#### 矩形

canvas只支持两种形式的绘制,矩形和路径（由一系列点连成的线段）。

* fileReact(x,y,width,height) 绘制一个填充的矩形
* strokeRect(x,y,widht,height) 绘制一个心矩形
* clearRect(x,y,width,height) 清空指定区域，让清楚部分透明

#### 绘制路径

图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。使用路径绘制图形需要一些额外的步骤

* 首先你需要创建路径的起点

* 然后你要使用画图命令（画图api）画路径

* 然后把路径封闭形成图形

api:

* beginPath(),新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
* closePath(),关闭一条路径，闭合路径之后图形绘制命令又重新指向到上下文中。
* stroke()，用来绘制图形轮廓
* fill() 通过填充路径内容区域形成实心图形
* moveTo(x, y),移动笔触，就是描绘一个路径
例子

* 绘制一个三角形

```javascript
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();
  }
}
```

#### 绘制直线

lineTo(x,y)

```javascript
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
  var ctx = canvas.getContext('2d');

  // 填充三角形
  ctx.beginPath();
  ctx.moveTo(25, 25);
  ctx.lineTo(105, 25);
  ctx.lineTo(25, 105);
  ctx.fill();

  // 描边三角形
  ctx.beginPath();
  ctx.moveTo(125, 125);
  ctx.lineTo(125, 45);
  ctx.lineTo(45, 125);
  ctx.closePath();
  ctx.stroke();
  }
}
```

#### 圆弧

arc(x,y,radius,startAngle,endAngle,anticlockwise)

```javascript

function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 3; j++){
        ctx.beginPath();
        var x = 25 + j * 50; // x 坐标值
        var y = 25 + i * 50; // y 坐标值
        var radius = 20; // 圆弧半径
        var startAngle = 0; // 开始点
        var endAngle = Math.PI + (Math.PI * j) / 2; // 结束点
        var anticlockwise = i % 2 == 0 ? false : true; // 顺时针或逆时针

        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

        if (i>1){
          ctx.fill();
        } else {
          ctx.stroke();
        }
      }
    }
  }
}
```

#### 二次贝塞尔曲线及三次贝塞尔曲线

* quadraticCurveTo(cp1x, cp1y, x, y)
绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。
* bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。

#### 添加颜色

```javascript

// 这些 fillStyle 的值均为 '橙色'
ctx.fillStyle = "orange";
ctx.fillStyle = "#FFA500";
ctx.fillStyle = "rgb(255,165,0)";
ctx.fillStyle = "rgba(255,165,0,1)";
```

#### 绘制图片

绘制来源

* HTMLImageElement，Image()函数构造出来的，或者任何的img元素
* HTMLVideoElement video元素
* HTMLCanvasElement 另一个canvas元素
* ImageBitmap 这是一个高性能的位图，可以低延迟地绘制，它可以从上述的所有源以及其它几种源中生成。

canvas绘制图片

```javascript
  function draw() {
    var ctx = document.getElementById('canvas').getContext('2d');
    var img = new Image();
    img.onload = function(){
      ctx.drawImage(img,0,0);
      ctx.beginPath();
      ctx.moveTo(30,96);
      ctx.lineTo(70,66);
      ctx.lineTo(103,76);
      ctx.lineTo(170,15);
      ctx.stroke();
    }
    img.src = 'images/backdrop.png';
  }
```

#### save和restore

* save 用来保存当前canvas的所有状态
* restore save 和 restore 方法是用来保存和恢复 canvas 状态的，都没有参数。Canvas 的状态就是当前画面应用的所有样式和变形的一个快照

官网示例

```javascript
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  ctx.fillRect(0,0,150,150);   // 使用默认设置绘制一个矩形
  ctx.save();                  // 保存默认状态

  ctx.fillStyle = '#09F'       // 在原有配置基础上对颜色做改变
  ctx.fillRect(15,15,120,120); // 使用新的设置绘制一个矩形

  ctx.save();                  // 保存当前状态
  ctx.fillStyle = '#FFF'       // 再次改变颜色配置
  ctx.globalAlpha = 0.5;
  ctx.fillRect(30,30,90,90);   // 使用新的配置绘制一个矩形

  ctx.restore();               // 重新加载之前的颜色状态
  ctx.fillRect(45,45,60,60);   // 使用上一次的配置绘制一个矩形

  ctx.restore();               // 加载默认颜色配置
  ctx.fillRect(60,60,30,30);   // 使用加载的配置绘制一个矩形
}
```
