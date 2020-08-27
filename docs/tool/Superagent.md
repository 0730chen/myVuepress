---
title: SuperAgent和cheerio库的使用
date: 2019-11-2
tags: 
   - Node  
   - 正则
categories: 
   - 服务端
---

#### SpuerAgent 库介绍

1. SuperAgent 它是一个强大并且可读性很好的轻量级 ajaxAPI，是一个关于 HTTP 方面的一个库,最为优秀的是他可以进行链式操作，它返回的是一个 promise

```javascript
npm install superagent --save

```

2.开始使用 superAgent
   一般发起 http 请求都会有 method(方法) params(请求参数)
   使用 superAgent 发起请求

```javascript
//get发起请求参数是一个网址或者api
//链式操作end是有一个回调函数，可以接受到请求后得到的数据
//set中是一个对象，是每次请求都会携带的参数
     superAgent.get('/123').set({'Referer','https://www.google.com',
        'Accept','image/webp,image/*,*/*;q=0.8'}).end((err.res)=>{})
//或者使用
     superAgent('get','/api').set({}).end((err,res)=>{})
//或者使用async/await
 let a = await superAgent('') //a可以接受到superAgent的请求参数

```

##### cheerio 库使用

1. cheerio是一个和Jquery相似的解析库
   下载

```javascript
//下载
 npm install cheerio --save

```

   cheerio使用
   cheerio有一个load函数，函数接受一个html格式数据
   使用cheerio就像使用jquery库 选择你需要的数据

```javascript
   const $ = cheerio.load(html);//接受一个参数
   $('#id')//选取标签
   .text()//输出文本内容
   .attr()//获取所有的class的属性值
   text() attr()//取出来是字符串
   //使用JSON.parse()转换为对象
```

   JSON.parse()需要使用try catch方法捕捉错误
2. 将获取到的数据集合起来返回出去，外部就可以使用这个解析这个页面后的数据
