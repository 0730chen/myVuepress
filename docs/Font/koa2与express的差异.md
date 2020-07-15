---
title: koa2和express两种框架模型对比
---

### koa2和express两款框架的差异

1. express框架中间件是线性的

```javascript
const express = require('express')
const app = new express()
const sleep = () => new Promise(resolve => setTimeout(function(){resolve(1)}, 2000))
const one  =(request,respons,next)=>{
  console.log('one')
  next()
  console.log('one end')
}
const two = (request,respons,next)=>{
  console.log('two')
  next()
  console.log('tow end')
}
const three=async (request,respons,next)=>{
  // await sleep()
  console.log('three')
  next()
  console.log('three end')
}
app.use(one)
app.use(two)
app.use(three)

app.get('/',(request,response,next)=>{
  response.send('hello world')
})
app.listen(3000,()=>{
  console.log('监听3000')
})
```
中间件没有异步操作
```javascript
one
two
three
three end
tow end
one end
```
当中间出现异步操作时,此时第二个中间件并不会等待第三个中间件完成，而是直接返回
```javascrpit
one
two
tow end
one end
three
three end
```

说明express代码结构是线性的，next函数会告诉当前中间件，要执行下一个中间件了，在中间件two中异步了一个next函数，express中间件执行是有顺序的，像一个队列，线性的

#### 当中间件中没有异步操作时 express其实是这样的,是一层一层的回调嵌套，当res.send时候，代码还会继续执，中间件执行机制是基于回调callback函数实现的
```javascript
one(req,res){
  console.log('one')
  two(){
    console.log(two)
    async three(){
      console.log('three')
      await sleep()
      console.log('three end')
      res.send('haha')
    }
    console.log('two end')
  }
  console.log('one end')
}
```
#### 中间件机制原理,维护一个函数数组
```javascript
function express(){
  let funcs = []
  const app =  function(req,res){
    var i =0
    function next(){
      var task = funcs[i++] //调用next则i+1
      if(!task){
        return 
      }
      task(req,res,next)
    }
    next()
  }
  //task是中间件
  app.use = function(task){
    funcs.push(task)
  }
}
```
2.koa2框架是洋葱模型执行中间件

```javascript
const koa2 = require('koa2')

async function f1(ctx, next) {
  console.log('f1 start');
  await next();
  console.log('f1 end');
}

async function f2(ctx, next) {
  console.log('f2 start');
  await next();
  console.log('f2 end');
}

async function f3(ctx) {
  console.log('f3 service');
}
```
#### 实现koa2的中间件函数
1.一个递归调用，联系调用中间件返回是个promise链
```javascript
function compose(ctx,middlewares){
  //判断参数是否是一个数组，并且数组的每一项都是一个函数
   if (!Array.isArray(middlewares)) throw new TypeError('Middlewares stack must be an array!')

   for (const fn of middlewares) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')}
    
    return function(){
      const len = middlewares.length//数组长度，也就是中间件长度
      const dispath = function(i){
        if(len===i){
          return Promise.resolve()
        }else{
          const fn = middlewares[i]
          try{
            return Promise.resolve(fn(ctx,dispatch.bind(null,(i+1))))
          }catch(err){
            return Promise.reject(err)
          }
        }
      }
      return dispatch(0)
    }
}
const fn = compose(ctx,middlewares)
fn()
```
#### 响应机制
1.express我们是直接操作res对象的，所以如果想对上层中间件进行操作很困难，响应在中间件的最后一项的res.send()代表了立即响应
2.koa2中的数据是通过ctx.body进行设置的，这里这是设置，在koa2的所有中间件结束后才会响应
```javascript
const handleResponse = () => respond(ctx);
fnMiddleware(ctx).then(handleResponse)

function respond(ctx) {
  ...
  res.end(body);
}
```
