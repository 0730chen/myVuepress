---
title:Promise的认识
---
#### Promise
1. Promise的用途
   Promise对象是一个代理对象或者代理值，被代理的值在Promise对象创建时是未知的，它可以允许你为异步操作的成和失败分别绑定相应的方法，让异步方法可以像同步方法那样返回值，但不是立即返回最终结果，而是以一个能够代表未来出现结果的Promise对象
   Promise用途就是处理异步操作。给异步操作的成功和失败分别绑定相应的处理方法,并返回相应的Promise对象
2. 如何创建一个Promise
   ```javascript
       let myPromise = new Promise((resolve,reject)=>{
           //成功的结果使用reslove返回
           resolve()
           //失败的结果使用reject返回
           reject()
       })
       //使函数拥有Promise功能
       function myPromise(){
       return new Promise((resolve,reject)=>{
             //成功的结果使用reslove返回
                      resolve()
                      //失败的结果使用reject返回
                      reject()
           })
       }
    ```
3. 如何使用Promise.prototype.then
    Promise.prototype.then方法返回一个Promise，它最多需要两个参数Promise 的成功和失败情况的回调函数。并且可以链式操作
    ```javascript
    let pro  = new Promise((resolve,reject)=>{
       resolve('Success')
       })
       pro.then(res=>{
           console.log(res)
       },error=>{})
    ```
4. 如何使用Promise.all
    Promise.all()接受一个可迭代参数，这个可迭代参数内容所有promise都resolved或参数不包含promise时回调完成，如果参数中有一个失败，则回调失败，失败原因是第一个promise的结果
    ```javascript
    let pro1 = Promise.resolve(3)
    let pro2 = Promise.resolve(2)
    let pro3 = Promise.resolve(1)
    Promise.all([pro1,pro2,pro3]).then(res=>{
 
   console.log(res)}) //[3,2,1]
    ```
5. 如何使用Promise.race
    和Promise类似,Promise.race()参数是一个可迭代参数，返回一个promise，一旦迭代器中的某个Promise解决或拒绝，返回的Promise就会解决或拒绝
    ```javascript
    let pro1  = new Promise((resolve)=>{
       resolve(1) 
   })
   let pro2 = new Promise(resolve =>{
               resolve(2)
           } )
    Promise.race([pro1,pro2]).then(res=>{
       console.log(res)
       })
   //1
    ```
    Promise.race()遇到一个成功就会返回，Promise.all会将全部的成功结果返回