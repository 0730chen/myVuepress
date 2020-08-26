---
title: 手写Promise
date: 2020-8-26
categories:
- Function
tags:
- promise
- Function
---

#### Promise详解

手写一个简易版的Promise

```javascript
class Promise{
  success = null
  fail = null
  state = 'pending'
  
  constructor(fn){
    fn(this.resolve.bind(this),this.reject.bind(this))
  }

  resolve(reason){
    setTimeout(()=>{
      this.state = 'reject'
      this.fail(reason)
    })
  }
  then(succeed,fail){
    this.succeed = succeed
    this.fail = fail
  }

}
```

#### Promise.all方法

* 方法返回一个Promise实例
* 此实例在iterable参数内的所有promise都完成resolved时回调完成
* 如果参数中promise中有一个有失败，此案例回调失败，失败原因是第一个promise的结果

```javascript
Promise.all = function(arrp){
  let list = []
  let hasErrr = false
  return new Promise((resolve,reject)=>{
    for(let i =0;i< arrp.length;i++){
      arrp[i].then(data=>{
        list[i] = data
        len++
        len === arr.length && resolve(list)
      },error=>{
        !hasError && regect(error)
        hasError = true
      })
    }
  })

}
```

#### Promise.race()实现

* race比赛，顾名思义，方法返回一个Promise实例，一旦迭代器中某个Promise完成或者失败，就会返回

```javascript

Promise.race = function(arr){
  let hasValue = false
  let hasError = false
  
  return new Promise((resolve,reject)=>{
    for(let i =0;i<arr.length;i++){
      arr[i].then(data=>{
        !hasValue && !hasError && resolve(data)
        hasValue = true
      },error=>{
        !hasValue && !hasError && reject(error)
        hasError = true
      })
    }
  })
}

```
