---
title: Promise和异步
date: 2019-11-2
tags:
  - 事件循环
---

#### 什么是异步

1. 异步就当前不能立即获得结果就叫做异步

2. 如何处理异步

   ```javascript
   //一般的代码
   console.log("1");
   console.log("2");
   console.log("3");
   //执行顺序是
   //1
   //2
   //3
   setTimeout(() => {
     console.log("5s显示");
   }, 5000);
   console.log("4");
   //执行顺序是
   //1,2,3,4,5s后显示
   ```

   使用 setTimeout()后 代码输出结果并不是我们预想的 1，2，3，5s 显示，4。不是从上而下执行

   ##### 这里只是模仿了异步，并不是真的异步

   - 当遇到异步函数的解决办法
     1. 使用回调函数获取异步数据，比如我们使用 test 连接上了数据库，然后操作数据库，操作数据库后获得数据

   ```javascript
   function test(fn) {
     //定义一个储存数据的数组
     let data = [];
     database.find("123", fn()); //查询数据,然后我们想要拿到这个数据 只有调用fn，才能够拿到这个数据，否则data中始终是空的
   }
   ```

   ##### 回调函数的优缺点

   优点

   - 帮助我们解决了能够成功拿到异步请求中的结果
     缺点
   - 回调函数写起来名称不规范，不统一，多个开发使用多个名字
   - 容易出现回调地狱,回调一个套一个，会导致代码不易维护
   - 很难对异步请求进行错误处理

   ```javascript
   //当你的函数有多个异步请求，你就需要多个多个回调函数进行数据获取
   function test1(test2(test3{
   }){
   }
   ```

   但是在 node.js 中大部分 API 都是使用回调函数进行数据的获取操作

   2. 使用 Promsie 解决异步操作
      Promise 是一个构造函数 构造 Promise 对象可以进行链式操作
      promise 有三个状态 pedding(等待中) Fulfilled(执行中) Rejected(拒绝)

   ```javascript
   1. 使用实例
   //定义一个函数
   //函数使用new Promise构建一个promise对象对象中有是一个回调函数
   function test1(){
   	return new Promise((resolve,reject)=>{
   		reslove(data)
   		reject(err) //最终得到的数据通过resolve返回出去
   	})
   }
   then()//then方法接受一个参数，参数是一个函数，可以获取到resolve返回的值 then可以被一个promise调用多次
   test1.then(res=>{console.log(res)})//就能获取到data
   catch()//函数接受一个参数,参数是一个函数，当请求失败后调用reject，使用catch()函数接收这个错误
   catch(err=>{console.log(err)})
   ```

   ```javascript
   //map中是一个回调函数 parseInt('','')
   //parseInt(接受两个参数),第一个参数是需要转换的数，第二个是进制
   //parsenInt 相当于 (1,0) (2,1) (3,2) 调用parsenInt 0就相当于不设置
   parseInt(1, 0) === 1;
   parseInt(2, 1) === NaN[(1, 2, 3)].map(parseInt);
   ```

   3. async/await 处理异步，异步代码同步执行

   ```javascript
   async; //关键字定义这是一个异步函数
   //只有在async中定义的
   async function add() {
     let a = await promsie; //promsie是一个由Promise创建的异步函数

     //异步代码，同步形式
     //console.log(a)这个函数会在await之后才会执行console.log(a)
     console.log(a);
     //a可以接受到resolve(data)传递的data内容
   }
   ```

   let a = await promise //a 可以接受到 promise.then()的数据
