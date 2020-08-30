---
title: Html的常用标签
date: 2019-09-20
tags:
  - Html
---

#### HTML 的常用标签以及用法

1. a 标签
   - href 属性是超级引用 hyper refrence 其中的值可以为网址例如'www.baidu.com',路径'./a',伪协议 1. 知识点:当 href 为空时，点击 a 标签页面会刷新，一般使用'javascript：'这点 a 标签不会刷新
   - target 属性
     1. \_blank 值，表示在新窗口中打开链接 2. \_self 值，在相同的框架中打开连接 3. \_parent 在父窗口中打开链接，iframe 内嵌网页中出现 4. \_top 在整个页面窗口中打开链接
2. iframe 标签
   - iframe 标签可以内嵌 html，现在很少使用
3. img
   - src 属性 1. src 接受一个地址字符串，可以是 url，路径,src 是发送了一个 get 请求，可以在 knetwork 查看
   - alt 属性 1. 常规是用不到的，在 src 的地址或者路径出错后，显示 alt 的值
   - img 有两个事件 1. onload 事件，图片加载成功调用 2. onerror 事件，图片加载失败调用
4. table
   table 标签里面还有`css <thead></thead> <tbody></tbody> <tfoot></tfoot>`在页面上制作表格
5. form
   - action 属性 1. 请求资源的路径，网址
   - methods 属性 2. 定义访问请求路径的方式，有 post 方式与 get 方式
     get 携带参数在 url 中，post 携带参数不在 url 中 3. auth
     complate 自动补全用户名 4. target 与 a 标签的属性一致 5. form 标签需要有一个提交按钮，input 标签，type 属性为 submit. 当 input 为 button 时点击后不能点击
6. input 标签
   - type 1. text
     输入文本页面 2. checkbox
     定义复选框 3. submit
     form 表单提交数据 4. radio
     定义单选按钮 5. password
     定义密码段,字符被掩码 6. hidden
     输入隐藏输入字段(给机器看的) 7. file
     定义输入字段和浏览按钮，供文件上传
7. meta 标签
   `css <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,initial-scale=1.0,user-scalable=no" />`
   固定属性：name=viewport 是窗口。视窗
   content=""
   widtn = device-width
   minimum-scale = 1.0 最小缩放
   maximum-scale = 1.0 最大缩放
   initial-scale = 1.0 初始缩放
   user-scalable = 1.0 禁止用户缩放 默认为搜索
   四个属性值
8. 写博客也是一种记忆的方法
