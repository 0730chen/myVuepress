---
title:如何理解this
---

#### 5种情况

* .全局范围：它 会指向 全局对象（ 浏览器下指window）
* .全局函数调用：它 还是指向全局对象。
* .对象函数调用：调用某个对象的函数， 它指向 当前对象。
* .使用 new 实例化对象时：它指向 新创建的 对象。
* .调用某些方法时：如： Function.prototype 上的 call 或者 apply 方法 以及 with等它指向 传入的对象。

#### Event Handler 中的 this
```javascript 1.8
btn.addEventListener('click' ,function handler(){
  console.log(this) // 请问这里的 this 是什么
})

handler.call(event.currentTarget, event) 
// 那么 this 是什么不言而喻
```

##### jQuery Event Handler 中的 this

* 当jQuery的调用处理程序时，this关键字指向的是当前正在执行事件的元素。对于直接事件而言，this 代表绑定事件的元素。对于代理事件而言，this 则代表了与 selector 相匹配的元素。(注意，如果事件是从后代元素冒泡上来的话，那么 this 就有可能不等于 event.target。)若要使用 jQuery 的相关方法，可以根据当前元素创建一个 jQuery 对象，即使用 $(this)。


##### 总结
* 确定this的方法
* 使用call，apply，bind改写函数确定this
```javascript 1.8
function a(){}
let obj = {
a:function() {
  
}
}
a.call(context,x)
obj.a().call(obj,x)  
```
this就是call的一个参数