---
title:Koa搭建服务器
---

##### Koa介绍
    Koa是基于Node.js的下一代web开发框架，它可以用来开发后台应用，由Express原班人马打造。相比于Express提供了async函数，可以加优雅的处理异步问题
##### 安装
```javascript
npm i koa --save
```
安装koa

#### 使用koa
    Koa 应用程序是一个包含一组中间件函数的对象，它是按照类似堆栈的方式组织和执行的。 Koa 类似于你可能遇到过的许多其他中间件系统，例如 Ruby 的 Rack ，Connect 等，然而，一个关键的设计点是在其低级中间件层中提供高级“语法糖”。 这提高了互操作性，稳健性，并使书写中间件更加愉快。
    这包括诸如内容协商，缓存清理，代理支持和重定向等常见任务的方法。 尽管提供了相当多的有用的方法 Koa 仍保持了一个很小的体积，因为没有捆绑中间件。
```javascript
//在node中需要使用require导入包
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```
    监听本地3000端口，当你访问时返回一个hello word

##### ctx参数
    ctx是上下文内容 ctx.request,ctx.response,ctx有众多API,
    常用的ctx的API
    ctx.res //response对象
    ctx.request //request对象
    ctx.cookies.get(name,[options]) //通过options获取cookies
    ctx.cookies.set(name,value,[options]) //通过options设置cookies
    ctx.body 返回给访问者的内容
    
##### koa的数据获取
*  Get数据获取
```javascript
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  let url = ctx.url
  // 从上下文的request对象中获取
  let request = ctx.request
  let req_query = request.query
  let req_querystring = request.querystring

  // 从上下文中直接获取
  let ctx_query = ctx.query
  let ctx_querystring = ctx.querystring

  ctx.body = {
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring
  }
})

app.listen(3000, () => {
  console.log('[demo] request get is starting at port 3000')
})

```
    get请求的参数全部在ctx中
 * Post参数获取
 1.
 ```javascript
const Koa = require('koa');
const app = new Koa();

app.post(async ctx => {
  ctx.body = 'Hello World';
    //监听事件
    ctx.req.addListener('data',(data)=>{})
    ctx.req.addListener('end',()=>{})
    //一个接受数据事件，一个数据传输完成事件
});

app.listen(3000);
```
使用中间件解析
```javascript
npm install --save koa-bodyparser@3
const Koa = require('koa');
const app = new Koa();
app.use(bodyParser())
app.post(async ctx => {
  ctx.body = 'Hello World';
    //监听事件
    // 当POST请求的时候，中间件koa-bodyparser解析POST表单里的数据，并显示出来
       let postData = ctx.request.body
       ctx.body = postData
});

app.listen(3000);

```

##### 设置session和cookies
* 设置cookies
ctx.cookies.set()
```javascript
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  if ( ctx.url === '/index' ) {
    ctx.cookies.set(
      'cid', 
      'hello world',
      {
        domain: 'localhost',  // 写cookie所在的域名
        path: '/index',       // 写cookie所在的路径
        maxAge: 10 * 60 * 1000, // cookie有效时长
        expires: new Date('2017-02-15'),  // cookie失效时间
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
      }
    )
    ctx.body = 'cookie is ok'
  } else {
    ctx.body = 'hello world' 
  }

})

app.listen(3000, () => {
  console.log('[demo] cookie is starting at port 3000')
})

```

* 设置sessions
```javascript
app.use(session({
  key: 'SESSION_ID',
  store: store,
  cookie: cookie
}))

app.use( async ( ctx ) => {

  // 设置session
  if ( ctx.url === '/set' ) {
    ctx.session = {
      user_id: Math.random().toString(36).substr(2),
      count: 0
    }
    ctx.body = ctx.session
  } else if ( ctx.url === '/' ) {

    // 读取session信息
    ctx.session.count = ctx.session.count + 1
    ctx.body = ctx.session
  } 

})

app.listen(3000)
```