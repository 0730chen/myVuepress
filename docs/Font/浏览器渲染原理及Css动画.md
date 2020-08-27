---
title: 浏览器渲染原理及Css动画
date: 2019-09-24 20:50:47
tags: 
- css
- 异步
categories: 
- 异步
---
#### 浏览器的渲染原理

##### 进程与线程

* 进程：启动一个应用时，计算机会启动一个进程，然后分配内存

* 线程：在创建线程后，也会创建线程用来辅助进程。

总结：进程包含线程 一个进程可以包含多个线程，进程的内存是线程共享的.

##### 渲染步骤

* Html => 构建Html Dom树 =>构建 Css树 => 然后将Dom树与Css树合并成渲染树 => 然后是定位，布局 ，盒模型，尺寸大小 => paint绘制（顺序是背景色，背景图，border children outline ） => 层叠合成

##### 经典面试题

* 从浏览器输入URL中按回车到页面显示过程中发生了什么？

* 浏览器根据URL进行DNS查询

* 首页从DNS缓存中查询
* 未在缓存中找到，则不停的向上一级请求DNS服务器

* DNS将域名解析成IP地址后建立TCP连接（三次握手，四次挥手）
* 主要作用是保证数据信息传输的可靠性
* 构建HTTP请求报文
* 添加HTTP首部
* 根据同源策略添加cookie
* 在TCP连接上发送HTTP报文，等待响应
* 服务器处理HTTP请求报文，返回响应HTTP响应报文
* 浏览器处理返回的HTTP响应报文，开始渲染页面

* 构建DOM树=>构建Css树=>合成渲染树=>定位布局=>paint绘制页面=>层叠合成 用户就能看到页面了

* URL中锚点后面的数据和值是不不会发送到后端服务器

#### css动画

##### transition 过渡动画 是一段两个事件节点之间的过程

* transition 属性名，时间 s为单位，过渡方式  延迟多久 ease默认 liner线性 inherit (经常使用)
* transform 变换

 1. rotate()旋转，接受一个角度值
 2. translate() 位移，将元素移动 接受一个像素值
 3. scale() 缩放 放大缩小，默认是1
 4. skew()扭曲变形 接受一个角度值

* animation 动画是定义关键帧的状态来时间动画效果，可以控制关键帧的播放时间长等功能
* @keyframe 动画名 定义关键帧的所处的状态的样式
* 使用  animation:动画名 时间 过渡函数

* animation-name:动画名称 heart
* animation-duration:动画执行时间 5S
* animation-timing-fuction:是过渡函数 线性 先快后慢....
* animation-delay:动画延迟时间，设置为负数则表示当前动画被截断
* animation-iteration-count:infinite 动画执行次数 infinite表示一直执行
* animation-direction:normal 动画反向变化
* animation-fill-mode:forwards 动画保持开始或者结束时的样式
* animation-play-state:running 动画暂停或者运行
* animation:heart 5s linear 2s infinite alternate-reverse

```css

 @keyframes heart{
 0%{
  transform:scale(1)
 }
  50%{
   transform:scale(1.2)
  }
  75%{
   transform:scale(1.2)
  }
  100%{
 transform:scale(1)
 }

}

```
